// @ts-check
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import node from "@astrojs/node";
// https://astro.build/config
export default defineConfig({
  image: {
      domains: ["srv.nl"]
  },

  integrations: [react()],

  adapter: node({
    mode: "standalone",
  }),
   // experimental:({
  //   csp:true
  // }),
});