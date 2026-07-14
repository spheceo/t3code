import { createFileRoute, redirect } from "@tanstack/react-router";

/** Source Control settings UI was removed; defaults remain active in code. */
export const Route = createFileRoute("/settings/source-control")({
  beforeLoad: () => {
    throw redirect({ to: "/settings/general", replace: true });
  },
  component: () => null,
});
