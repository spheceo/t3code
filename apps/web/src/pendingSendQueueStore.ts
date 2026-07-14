import type {
  EnvironmentId,
  MessageId,
  ModelSelection,
  ProviderInteractionMode,
  RuntimeMode,
  ThreadId,
} from "@t3tools/contracts";
import { create } from "zustand";

export type QueuedSendDelivery = "after-turn" | "steer";

export interface QueuedTurnSend {
  readonly id: MessageId;
  readonly threadKey: string;
  readonly environmentId: EnvironmentId;
  readonly threadId: ThreadId;
  readonly message: {
    readonly messageId: MessageId;
    readonly role: "user";
    readonly text: string;
    readonly attachments: ReadonlyArray<{
      readonly type: "image";
      readonly name: string;
      readonly mimeType: string;
      readonly sizeBytes: number;
      readonly dataUrl: string;
    }>;
  };
  readonly modelSelection: ModelSelection;
  readonly titleSeed: string;
  readonly runtimeMode: RuntimeMode;
  readonly interactionMode: ProviderInteractionMode;
  readonly createdAt: string;
  readonly delivery: QueuedSendDelivery;
}

interface PendingSendQueueState {
  readonly byThreadKey: Readonly<Record<string, ReadonlyArray<QueuedTurnSend>>>;
  enqueue: (item: QueuedTurnSend) => void;
  dequeue: (threadKey: string) => QueuedTurnSend | null;
  remove: (threadKey: string, id: string) => void;
  clearThread: (threadKey: string) => void;
  peek: (threadKey: string) => QueuedTurnSend | null;
  list: (threadKey: string) => ReadonlyArray<QueuedTurnSend>;
}

export const usePendingSendQueueStore = create<PendingSendQueueState>((set, get) => ({
  byThreadKey: {},
  enqueue: (item) => {
    set((state) => {
      const existing = state.byThreadKey[item.threadKey] ?? [];
      return {
        byThreadKey: {
          ...state.byThreadKey,
          [item.threadKey]: [...existing, item],
        },
      };
    });
  },
  dequeue: (threadKey) => {
    const existing = get().byThreadKey[threadKey] ?? [];
    if (existing.length === 0) return null;
    const [head, ...rest] = existing;
    if (!head) return null;
    set((state) => {
      const nextByThread = { ...state.byThreadKey };
      if (rest.length === 0) {
        delete nextByThread[threadKey];
      } else {
        nextByThread[threadKey] = rest;
      }
      return { byThreadKey: nextByThread };
    });
    return head;
  },
  remove: (threadKey, id) => {
    set((state) => {
      const existing = state.byThreadKey[threadKey] ?? [];
      const next = existing.filter((item) => item.id !== id);
      if (next.length === existing.length) return state;
      const nextByThread = { ...state.byThreadKey };
      if (next.length === 0) {
        delete nextByThread[threadKey];
      } else {
        nextByThread[threadKey] = next;
      }
      return { byThreadKey: nextByThread };
    });
  },
  clearThread: (threadKey) => {
    set((state) => {
      if (!(threadKey in state.byThreadKey)) return state;
      const nextByThread = { ...state.byThreadKey };
      delete nextByThread[threadKey];
      return { byThreadKey: nextByThread };
    });
  },
  peek: (threadKey) => get().byThreadKey[threadKey]?.[0] ?? null,
  list: (threadKey) => get().byThreadKey[threadKey] ?? [],
}));
