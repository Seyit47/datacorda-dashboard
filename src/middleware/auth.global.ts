import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();

    const { accessToken } = storeToRefs(authStore);

    if (to.name === "login" || accessToken.value) {
        return;
    }

    return navigateTo({
        name: "login",
        replace: true,
    });
});
