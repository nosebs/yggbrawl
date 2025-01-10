import sql from "../sql";
import { Profile as ProfileT } from "../types/profile";
export abstract class Profile {
    static async getUserProfiles(id: string): Promise<ProfileT[]> {
        return (await sql`SELECT name,id FROM profiles WHERE userId = ${id}`).map((v) => {
            return {
              id: v.id,
              name: v.name
            } as ProfileT
        });
    }

    static async getProfileByUsername(username: string) {
        return (await sql`SELECT id,name FROM profiles WHERE name = ${username}`)[0]
    }

    static async getProfileById(id: string) {
        return (await sql`SELECT id,name FROM profiles WHERE id = ${id}`)[0]
    }
}