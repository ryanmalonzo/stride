declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    SESSION_COOKIE_SECRET: string;
  }
}
