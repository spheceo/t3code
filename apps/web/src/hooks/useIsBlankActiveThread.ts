import { useParams } from "@tanstack/react-router";

import { isBlankThreadRoute } from "../lib/emptyThread";
import { useThread } from "../state/entities";
import { resolveThreadRouteTarget } from "../threadRoutes";

/** True when the open route is an empty draft / unstarted thread. */
export function useIsBlankActiveThread(): boolean {
  const routeTarget = useParams({
    strict: false,
    select: (params) => resolveThreadRouteTarget(params),
  });
  const routeThreadRef = routeTarget?.kind === "server" ? routeTarget.threadRef : null;
  const serverThread = useThread(routeThreadRef);
  return isBlankThreadRoute({
    routeTarget,
    serverThread,
  });
}
