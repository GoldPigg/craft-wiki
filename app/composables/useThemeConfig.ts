export const defaultTheme = {

    // 表面
    colorBg: '#F7F3EC',            // 宣纸 100 · 页面背景
    colorSurface: '#FFFFFF',       // 纯白 · 卡片、内容区
    colorSurfaceRaised: '#FFFFFF', // 纯白 · 弹窗、下拉
    colorBgSubtle: '#FDFAF5',      // 宣纸 50 · 代码块、浅背景

    // 文本
    colorTextPrimary: '#3B2F25',   // 墨褐 700 · 正文
    colorTextSecondary: '#8A7A64', // 驼褐 500 · 次要文字
    colorTextMuted: '#B5A88F',     // 浅驼 400 · 辅助信息
    colorTextInverse: '#FFFFFF',   // 纯白 · 深色背景上的文字

    // 边框
    colorBorder: '#E8E0D0',        // 米灰 200 · 默认边框
    colorBorderStrong: '#B5A88F',  // 浅驼 400 · 强调边框

    // 主色（朱砂）
    colorPrimary: '#C0392B',       // 朱砂 500 · 链接、主按钮
    colorPrimaryHover: '#9A2C20',  // 朱砂 700 · hover
    colorPrimaryActive: '#7F241A', // 朱砂 800 · 按下
    colorPrimaryBg: '#FDF2F0',     // 朱砂 50 · 选中态浅背景

    // 辅色（黛蓝）
    colorAccent: '#2C3E7A',        // 黛蓝 700 · 分类标签、徽标
    colorAccentHover: '#5A7AB8',   // 黛蓝 600 · hover
    colorAccentBg: '#E6ECF5',      // 黛蓝 100 · 辅色浅背景

    // 状态
    colorSuccess: '#4A7C59',       // 苔绿 600 · 成功
    colorWarning: '#B8860B',       // 鎏金 600 · 警告
    colorDanger: '#A93226',        // 深朱砂 600 · 错误、危险

    // 焦点
    colorFocusRing: '#2C3E7A',     // 黛蓝 700 · 键盘焦点环

    // 纹理
    paperTextureOpacity: '0.06',   // 宣纸纹理强度
    paperTextureBlend: 'multiply', // 亮色下正片叠底

    // 字体栈
    fontHeading: "'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', serif",
    fontBody: "'LXGW WenKai', 'Kaiti SC', 'STKaiti', serif",
    fontUi: "'Source Han Sans SC', system-ui, -apple-system, sans-serif",
    fontMono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",

    // 字号
    textXs: '0.75rem',      // 12px
    textSm: '0.875rem',     // 14px h6
    textBase: '1rem',       // 16px 正文、h5
    textLg: '1.125rem',     // 18px h4
    textXl: '1.375rem',     // 22px h3（原 1.25rem）
    text2xl: '1.75rem',     // 28px h2（原 1.5rem）
    text3xl: '2.25rem',     // 36px h1（原 1.875rem）
    text4xl: '2.75rem',     // 44px 页面标题（layout）

    // 行高
    leadingTight: '1.3',
    leadingSnug: '1.5',
    leadingNormal: '1.75',
    leadingLoose: '1.9',

    // 间距
    space1: '0.25rem',
    space2: '0.5rem',
    space3: '0.75rem',
    space4: '1rem',
    space6: '1.5rem',
    space8: '2rem',
    space12: '3rem',
    space16: '4rem',

    // 圆角
    radiusSm: '2px',
    radiusMd: '4px',
    radiusLg: '8px',
    radiusFull: '50%',

    // 阴影
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    shadowMd: '0 2px 8px rgba(0, 0, 0, 0.08)',
    shadowLg: '0 4px 16px rgba(0, 0, 0, 0.10)',
    shadowSeal:
        'inset 0 1px 0 rgba(255, 255, 255, 0.25), ' +
        'inset 0 -1px 0 rgba(0, 0, 0, 0.2), ' +
        'inset 0 0 0 1px rgba(247, 243, 236, 0.12), ' +
        'inset 0 2px 4px rgba(0, 0, 0, 0.15), ' +
        '0 1px 2px rgba(0, 0, 0, 0.18), ' +
        '0 2px 6px rgba(192, 57, 43, 0.15)',

    // 动效
    transitionFast: '0.12s ease',
    transitionBase: '0.2s ease',
    transitionSlow: '0.3s ease',
    easeOut: 'cubic-bezier(0.2, 0, 0.2, 1)',

    // 布局
    contentMax: '72rem',
    headerHeight: '3.5rem',
    sidebarWidth: '16rem',
    tocWidth: '14rem',
    proseMax: '42rem',
    proseMaxWidth: '42rem',

    // 层级
    zBase: '0',
    zSticky: '10',
    zHeader: '50',
    zMobileNav: '40',
    zOverlay: '90',
    zModal: '100',
    zToast: '110',

    // 纹理（data URI 单独拆出来，避免行太长）
    paperTextureSize: '200px 200px',
}

export type ThemeConfig = typeof defaultTheme

export default {
    setup() {
        const themeConfig = inject<ThemeConfig>("themeConfig")
        return themeConfig
    }
}