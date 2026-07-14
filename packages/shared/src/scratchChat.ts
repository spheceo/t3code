/**
 * Helpers for identifying scratch-chat workspaces.
 * Layout: `{baseDir}/chats/<projectId>/scratch` (agent cwd = scratch).
 */

/** True when workspaceRoot looks like a T3 scratch chat sandbox path. */
export function isScratchChatWorkspaceRoot(workspaceRoot: string): boolean {
  const normalized = workspaceRoot.replaceAll("\\", "/");
  // .../chats/<id>/scratch  (with optional trailing slash)
  return /\/chats\/[^/]+\/scratch\/?$/u.test(normalized);
}

/**
 * Paths that must never be read or written by agents (relative globs).
 * Scratch MVPs jail the agent to an empty sandbox; keep this list for policy ladder.
 */
export const SCRATCH_CHAT_SECRET_DENY_GLOBS = [
  "**/.env",
  "**/.env.*",
  "**/*.pem",
  "**/*.key",
  "**/id_rsa",
  "**/id_ed25519",
  "**/credentials.json",
  "**/secrets/**",
  "**/.ssh/**",
  "**/Library/Keychains/**",
] as const;
