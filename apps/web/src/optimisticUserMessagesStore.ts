import type { ChatMessage } from "./types";

/**
 * Survives ChatView remounts (e.g. draft → server thread promotion) so the
 * first user bubble does not disappear while the server message list catches up.
 */
const optimisticByThreadId = new Map<string, ReadonlyArray<ChatMessage>>();

export function getStoredOptimisticUserMessages(
  threadId: string,
): ReadonlyArray<ChatMessage> {
  return optimisticByThreadId.get(threadId) ?? [];
}

export function setStoredOptimisticUserMessages(
  threadId: string,
  messages: ReadonlyArray<ChatMessage>,
): void {
  if (messages.length === 0) {
    optimisticByThreadId.delete(threadId);
    return;
  }
  optimisticByThreadId.set(threadId, messages);
}

export function clearStoredOptimisticUserMessages(threadId: string): void {
  optimisticByThreadId.delete(threadId);
}
