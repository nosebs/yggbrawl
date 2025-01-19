import { eq } from "drizzle-orm";
import { db } from "../../../../database";
import { profile } from "../../../../database/schema";
import { Profile as ProfileT } from "../types/profile";
export abstract class Profile {
    static async getUserProfiles(id: string): Promise<ProfileT[]> {
        return (
            await db.select()
                .from(profile)
                .where(eq(profile.userId, id))
        )
    }

    static async getProfileByUsername(username: string) {
        return (
            await db.select()
                .from(profile)
                .where(eq(profile.name, username))
        )[0]
    }

    static async getProfileById(id: string) {
        return (
            await db.select()
                .from(profile)
                .where(eq(profile.id, id))
        )[0]
    }
}