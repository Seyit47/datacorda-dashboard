export default defineNuxtRouteMiddleware((to) => {
    if (to.name === "index") {
        return navigateTo({
            name: "analytics",
        });
    }
});
