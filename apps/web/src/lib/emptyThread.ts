import { threadHasStarted } from "../components/ChatView.logic";
import type { Thread } from "../types";
import type { ThreadRouteTarget } from "../threadRoutes";

/**
 * True when the active route is a blank conversation (draft, or server thread
 * with no messages yet). Used to refuse spam "New chat" / "New thread".
 */
export function isBlankThreadRoute(input: {
  readonly routeTarget: ThreadRouteTarget | null;
  readonly serverThread: Thread | null | undefined;
}): boolean {
  if (!input.routeTarget) return false;
  if (input.routeTarget.kind === "draft") return true;
  return !threadHasStarted(input.serverThread);
}
