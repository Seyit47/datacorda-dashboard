import { defineStore } from "pinia";
import type { GameData } from "@/types/data/game";
import type { GameState } from "@/types/store/game";

export const useGameStore = defineStore("game", {
    state: (): GameState => ({
        game: null,
        gameId: null,
    }),
    getters: {
        getGame(state) {
            return state.game;
        },

        getGameId(state) {
            return state.gameId;
        },

        isAnalyticsReady(state) {
            return state.game ? state.game.analytics_ready : null;
        },

        isModelReady(state) {
            return state.game ? state.game.model_ready : null;
        },
    },
    actions: {
        setGame(game: GameData | null) {
            this.game = game;
        },

        setGameId(id: string | null) {
            this.gameId = id;
        },
    },
    persist: true,
});
