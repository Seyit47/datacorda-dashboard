import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useGameStore } from "~/store/game";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const gameStore = useGameStore();

    const { accessToken } = storeToRefs(authStore);
    const { gameId } = storeToRefs(gameStore);

    if (to.name === "login" || accessToken.value) {
        if (to.name === "games" || gameId.value) {
            return;
        }

        return navigateTo({
            name: "games",
            replace: true,
        });
    }

    return navigateTo({
        name: "login",
        replace: true,
    });
});
