import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Muco's 6.1040 Portfolio",
  description: "6.1040 Fall 2024",
  // TODO: add your base here; this should be your repo name!
  base: "/portfolio-muco/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Assignments", link: "/assignments"},
      // { text: "Blogs", link: "/blogs" }
    ],

    // sidebar: [
    //   {
    //     text: "Assignments",
    //     link: "/assignments",
    //   },
    //   {
    //     text: "Blogs",
    //     link: "/blogs",
    //   },
    // ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa24" }],
  },
});
