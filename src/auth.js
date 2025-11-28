import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { jazzPlugin } from "jazz-tools/better-auth/auth/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const auth = betterAuth({
    plugins: [jazzPlugin()],
    trustedOrigins: [process.env.TRUSTED_ORIGINS.split(",")],
    database: new Database(join(__dirname, "../db/sqlite.db")),
    emailAndPassword: {
        enabled: true,
        disableSignUp: process.env.NODE_ENV === "production",
    },
})
