import { scopeProjectRef } from "@t3tools/client-runtime/environment";
import {
  isAtomCommandInterrupted,
  settlePromise,
  squashAtomCommandFailure,
} from "@t3tools/client-runtime/state/runtime";
import {
  DEFAULT_MODEL,
  EnvironmentId,
  PRIMARY_LOCAL_ENVIRONMENT_ID,
  ProviderInstanceId,
} from "@t3tools/contracts";
import { useCallback, useRef } from "react";
import { usePrimaryEnvironment } from "../state/environments";
import { projectEnvironment } from "../state/projects";
import { useAtomCommand } from "../state/use-atom-command";
import { useNewThreadHandler } from "./useHandleNewThread";
import { useIsBlankActiveThread } from "./useIsBlankActiveThread";
import { newProjectId } from "../lib/utils";
import { stackedThreadToast, toastManager } from "../components/ui/toast";

/**
 * Creates a scratch chat: project under server `baseDir/chats/<id>/scratch`
 * (agent write sandbox) and opens a new draft thread without a folder picker.
 */
export function useCreateScratchChat() {
  const createProject = useAtomCommand(projectEnvironment.create, {
    reportFailure: false,
  });
  const handleNewThread = useNewThreadHandler();
  const primaryEnvironment = usePrimaryEnvironment();
  const isBlankActiveThread = useIsBlankActiveThread();
  const inFlightRef = useRef(false);

  return useCallback(async () => {
    if (inFlightRef.current) return;
    if (isBlankActiveThread) {
      return;
    }
    inFlightRef.current = true;
    try {
      const environmentId =
        primaryEnvironment?.environmentId ?? EnvironmentId.make(PRIMARY_LOCAL_ENVIRONMENT_ID);
      const projectId = newProjectId();
      // workspaceRoot is rewritten server-side when scratchChat is true.
      const createResult = await createProject({
        environmentId,
        input: {
          projectId,
          title: "New chat",
          workspaceRoot: "__scratch_chat__",
          createWorkspaceRootIfMissing: true,
          scratchChat: true,
          defaultModelSelection: {
            instanceId: ProviderInstanceId.make("codex"),
            model: DEFAULT_MODEL,
          },
        },
      });
      if (createResult._tag === "Failure") {
        if (!isAtomCommandInterrupted(createResult)) {
          const error = squashAtomCommandFailure(createResult);
          toastManager.add(
            stackedThreadToast({
              type: "error",
              title: "Failed to start chat",
              description: error instanceof Error ? error.message : "An error occurred.",
            }),
          );
        }
        return;
      }

      const navigationResult = await settlePromise(() =>
        handleNewThread(scopeProjectRef(environmentId, projectId), {
          envMode: "local",
          worktreePath: null,
          branch: null,
          startFromOrigin: false,
        }),
      );
      if (navigationResult._tag === "Failure") {
        const error = squashAtomCommandFailure(navigationResult);
        toastManager.add(
          stackedThreadToast({
            type: "error",
            title: "Chat created, but failed to open",
            description: error instanceof Error ? error.message : "An error occurred.",
          }),
        );
      }
    } finally {
      inFlightRef.current = false;
    }
  }, [createProject, handleNewThread, isBlankActiveThread, primaryEnvironment?.environmentId]);
}