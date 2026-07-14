import { createFileRoute } from "@tanstack/react-router";

import { ProviderSettingsPanel } from "../components/settings/SettingsPanels";

function SettingsModelsRoute() {
  return <ProviderSettingsPanel />;
}

export const Route = createFileRoute("/settings/models")({
  component: SettingsModelsRoute,
});
