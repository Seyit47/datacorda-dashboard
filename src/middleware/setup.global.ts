export default defineNuxtRouteMiddleware((to) => {
    if (to.name === "account-confirmation-error" && !to.query.message) {
        return navigateTo({
            name: "analytics",
            replace: true,
        });
    }
    if (to.name === "account-confirmation" && !to.query.access_token) {
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
