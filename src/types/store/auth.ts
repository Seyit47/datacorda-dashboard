import { UserData } from "@/types/data/user";

export interface UserState {
    user: UserData | null;
    accessToken: string | null;
}
