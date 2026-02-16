import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
function resolveBasePath() {
    var _a;
    var repository = process.env.GITHUB_REPOSITORY;
    if (!repository) {
        return "/";
    }
    var repoName = (_a = repository.split("/")[1]) !== null && _a !== void 0 ? _a : "";
    if (!repoName || repoName.endsWith(".github.io")) {
        return "/";
    }
    return "/".concat(repoName, "/");
}
export default defineConfig({
    plugins: [react()],
    base: resolveBasePath()
});
