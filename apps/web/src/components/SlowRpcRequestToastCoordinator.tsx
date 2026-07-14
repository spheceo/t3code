/**
 * Slow RPC ack toasts are intentionally disabled — latency is still tracked in
 * `requestLatencyState` for diagnostics, but we don't surface a user-facing banner.
 */
export function SlowRpcRequestToastCoordinator() {
  return null;
}
