import { createFileRoute, redirect } from "@tanstack/react-router";

/** Providers settings moved to Models; keep the path as a redirect. */
export const Route = createFileRoute("/settings/providers")({
  beforeLoad: () => {
    throw redirect({ to: "/settings/models", replace: true });
  },
  component: () => null,
});
