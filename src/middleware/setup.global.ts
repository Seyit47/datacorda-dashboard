export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return;

    if (to.name === "index") {
        return navigateTo({
            name: "analytics",
        });
    }
});
