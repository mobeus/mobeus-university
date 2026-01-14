import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleAcknowledgment } from "@/utils/acknowledgmentHelpers";
import { useSound } from "@/hooks/useSound";

type InvitationType = "chat" | "audio" | "video";

interface ChatInvitationDialogProps {
  open: boolean;
  type: InvitationType;
  onAccept: () => void;
  onDecline: () => void;
}

const dialogCopy: Record<InvitationType, { title: string; description: string; acceptLabel: string }> = {
  chat: {
    title: "Chat Request",
    description: "An admin would like to chat with you directly.",
    acceptLabel: "Accept",
  },
  audio: {
    title: "Audio Call Request",
    description: "An admin is requesting an audio call with you.",
    acceptLabel: "Accept",
  },
  video: {
    title: "Video Call Request",
    description: "An admin is requesting a video call with you.",
    acceptLabel: "Accept",
  },
};

export function ChatInvitationDialog({ open, type, onAccept, onDecline }: ChatInvitationDialogProps) {
  const { title, description, acceptLabel } = dialogCopy[type];
  const { playClick } = useSound();

  const handleAcceptClick = () => {
    playClick();
    handleAcknowledgment('chat-accept');
    onAccept();
  };

  const handleDeclineClick = () => {
    playClick();
    handleAcknowledgment('chat-decline');
    onDecline();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md glass-prominent text-white" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-white/80">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleDeclineClick} className="glass-medium glass-medium-hover text-white border-white/20">
            Decline
          </Button>
          <Button onClick={handleAcceptClick} className="glass-strong glass-strong-hover text-white">
            {acceptLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
