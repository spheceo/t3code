"use client";

import { SearchIcon, StarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProviderInstanceId, ServerProvider } from "@t3tools/contracts";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

/** Rough row height for ~5 visible models in the scroll viewport. */
const MODEL_LIST_MAX_HEIGHT_CLASS = "max-h-[16.5rem]";

export interface ModelsCatalogItem {
  readonly instanceId: ProviderInstanceId;
  readonly displayName: string;
  readonly slug: string;
  readonly name: string;
  readonly shortName?: string;
  readonly subProvider?: string;
  readonly isCustom: boolean;
  readonly isFavorite: boolean;
}

export function buildModelsCatalogItems(input: {
  readonly serverProviders: ReadonlyArray<ServerProvider>;
  readonly favorites: ReadonlyArray<{ provider: ProviderInstanceId; model: string }>;
}): ModelsCatalogItem[] {
  const favoritesSet = new Set(
    input.favorites.map((fav) => `${fav.provider}:${fav.model}`),
  );
  const items: ModelsCatalogItem[] = [];
  for (const provider of input.serverProviders) {
    if (!provider.enabled) continue;
    for (const model of provider.models) {
      items.push({
        instanceId: provider.instanceId,
        displayName: provider.displayName ?? String(provider.instanceId),
        slug: model.slug,
        name: model.name,
        ...(model.shortName ? { shortName: model.shortName } : {}),
        ...(model.subProvider ? { subProvider: model.subProvider } : {}),
        isCustom: model.isCustom,
        isFavorite: favoritesSet.has(`${provider.instanceId}:${model.slug}`),
      });
    }
  }
  return items.toSorted((left, right) => {
    if (left.isFavorite !== right.isFavorite) {
      return left.isFavorite ? -1 : 1;
    }
    const byProvider = left.displayName.localeCompare(right.displayName);
    if (byProvider !== 0) return byProvider;
    return left.name.localeCompare(right.name);
  });
}

export function ModelsCatalog(props: {
  readonly items: ReadonlyArray<ModelsCatalogItem>;
  readonly onToggleFavorite: (instanceId: ProviderInstanceId, model: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length === 0) return props.items;
    return props.items.filter((item) => {
      const haystack = [
        item.name,
        item.slug,
        item.displayName,
        item.shortName ?? "",
        item.subProvider ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [props.items, query]);

  if (props.items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No models available yet. Refresh providers below once a backend is connected.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <InputGroup className="h-8 rounded-lg bg-background/80 shadow-none dark:bg-input/40">
        <InputGroupAddon align="inline-start" className="ps-2.5 text-muted-foreground/70">
          <SearchIcon className="size-3.5 shrink-0" aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search models..."
          aria-label="Search models"
          className="min-w-0 text-sm placeholder:text-muted-foreground/60"
        />
      </InputGroup>

      <ul
        className={cn(
          "divide-y divide-border/60 overflow-y-auto overscroll-contain rounded-xl border border-border/70",
          MODEL_LIST_MAX_HEIGHT_CLASS,
        )}
      >
        {filteredItems.length === 0 ? (
          <li className="px-3 py-6 text-center text-xs text-muted-foreground">
            No models match “{query.trim()}”.
          </li>
        ) : (
          filteredItems.map((item) => (
            <li
              key={`${item.instanceId}:${item.slug}`}
              className="flex min-h-[3.25rem] items-center gap-3 px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate text-sm font-medium text-foreground">{item.name}</span>
                  {item.isCustom ? (
                    <span className="shrink-0 rounded border border-border/70 px-1 py-px text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Custom
                    </span>
                  ) : null}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {item.displayName}
                  {item.subProvider ? (
                    <>
                      <span className="text-muted-foreground/50"> · </span>
                      {item.subProvider}
                    </>
                  ) : null}
                </div>
              </div>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                className={
                  item.isFavorite
                    ? "text-amber-500 hover:text-amber-600"
                    : "text-muted-foreground/50 hover:text-amber-500"
                }
                aria-label={
                  item.isFavorite
                    ? `Remove ${item.name} from favorites`
                    : `Add ${item.name} to favorites`
                }
                aria-pressed={item.isFavorite}
                onClick={() => props.onToggleFavorite(item.instanceId, item.slug)}
              >
                <StarIcon
                  className="size-3.5"
                  fill={item.isFavorite ? "currentColor" : "none"}
                />
              </Button>
            </li>
          ))
        )}
      </ul>

      <p className="text-[11px] text-muted-foreground/70">
        Showing {filteredItems.length} of {props.items.length} models
        {filteredItems.length > 5 ? " · scroll for more" : ""}.
      </p>
    </div>
  );
}
