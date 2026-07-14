# TODO

## Small things

- [ ] Submitting new messages should scroll to bottom
- [ ] Only show last 10 threads for a given project
- [ ] Thread archiving
- [ ] New projects should go on top
- [ ] Projects should be sorted by latest thread update

## Bigger things

- [ ] Queueing messages

## Scratch chats (funnel into projects) — later

**MVP shipped:** New chat creates a project at `{T3CODE_HOME}/chats/<projectId>/scratch`
(agent cwd = `scratch/`), via sidebar **New chat** / command palette. No folder picker.

These items are intentionally deferred:

- [ ] **Chat → project funnel**
  - Promote a scratch chat into a real project (pick destination folder or use sandbox contents)
  - “Apply proposed changes into…” a project
  - “Open as project” from chat header
  - Preserve transcript / attachments when promoting
- [ ] **Optional Documents as read context** (opt-in, not default root)
- [ ] **Attach files/folders** to a chat without making them writable
- [ ] **Multi-CLI compare** in one chat (side-by-side providers)
- [ ] **Per-chat memory / pinned context** beyond transcript

## Permission ladder — later

Refine beyond MVP binary “scratch sandbox write only”:

1. **Read-only** — agent cannot write anywhere user-visible; answers only
2. **Sandbox write only** (MVP) — write only under `~/.t3/chats/<id>/scratch`
3. **Ask to write specific paths** — prompt per file/dir outside sandbox
4. **Full project access** — convert chat to project (or attach project) with existing runtime modes (supervised / full access)

Policy details to design:

- [ ] Deny globs for secrets: `**/.env*`, credentials, `**/.ssh/**`, keychains, etc.
- [ ] Max file size / tree depth / search hit caps on reads
- [ ] Visible UI badge always: mode + root + provider (e.g. `Sandbox write · ~/.t3/chats/… · Claude`)
- [ ] Map ladder steps onto existing runtime modes (`approvalPolicy` / `sandboxMode`) where possible
- [ ] Audit log of denied write/read attempts
