import sql from "../sql";
import { Property } from "../types/property";

export abstract class UserProperty {
    static async getByUserId(userId: string): Promise<Property[]> {
        return (await sql`SELECT name,value FROM userProperty WHERE userId = ${userId}`).map((v) => {
            return {
              name: v.name,
              value: v.value
            } as Property
        });
    }
}