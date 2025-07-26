/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_CHAT_ENDPOINT: string
  readonly VITE_API_KEY: string
  readonly VITE_CALL_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
