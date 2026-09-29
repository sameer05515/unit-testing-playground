import { defineConfig } from "vitest/config";
export default defineConfig({test:{globals:true,environment:"node",setupFiles:["./tests/setup.js"],clearMocks:true,restoreMocks:true,coverage:{provider:"v8",reporter:["text","html","json"]}}});
