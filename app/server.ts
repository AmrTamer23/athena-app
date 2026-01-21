import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";
import handler from "./dist/server/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = Number(process.env.PORT) || 80;
const hostname = process.env.HOSTNAME || "0.0.0.0";

const clientDir = join(__dirname, "dist", "client");

const server = Bun.serve({
  port,
  hostname,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const staticFilePath = join(clientDir, pathname);
    
    if (existsSync(staticFilePath)) {
      const file = Bun.file(staticFilePath);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            "Content-Type": getContentType(pathname),
          },
        });
      }
    }

    if (pathname === "/" || (!pathname.includes(".") && !pathname.startsWith("/api"))) {
      const indexPath = join(clientDir, "index.html");
      if (existsSync(indexPath)) {
        const file = Bun.file(indexPath);
        if (await file.exists()) {
          return new Response(file, {
            headers: {
              "Content-Type": "text/html",
            },
          });
        }
      }
    }

    try {
      return await handler.fetch(req);
    } catch (error) {
      console.error("Error handling request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});

function getContentType(pathname: string): string {
  const ext = pathname.split(".").pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    webp: "image/webp",
    avif: "image/avif",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
  };
  return contentTypes[ext || ""] || "application/octet-stream";
}

console.log(`Server listening on http://${hostname}:${port}`);
