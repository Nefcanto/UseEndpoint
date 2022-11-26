import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react";
import { partytownVite } from "@builder.io/partytown/utils";
import { join } from "path";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths(),
      qwikReact(),
      partytownVite({ dest: join(__dirname, "public", "~partytown") }),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    server: {
      host: "0.0.0.0",
      hmr: {
        clientPort: 443,
      },
    },
  };
});
