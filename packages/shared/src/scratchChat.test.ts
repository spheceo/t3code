import { describe, expect, it } from "vite-plus/test";

import { isScratchChatWorkspaceRoot, SCRATCH_CHAT_SECRET_DENY_GLOBS } from "./scratchChat.ts";

describe("isScratchChatWorkspaceRoot", () => {
  it("matches chats/<id>/scratch layout", () => {
    expect(isScratchChatWorkspaceRoot("/Users/me/.t3/chats/abc-123/scratch")).toBe(true);
    expect(isScratchChatWorkspaceRoot("C:\\Users\\me\\.t3\\chats\\abc-123\\scratch")).toBe(true);
    expect(isScratchChatWorkspaceRoot("/tmp/t3/chats/uuid/scratch/")).toBe(true);
  });

  it("rejects normal project roots", () => {
    expect(isScratchChatWorkspaceRoot("/Users/me/code/my-app")).toBe(false);
    expect(isScratchChatWorkspaceRoot("/Users/me/.t3/chats/abc-123")).toBe(false);
    expect(isScratchChatWorkspaceRoot("/Users/me/.t3/worktrees/foo")).toBe(false);
  });
});

describe("SCRATCH_CHAT_SECRET_DENY_GLOBS", () => {
  it("includes env and ssh denials", () => {
    expect(SCRATCH_CHAT_SECRET_DENY_GLOBS.some((g) => g.includes(".env"))).toBe(true);
    expect(SCRATCH_CHAT_SECRET_DENY_GLOBS.some((g) => g.includes(".ssh"))).toBe(true);
  });
});
