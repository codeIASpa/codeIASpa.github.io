import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://codeiaspa.github.io",
  base: "https://codeiaspa.github.io",
  integrations: [tailwind(), mdx(), sitemap(), icon()],
});
