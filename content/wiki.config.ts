import type { WikiConfig } from '../shared/wikiTree.ts'

export const wikiConfig: WikiConfig = {
    "简介": {
        "关于本项目": "intro/about",
        "用户指南": "intro/users",
        "非遗总览": "intro/overview",
        "项目分类说明": "intro/classification",
    },
    "北方地区": {
        "简介": "northern/intro",
        "北京市": "northern/beijing",
        "天津市": "northern/tianjin",
        "河北省": "northern/hebei",
        "山西省": "northern/shanxi",
        "内蒙古自治区": "northern/neimenggu",
        "辽宁省": "northern/liaoning",
        "吉林省": "northern/jilin",
        "黑龙江省": "northern/heilongjiang",
        "山东省": "northern/shandong",
        "河南省": "northern/henan",
    },
    "东部地区": {
        "简介": "eastern/intro",
        "上海市": "eastern/shanghai",
        "江苏省": "eastern/jiangsu",
        "浙江省": "eastern/zhejiang",
        "安徽省": "eastern/anhui",
        "福建省": "eastern/fujian",
        "江西省": "eastern/jiangxi",
    },
    "南方地区": {
        "简介": "southern/intro",
        "广东省": "southern/guangdong",
        "广西壮族自治区": "southern/guangxi",
        "海南省": "southern/hainan",
        "湖南省": "southern/hunan",
        "湖北省": "southern/hubei",
    },
    "西部地区": {
        "简介": "western/intro",
        "重庆市": "western/chongqing",
        "四川省": "western/sichuan",
        "贵州省": "western/guizhou",
        "云南省": "western/yunnan",
        "西藏自治区": "western/xizang",
        "陕西省": "western/shaanxi",
        "甘肃省": "western/gansu",
        "青海省": "western/qinghai",
        "宁夏回族自治区": "western/ningxia",
        "新疆维吾尔自治区": "western/xinjiang",
    },
}

export default wikiConfig
