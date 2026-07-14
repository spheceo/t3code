import { useAtomValue } from "@effect/atom-react";
import { useEffect, type CSSProperties, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { isElectron } from "../env";
import { resolveShortcutCommand, shortcutLabelForCommand } from "../keybindings";
import { isMacPlatform } from "../lib/utils";
import { primaryServerKeybindingsAtom } from "../state/server";
import ThreadSidebar from "./Sidebar";
import { Sidebar, SidebarProvider, SidebarRail, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./ui/tooltip";

const THREAD_SIDEBAR_WIDTH_STORAGE_KEY = "chat_thread_sidebar_width";
const THREAD_SIDEBAR_MIN_WIDTH = 13 * 16;
const THREAD_MAIN_CONTENT_MIN_WIDTH = 40 * 16;
const MACOS_TRAFFIC_LIGHTS_LEFT_INSET = "90px";
// Keep in sync with apps/desktop DesktopWindow trafficLightPosition.
const MACOS_TRAFFIC_LIGHTS_TOP_PX = 18;
const MACOS_TRAFFIC_LIGHTS_SIZE_PX = 12;
/** Optical nudge: sit a touch below the traffic-light vertical center. */
const MACOS_SIDEBAR_CONTROL_TOP_NUDGE_PX = 1;

function SidebarControl() {
  const keybindings = useAtomValue(primaryServerKeybindingsAtom);
  const { toggleSidebar } = useSidebar();
  const shortcutLabel = shortcutLabelForCommand(keybindings, "sidebar.toggle");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (resolveShortcutCommand(event, keybindings) !== "sidebar.toggle") return;

      event.preventDefault();
      event.stopPropagation();
      toggleSidebar();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keybindings, toggleSidebar]);

  return (
    <div
      className="pointer-events-none fixed left-[var(--workspace-controls-left)] top-[var(--workspace-sidebar-control-top)] z-50 flex h-[var(--workspace-titlebar-control-size)] items-center"
      data-sidebar-control=""
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <SidebarTrigger className="pointer-events-auto" aria-label="Toggle main sidebar" />
          }
        />
        <TooltipPopup side="bottom">
          Toggle main sidebar{shortcutLabel ? ` (${shortcutLabel})` : ""}
        </TooltipPopup>
      </Tooltip>
    </div>
  );
}

export function AppSidebarLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const macosWindowControlsStyle =
    isElectron && isMacPlatform(navigator.platform)
      ? ({
          "--workspace-controls-left": MACOS_TRAFFIC_LIGHTS_LEFT_INSET,
          // Center the sidebar toggle on the traffic-light cluster (y: 18, ~12px lights),
          // then nudge slightly down for optical balance with the thread title.
          "--workspace-sidebar-control-top": `calc(${
            MACOS_TRAFFIC_LIGHTS_TOP_PX +
            MACOS_TRAFFIC_LIGHTS_SIZE_PX / 2 +
            MACOS_SIDEBAR_CONTROL_TOP_NUDGE_PX
          }px - (var(--workspace-titlebar-control-size) / 2))`,
        } as CSSProperties)
      : undefined;

  useEffect(() => {
    const onMenuAction = window.desktopBridge?.onMenuAction;
    if (typeof onMenuAction !== "function") {
      return;
    }

    const unsubscribe = onMenuAction((action) => {
      if (action === "open-settings") {
        void navigate({ to: "/settings" });
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [navigate]);

  return (
    <SidebarProvider
      className="h-dvh! min-h-0! bg-sidebar"
      defaultOpen
      style={macosWindowControlsStyle}
    >
      <Sidebar
        side="left"
        variant="inset"
        collapsible="offcanvas"
        className="bg-sidebar text-sidebar-foreground"
        resizable={{
          minWidth: THREAD_SIDEBAR_MIN_WIDTH,
          shouldAcceptWidth: ({ nextWidth, wrapper }) =>
            wrapper.clientWidth - nextWidth >= THREAD_MAIN_CONTENT_MIN_WIDTH,
          storageKey: THREAD_SIDEBAR_WIDTH_STORAGE_KEY,
        }}
      >
        <ThreadSidebar />
        <SidebarRail />
      </Sidebar>
      {children}
      <SidebarControl />
    </SidebarProvider>
  );
}
