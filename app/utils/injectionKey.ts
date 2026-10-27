import type { InjectionKey } from "vue";
import type { WikiTree } from "~~/shared/wikiTree";

export const wikiTreeKey = Symbol('wikiConfigKey') as InjectionKey<Ref<WikiTree>>

export const themeConfigKey = Symbol('themeConfigKey') as InjectionKey<Ref<ThemeConfig>>