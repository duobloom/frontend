import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
import tailwindcss from "tailwindcss";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // vite에서 env 사용

  return {
    plugins: [
      react(),
      sentryVitePlugin({
        org: "duobloom",
        project: "duobloom-sentry",
        sourcemaps: {
          filesToDeleteAfterUpload: "./dist/**/*.map",
        },
        authToken: env.VITE_APP_SENTRY_AUTH_TOKEN,
      }),
      svgr({ include: "**/*.svg?react" }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://ec2-52-78-212-34.ap-northeast-2.compute.amazonaws.com:8080",
          changeOrigin: true,
        },
        "/file": {
          target: "http://ec2-52-78-212-34.ap-northeast-2.compute.amazonaws.com:8080",
          changeOrigin: true,
        },
        "/IMAGE": {
          target: "http://ec2-52-78-212-34.ap-northeast-2.compute.amazonaws.com:8080",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("icon-")) {
              return `icons/${id.split("/").pop()?.replace(".svg?react", "")}`;
            }
            if (id.includes("@sentry")) {
              return "sentry";
            }
          },
        },
      },

      sourcemap: true,
    },
  };
});
