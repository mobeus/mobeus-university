/**
 * Enhanced chat message types for Teleglass chat interface
 * 
 * These types define the structure for messages with metadata
 * that will be wired up to actual tool calls and RAG searches.
 */

import { URLPreviewMetadata } from './openGraph';

export interface ToolCallMetadata {
  id: string;
  toolName: string;
  parameters: Record<string, any>;
  timestamp: Date;
}

export interface RAGSearchMetadata {
  id: string;
  searchQuery: string;
  resultsCount?: number;
  timestamp: Date;
}

export interface ChatMessageMetadata {
  toolCalls?: ToolCallMetadata[];
  ragSearches?: RAGSearchMetadata[];
  urlPreviews?: URLPreviewMetadata[];
}

export interface EnhancedChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
  metadata?: ChatMessageMetadata;
  feedback?: "up" | "down" | null;
}
