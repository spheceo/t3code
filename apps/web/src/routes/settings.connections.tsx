import { createFileRoute, redirect } from "@tanstack/react-router";

/** Connections / remote SSH settings were removed; keep the path as a redirect. */
export const Route = createFileRoute("/settings/connections")({
  beforeLoad: () => {
    throw redirect({ to: "/settings/general", replace: true });
  },
  component: () => null,
});