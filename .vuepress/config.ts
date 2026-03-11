import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import markdownItObsidianCallouts from "markdown-it-obsidian-callouts";
import wikilinks from "@shdwcat/markdown-it-wikilinks";

export default defineUserConfig({
  base: "/soft_exam/",

  lang: "zh-CN",
  title: "文档演示",
  description: "vuepress-theme-hope 的文档演示",

  theme,

  extendsMarkdown: (md) => {
    // 开启 callout语法 (需要单独添加官方提供的 css)
    md.use(markdownItObsidianCallouts); // https://github.com/ebullient/markdown-it-obsidian-callouts

    // 开启 wikilink  https://www.npmjs.com/package/markdown-it-wikilinks      // npm install @shdwcat/markdown-it-wikilinks
    md.use(
      wikilinks({
        // 核心配置选项
        baseURL: "/", // 绝对链接的基础路径，例如 [[/getting-started]] 会指向 /getting-started.html
        relativeBaseURL: "./", // 相对链接的基础路径，例如 [[start]] 会指向 ./start.html
        uriSuffix: ".html", // 链接后缀，应与 VuePress 生成的页面后缀一致

        // 可选的高级配置
        makeAllLinksAbsolute: false, // 是否将所有链接渲染为绝对链接
        htmlAttributes: {
          // 为所有生成的链接添加自定义 HTML 属性，如 class
          class: "wikilink",
        },

        // 自定义页面名生成逻辑（重要功能）
        // 例如，让 [[révolution!]] 和 [[RÉVOLUTION!!!]] 都指向 Revolution.html
        generatePageNameFromLabel: (label) => {
          // 这里可以编写你的转换逻辑
          return label.trim(); // 默认直接返回，不处理
        },

        // 对页面名进行后处理（默认：清理、空格转下划线）
        // postProcessPageName: (pageName) => { return pageName; },

        // 对链接显示的标签文本进行后处理（默认：清理、首字母大写）
        // postProcessLabel: (label) => { return label; }
      })
    );
  },
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
