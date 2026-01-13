import { useCallback, useEffect, useRef, useState } from "react"

export type FrameworkChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  timestamp: Date
}

const createMessageId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

const getFramework = () =>
  (typeof window !== "undefined" ? (window as any).UIFramework : undefined) as
  | any
  | undefined

type ExternalMessage = {
  role: "user" | "assistant"
  text: string
  timestamp?: Date
}

export function useUIFrameworkChat(isOpen: boolean) {
  const [messages, setMessages] = useState<FrameworkChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const externalMessagesRef = useRef<FrameworkChatMessage[]>([])

  const [isThinking, setIsThinking] = useState(false)

  const combineWithExternal = useCallback((historyMessages: FrameworkChatMessage[]) => {
    const merged = [...historyMessages]
    const seen = new Set(historyMessages.map((msg) => msg.id))

    for (const message of externalMessagesRef.current) {
      if (!seen.has(message.id)) {
        merged.push(message)
      }
    }

    merged.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    return merged
  }, [])

  const createSignature = useCallback((entries: FrameworkChatMessage[]) => {
    return entries
      .map((entry) => `${entry.id}:${entry.timestamp.getTime()}:${entry.text}`)
      .join("|")
  }, [])

  // Polling as backup since messageAppended events don't fire for assistant responses when chat UI is hidden
  useEffect(() => {
    if (!isOpen || !connected) return;

    const pollInterval = setInterval(() => {
      const ui = getFramework();
      if (!ui) return;

      try {
        const history = ui.getConversationHistory?.() || [];

        if (Array.isArray(history) && history.length > 0) {
          const mapped = history
            .map((entry: any, index: number) => {
              const text = (entry?.content ?? entry?.text ?? "").trim()
              if (!text) return null
              const timestampValue = entry?.timestamp
              const timestamp = timestampValue ? new Date(timestampValue) : new Date()
              return {
                id: entry?.id ? String(entry.id) : `${timestamp.getTime()}-${index}`,
                role: entry?.role === "user" ? "user" : "assistant",
                text,
                timestamp,
              } as FrameworkChatMessage
            })
            .filter((entry): entry is FrameworkChatMessage => !!entry)

          const combined = combineWithExternal(mapped)
          const currentSignature = createSignature(messages)
          const newSignature = createSignature(combined)

          if (newSignature !== currentSignature) {
            setMessages(combined);
          }
        }
      } catch (error) {
        // Silent error handling
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, [isOpen, connected, messages, combineWithExternal, createSignature]);

  const ensureConnected = useCallback(async () => {
    const ui = getFramework()
    if (!ui) {
      return false;
    }
    if (connecting || connected) {
      return connected;
    }

    setConnecting(true)
    try {
      // Initialize UIFramework if not already done
      if (ui?.init && ui?.getConfig && !ui.instance?.voiceChatInitialized) {
        try {
          await ui.init(ui.getConfig());
        } catch (initError) {
          // Silent error handling
        }
      }

      try {
        ui.setVoiceChatVisibility?.(false)
      } catch (_) { }
      await ui.connectOpenAI?.()
      setConnected(true)
      return true
    } catch (error) {
      return false
    } finally {
      setConnecting(false)
    }
  }, [connecting, connected])

  const loadHistory = useCallback(() => {
    const ui = getFramework()
    if (!ui) {
      return;
    }
    try {
      const history = ui.getConversationHistory?.() || []
      if (!Array.isArray(history)) return
      const mapped = history
        .map((entry: any, index: number) => {
          const text = (entry?.content ?? entry?.text ?? "").trim()
          if (!text) return null
          const timestampValue = entry?.timestamp
          const timestamp = timestampValue ? new Date(timestampValue) : new Date()
          return {
            id: entry?.id ? String(entry.id) : `${timestamp.getTime()}-${index}`,
            role: entry?.role === "user" ? "user" : "assistant",
            text,
            timestamp,
          } as FrameworkChatMessage
        })
        .filter((entry): entry is FrameworkChatMessage => !!entry)
      setMessages(combineWithExternal(mapped))
    } catch (error) {
      // Silent error handling
    }
  }, [combineWithExternal])

  useEffect(() => {
    if (!isOpen) return
    const ui = getFramework()
    if (!ui) return

    let cancelled = false

    const run = async () => {
      if (!connected) {
        const ok = await ensureConnected()
        if (!ok || cancelled) return
      }
      loadHistory()
    }

    run()

    return () => {
      cancelled = true
    }
  }, [isOpen, connected, ensureConnected, loadHistory])

  useEffect(() => {
    const ui = getFramework()
    if (!ui) return

    const onAppended = ({ role, text }: any) => {
      const trimmed = (text ?? "").trim()
      if (!trimmed) return
      const newMessage: FrameworkChatMessage = {
        id: createMessageId(),
        role: role === "user" ? "user" : "assistant",
        text: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const next = [...prev, newMessage]
        next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        return next
      })
      if (role !== "user") {
        setIsTyping(false)
        setIsThinking(false)
      }
    }

    try {
      ui.onChatEvent?.("messageAppended", onAppended)
    } catch (error) {
      // Silent error handling
    }

    const model: any = ui.getVoiceComponents?.()?.model

    const onDelta = () => {
      console.log("[useUIFrameworkChat] Assistant Delta received -> isThinking = false");
      setIsTyping(true)
      setIsThinking(false)
    }

    const onThinkingStart = (e: any) => {
      console.log("[useUIFrameworkChat] Thinking Start Event:", e.type);
      setIsThinking(true)
    }

    const onResponseDone = (event: any) => {
      setIsTyping(false);
      setIsThinking(false);

      // Extract response text directly from the event
      try {
        if (event?.response?.output) {
          const outputItems = event.response.output;
          for (const item of outputItems) {
            if (item?.type === 'message' && item?.role === 'assistant' && item?.content) {
              for (const content of item.content) {
                if (content?.type === 'output_audio' && content?.transcript) {
                  const assistantMessage = {
                    id: createMessageId(),
                    role: "assistant" as const,
                    text: content.transcript,
                    timestamp: new Date(),
                  };
                  setMessages((prev) => {
                    const next = [...prev, assistantMessage]
                    next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
                    return next
                  });
                  return;
                }
              }
            }
          }
        }
      } catch (error) {
        // Silent error handling
      }

      // Fallback: reload history when response is done
      setTimeout(() => {
        loadHistory();
      }, 100);
    };

    if (model?.addEventListener) {
      model.addEventListener("assistantTranscriptDelta", onDelta)
      model.addEventListener("response.done", onResponseDone);
      model.addEventListener("conversation.item.input_audio_transcription.completed", () => { });

      // Thinking start events
      model.addEventListener("input_audio_buffer.speech_stopped", onThinkingStart);
      model.addEventListener("input_audio_buffer.committed", onThinkingStart);
    }

    return () => {
      try {
        ui.offChatEvent?.("messageAppended", onAppended)
      } catch (_) { }
      if (model?.removeEventListener) {
        try {
          model.removeEventListener("assistantTranscriptDelta", onDelta)
          model.removeEventListener("response.done", onResponseDone)
          model.removeEventListener("conversation.item.input_audio_transcription.completed", () => { })

          model.removeEventListener("input_audio_buffer.speech_stopped", onThinkingStart);
          model.removeEventListener("input_audio_buffer.committed", onThinkingStart);
        } catch (_) { }
      }
    }
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      const ui = getFramework()
      if (!ui) {
        return;
      }

      if (!connected) {
        const ok = await ensureConnected()
        if (!ok) {
          const fallback = {
            id: createMessageId(),
            role: "assistant" as const,
            text: "Sorry, something went wrong sending your message.",
            timestamp: new Date(),
          }
          setMessages((prev) => {
            const next = [...prev, fallback]
            next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
            return next
          })
          return
        }
      }

      try {
        // Add user message immediately
        const userMessage = {
          id: createMessageId(),
          role: "user" as const,
          text: trimmed,
          timestamp: new Date(),
        };
        setMessages((prev) => {
          const next = [...prev, userMessage]
          next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          return next
        });

        setIsThinking(true)
        await ui.sendTextMessage?.(trimmed)
        setIsTyping(true)
      } catch (error) {
        setIsTyping(false)
        setIsThinking(false)
        const fallback = {
          id: createMessageId(),
          role: "assistant" as const,
          text: "Sorry, something went wrong sending your message.",
          timestamp: new Date(),
        }
        setMessages((prev) => {
          const next = [...prev, fallback]
          next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
          return next
        })
      }
    },
    [connected, ensureConnected]
  )

  const handleConnectionChange = useCallback((value: boolean) => {
    setConnected(value)
    if (!value) {
      setIsTyping(false)
    }
  }, [])

  const addExternalMessage = useCallback(({ role, text, timestamp }: ExternalMessage) => {
    const trimmed = (text ?? "").trim()
    if (!trimmed) return
    const entry: FrameworkChatMessage = {
      id: createMessageId(),
      role,
      text: trimmed,
      timestamp: timestamp ?? new Date(),
    }
    if (!externalMessagesRef.current.some((msg) => msg.id === entry.id)) {
      externalMessagesRef.current = [...externalMessagesRef.current, entry]
    }
    setMessages((prev) => {
      if (prev.some((msg) => msg.id === entry.id)) {
        return prev
      }
      const next = [...prev, entry]
      next.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      return next
    })
  }, [])

  return {
    messages,
    isTyping,
    sendMessage,
    connecting,
    connected,
    handleConnectionChange,
    addExternalMessage,
    isThinking,
  }
}
