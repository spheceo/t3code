import { useEffect, useRef } from "react";

import { useCreateScratchChat } from "../hooks/useCreateScratchChat";
import { useHandleNewThread } from "../hooks/useHandleNewThread";
import { startNewThreadFromContext } from "../lib/chatThreadActions";
import { SidebarInset } from "./ui/sidebar";

/**
 * Landing surface when no thread is selected. Opens a blank draft chat
 * (composer + empty hero) instead of a static empty-state card.
 */
export function NoActiveThreadState() {
  const { activeDraftThread, activeThread, defaultProjectRef, handleNewThread } =
    useHandleNewThread();
  const createScratchChat = useCreateScratchChat();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    void (async () => {
      const opened = await startNewThreadFromContext({
        activeDraftThread,
        activeThread: activeThread ?? undefined,
        defaultProjectRef,
        handleNewThread,
      });
      if (!opened) {
        await createScratchChat();
      }
    })();
  }, [activeDraftThread, activeThread, createScratchChat, defaultProjectRef, handleNewThread]);

  // Brief shell while the draft route mounts (matches chat chrome).
  return (
    <SidebarInset className="min-h-0 overflow-hidden overscroll-y-none bg-background text-foreground max-md:h-dvh">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-background" />
    </SidebarInset>
  );
}
