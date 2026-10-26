<script setup lang="ts">
import { WikiTree } from '~~/shared/wikiTree';
import { wikiTreeKey } from './utils/injectionKey';

// const layout = 'wiki'

const { data: wikiConfig } = await useFetch(`/api/wikiConfig`)
const wikiTree: Ref<WikiTree> = ref(new WikiTree(wikiConfig.value ? wikiConfig.value : {}))

watch(wikiConfig, (newWikiConfig) => {
  if (newWikiConfig) wikiTree.value = new WikiTree(newWikiConfig)
})

provide(wikiTreeKey, wikiTree)

</script>

<template>
  <ThemeProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ThemeProvider>
</template>
