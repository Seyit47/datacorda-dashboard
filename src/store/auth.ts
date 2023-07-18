import { defineStore } from "pinia";
import type { UserData } from "@/types/data/user";
import type { UserState } from "@/types/store/auth";

export const useAuthStore = defineStore("users", {
    state: (): UserState => ({
        user: null,
        accessToken: null,
    }),
    getters: {
        getUser(state) {
            return state.user;
        },

        getAccessToken(state) {
            return state.accessToken;
        },
    },
    actions: {
        setUser(user: UserData | null) {
            this.user = user;
        },

        setAccessToken(token: string | null) {
            this.accessToken = token;
        },
    },
    persist: true,
});
