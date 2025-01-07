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
}