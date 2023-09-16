export default defineNuxtRouteMiddleware((to) => {
    if (to.name === "account-confirmation" && !to.query) {
        return navigateTo({
            name: "analytics",
            replace: true,
        });
    }
    if (to.name === "index") {
        return navigateTo({
            name: "analytics",
            replace: true,
        });
    }
});
