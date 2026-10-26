import type { WikiTree } from "~~/shared/wikiTree";

export const wikiTreeKey = Symbol('wikiConfigKey') as InjectionKey<Ref<WikiTree>>