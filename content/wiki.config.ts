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
        "北京市": {
            "简介": "northern/beijing/intro",
            "传统戏剧": {
                "京剧": "northern/beijing/traditional-opera/jingju",
            },
            "曲艺": {
                "京韵大鼓": "northern/beijing/quyi/jingyun-dagu",
            },
            "传统美术": {
                "北京绢花": "northern/beijing/fine-arts/juanhua",
            },
            "传统技艺": {
                "景泰蓝制作技艺": "northern/beijing/craft/jingtailan",
            },
            "传统医药": {
                "同仁堂中医药文化": "northern/beijing/medicine/tongrentang",
            },
        },
        "天津市": {
            "简介": "northern/tianjin/intro",
            "传统美术": {
                "杨柳青木版年画": "northern/tianjin/fine-arts/yangliuqing",
            },
            "传统技艺": {
                "天津“风筝魏”风筝制作技艺": "northern/tianjin/craft/fengzheng-wei",
            },
        },
        "河北省": {
            "简介": "northern/hebei/intro",
            "传统戏剧": {
                "河北梆子": "northern/hebei/traditional-opera/hebeibangzi",
            },
            "传统体育、游艺与杂技": {
                "吴桥杂技": "northern/hebei/acrobatics/wuqiao-zaji",
            },
            "传统美术": {
                "蔚县剪纸": "northern/hebei/fine-arts/weixian-jianzhi",
            },
            "传统技艺": {
                "定瓷烧制技艺": "northern/hebei/craft/dingci",
            },
        },
        "山西省": {
            "简介": "northern/shanxi/intro",
            "传统音乐": {
                "左权开花调": "northern/shanxi/traditional-music/kaihuadiao",
            },
            "传统戏剧": {
                "晋剧": "northern/shanxi/traditional-opera/jinju",
            },
            "传统技艺": {
                "平遥推光漆器髹饰技艺": "northern/shanxi/craft/tuiguang-qiqi",
            },
        },
        "内蒙古自治区": {
            "简介": "northern/neimenggu/intro",
            "传统音乐": {
                "蒙古族长调民歌": "northern/neimenggu/traditional-music/changdiao",
                "蒙古族马头琴音乐": "northern/neimenggu/traditional-music/morin-khuur",
            },
            "传统舞蹈": {
                "蒙古族安代舞": "northern/neimenggu/traditional-dance/andai",
            },
        },
        "辽宁省": {
            "简介": "northern/liaoning/intro",
            "传统戏剧": {
                "海城喇叭戏": "northern/liaoning/traditional-opera/haicheng-laba",
            },
            "传统美术": {
                "岫岩玉雕": "northern/liaoning/fine-arts/xiuyan-yudiao",
            },
        },
        "吉林省": {
            "简介": "northern/jilin/intro",
            "传统舞蹈": {
                "朝鲜族农乐舞": "northern/jilin/traditional-dance/nongle-wu",
            },
            "传统技艺": {
                "松花石砚制作技艺": "northern/jilin/craft/songhua-yan",
            },
        },
        "黑龙江省": {
            "简介": "northern/heilongjiang/intro",
            "民间文学": {
                "赫哲族伊玛堪": "northern/heilongjiang/folk-literature/yimakan",
            },
            "传统技艺": {
                "桦树皮制作技艺": "northern/heilongjiang/craft/huashupi",
            },
        },
        "山东省": {
            "简介": "northern/shandong/intro",
            "传统戏剧": {
                "柳子戏": "northern/shandong/traditional-opera/liuzixi",
            },
            "曲艺": {
                "山东快书": "northern/shandong/quyi/shandong-kuaishu",
            },
            "传统美术": {
                "杨家埠木版年画": "northern/shandong/fine-arts/yangjiabu",
            },
            "传统技艺": {
                "潍坊风筝制作技艺": "northern/shandong/craft/weifang-fengzheng",
            },
        },
        "河南省": {
            "简介": "northern/henan/intro",
            "传统戏剧": {
                "豫剧": "northern/henan/traditional-opera/yuju",
            },
            "传统体育、游艺与杂技": {
                "少林功夫": "northern/henan/acrobatics/shaolin-gongfu",
            },
            "传统美术": {
                "朱仙镇木版年画": "northern/henan/fine-arts/zhuxianzhen",
            },
            "传统技艺": {
                "钧瓷烧制技艺": "northern/henan/craft/junci",
            },
        },
    },
    "东部地区": {
        "简介": "eastern/intro",
        "上海市": {
            "简介": "eastern/shanghai/intro",
            "传统戏剧": {
                "沪剧": "eastern/shanghai/traditional-opera/huju",
            },
            "传统美术": {
                "顾绣": "eastern/shanghai/fine-arts/guxiu",
            },
        },
        "江苏省": {
            "简介": "eastern/jiangsu/intro",
            "传统戏剧": {
                "昆曲": "eastern/jiangsu/traditional-opera/kunqu",
            },
            "曲艺": {
                "苏州评弹": "eastern/jiangsu/quyi/suzhou-pingtan",
            },
            "传统美术": {
                "苏绣": "eastern/jiangsu/fine-arts/suxiu",
            },
            "传统技艺": {
                "南京云锦木机妆花手工织造技艺": "eastern/jiangsu/craft/yunjin",
                "宜兴紫砂陶制作技艺": "eastern/jiangsu/craft/zisha",
            },
        },
        "浙江省": {
            "简介": "eastern/zhejiang/intro",
            "传统戏剧": {
                "越剧": "eastern/zhejiang/traditional-opera/yueju",
            },
            "传统美术": {
                "东阳木雕": "eastern/zhejiang/fine-arts/dongyang-mudiao",
            },
            "传统技艺": {
                "龙泉青瓷烧制技艺": "eastern/zhejiang/craft/longquan-qingci",
            },
        },
        "安徽省": {
            "简介": "eastern/anhui/intro",
            "传统戏剧": {
                "黄梅戏": "eastern/anhui/traditional-opera/huangmeixi",
            },
            "传统美术": {
                "徽州三雕": "eastern/anhui/fine-arts/huizhou-sandiao",
            },
            "传统技艺": {
                "宣纸制作技艺": "eastern/anhui/craft/xuanzhi",
            },
        },
        "福建省": {
            "简介": "eastern/fujian/intro",
            "传统音乐": {
                "南音": "eastern/fujian/traditional-music/nanyin",
            },
            "传统体育、游艺与杂技": {
                "咏春拳": "eastern/fujian/acrobatics/yongchunquan",
            },
            "传统美术": {
                "寿山石雕": "eastern/fujian/fine-arts/shoushan-shidiao",
            },
            "传统技艺": {
                "德化瓷烧制技艺": "eastern/fujian/craft/dehua-ci",
                "武夷岩茶（大红袍）制作技艺": "eastern/fujian/craft/wuyiyancha",
            },
        },
        "江西省": {
            "简介": "eastern/jiangxi/intro",
            "传统戏剧": {
                "弋阳腔": "eastern/jiangxi/traditional-opera/yiyangqiang",
            },
            "传统技艺": {
                "景德镇手工制瓷技艺": "eastern/jiangxi/craft/jingdezhen",
                "夏布织造技艺": "eastern/jiangxi/craft/wanzai-xiabu",
            },
        },
    },
    "南方地区": {
        "简介": "southern/intro",
        "广东省": {
            "简介": "southern/guangdong/intro",
            "传统音乐": {
                "广东音乐": "southern/guangdong/traditional-music/guangdong-yinyue",
            },
            "传统戏剧": {
                "粤剧": "southern/guangdong/traditional-opera/yueju",
            },
            "传统美术": {
                "广绣": "southern/guangdong/fine-arts/guangxiu",
            },
            "传统技艺": {
                "端砚制作技艺": "southern/guangdong/craft/duanyan",
            },
            "民俗": {
                "潮州工夫茶艺": "southern/guangdong/folk-custom/gongfu-cha",
            },
        },
        "广西壮族自治区": {
            "简介": "southern/guangxi/intro",
            "传统戏剧": {
                "桂剧": "southern/guangxi/traditional-opera/guiju",
            },
            "传统技艺": {
                "侗族木构建筑营造技艺": "southern/guangxi/craft/dongzu-mugou",
                "壮族织锦技艺": "southern/guangxi/craft/zhuang-jin",
            },
        },
        "海南省": {
            "简介": "southern/hainan/intro",
            "传统戏剧": {
                "琼剧": "southern/hainan/traditional-opera/qiongju",
            },
            "传统技艺": {
                "黎族船型屋营造技艺": "southern/hainan/craft/chuanxingwu",
                "黎族传统纺染织绣技艺": "southern/hainan/craft/li-jin",
            },
        },
        "湖南省": {
            "简介": "southern/hunan/intro",
            "传统戏剧": {
                "花鼓戏": "southern/hunan/traditional-opera/huaguxi",
            },
            "传统美术": {
                "湘绣": "southern/hunan/fine-arts/xiangxiu",
            },
            "传统技艺": {
                "浏阳花炮制作技艺": "southern/hunan/craft/liuyang-yanhua",
                "土家族织锦技艺": "southern/hunan/craft/tujia-jin",
            },
        },
        "湖北省": {
            "简介": "southern/hubei/intro",
            "传统戏剧": {
                "汉剧": "southern/hubei/traditional-opera/hanju",
            },
            "传统技艺": {
                "楚式漆器髹饰技艺": "southern/hubei/craft/chushi-qiqi",
            },
            "民俗": {
                "端午节": "southern/hubei/folk-custom/duanwu",
            },
        },
    },
    "西部地区": {
        "简介": "western/intro",
        "重庆市": {
            "简介": "western/chongqing/intro",
            "传统音乐": {
                "川江号子": "western/chongqing/traditional-music/chuanjiang-haozi",
            },
            "传统美术": {
                "梁平木版年画": "western/chongqing/fine-arts/liangping",
            },
            "传统技艺": {
                "荣昌陶器制作技艺": "western/chongqing/craft/rongchang-taoqi",
            },
        },
        "四川省": {
            "简介": "western/sichuan/intro",
            "传统戏剧": {
                "川剧": "western/sichuan/traditional-opera/chuanju",
            },
            "曲艺": {
                "四川清音": "western/sichuan/quyi/sichuan-qingyin",
            },
            "传统美术": {
                "蜀绣": "western/sichuan/fine-arts/shuxiu",
            },
            "传统技艺": {
                "蜀锦织造技艺": "western/sichuan/craft/shujin",
            },
        },
        "贵州省": {
            "简介": "western/guizhou/intro",
            "传统音乐": {
                "侗族大歌": "western/guizhou/traditional-music/dongzu-dage",
            },
            "传统美术": {
                "苗绣": "western/guizhou/fine-arts/miaoxiu",
            },
            "传统技艺": {
                "苗族蜡染技艺": "western/guizhou/craft/lazhi",
                "茅台酒酿制技艺": "western/guizhou/craft/maotai",
            },
        },
        "云南省": {
            "简介": "western/yunnan/intro",
            "传统舞蹈": {
                "傣族孔雀舞": "western/yunnan/traditional-dance/kongque-wu",
            },
            "传统美术": {
                "纳西族东巴画": "western/yunnan/fine-arts/dongba-hua",
            },
            "传统技艺": {
                "白族扎染技艺": "western/yunnan/craft/zharan",
            },
        },
        "西藏自治区": {
            "简介": "western/xizang/intro",
            "传统戏剧": {
                "藏戏": "western/xizang/traditional-opera/zangxi",
            },
            "传统美术": {
                "藏族唐卡": "western/xizang/fine-arts/tangka",
            },
            "传统医药": {
                "藏医药": "western/xizang/medicine/zangyiyao",
            },
        },
        "陕西省": {
            "简介": "western/shaanxi/intro",
            "传统戏剧": {
                "秦腔": "western/shaanxi/traditional-opera/qinqiang",
            },
            "曲艺": {
                "陕北说书": "western/shaanxi/quyi/shaanbei-shuoshu",
            },
            "传统美术": {
                "凤翔木版年画": "western/shaanxi/fine-arts/fengxiang",
            },
            "传统技艺": {
                "耀州窑陶瓷烧制技艺": "western/shaanxi/craft/yaozhou",
            },
        },
        "甘肃省": {
            "简介": "western/gansu/intro",
            "传统音乐": {
                "花儿": "western/gansu/traditional-music/huaer",
            },
            "传统舞蹈": {
                "兰州太平鼓": "western/gansu/traditional-dance/taiping-gu",
            },
            "传统美术": {
                "庆阳香包绣制": "western/gansu/fine-arts/qingyang-xiangbao",
            },
        },
        "青海省": {
            "简介": "western/qinghai/intro",
            "民间文学": {
                "格萨尔": "western/qinghai/folk-literature/gesar",
            },
            "传统美术": {
                "热贡艺术": "western/qinghai/fine-arts/regong",
            },
            "传统技艺": {
                "土族盘绣": "western/qinghai/craft/tuzu-panxiu",
            },
        },
        "宁夏回族自治区": {
            "简介": "western/ningxia/intro",
            "传统技艺": {
                "贺兰砚制作技艺": "western/ningxia/craft/helanyan",
            },
            "民俗": {
                "回族服饰": "western/ningxia/folk-custom/huizu-fushi",
            },
        },
        "新疆维吾尔自治区": {
            "简介": "western/xinjiang/intro",
            "传统音乐": {
                "十二木卡姆": "western/xinjiang/traditional-music/muqam",
            },
            "传统技艺": {
                "维吾尔族艾德莱斯绸织染技艺": "western/xinjiang/craft/atlas",
            },
            "民俗": {
                "麦西热甫": "western/xinjiang/folk-custom/meshrep",
            },
        },
    },
}

export default wikiConfig
