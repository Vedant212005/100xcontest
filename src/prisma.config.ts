// prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
  migrate: {
    url: "postgresql://prisma:prisma123@127.0.0.1:51214/appdb?sslmode=disable",
  },
});
