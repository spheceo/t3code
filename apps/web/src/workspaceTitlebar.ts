/**
 * When the main sidebar is collapsed, main titlebars need extra left padding so
 * text clears the fixed window controls / sidebar toggle.
 *
 * Duration/easing must match the sidebar gap animation or labels like
 * "No active thread" visibly desync and jump.
 */
export const SIDEBAR_LAYOUT_TRANSITION_CLASS =
  "duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

export const COLLAPSED_SIDEBAR_TITLEBAR_INSET_CLASS =
  "[[data-sidebar-state=collapsed]_&]:pl-[var(--workspace-titlebar-content-left)]";

export const TITLEBAR_SIDEBAR_PADDING_TRANSITION_CLASS = cnSafe(
  "transition-[padding-left]",
  SIDEBAR_LAYOUT_TRANSITION_CLASS,
);

/** Tiny local helper so this module stays free of the full `cn` util dependency. */
function cnSafe(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
