import type { WikiConfig } from '../shared/wikiTree.ts'

export const wikiConfig: WikiConfig = {
    "简介": {
        "关于本项目": "intro/about",
        "用户指南": "intro/users",
        test: {
            test: {
                B: "intro/test/test/b"
            },
            A: "intro/test/a"
        }
    },
    "北方地区": {
        "简介": "northern/intro",
        "A": "northern/a"
    },
}

export default wikiConfig