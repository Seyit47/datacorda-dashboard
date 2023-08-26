import { GameData } from "@/types/data/game";

export interface GameState {
    game: GameData | null;
    gameId: string | null;
}
