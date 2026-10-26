import { wikiConfig } from '~~/content/wiki.config'
import type { WikiConfig } from '~~/shared/wikiTree'

export default defineEventHandler(async (event): Promise<WikiConfig> => {
  return wikiConfig
})