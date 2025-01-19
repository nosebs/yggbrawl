import { eq } from "drizzle-orm";
import { db } from "../../../../database";
import { user } from "../../../../database/schema";

export abstract class User {
    static async getByEmail(email: string) {
        return (
            await db.select()
                .from(user)
                .where(eq(user.email, email))
        )[0]
    }

    static async getById(id: string) {
        return (
            await db.select()
                .from(user)
                .where(eq(user.id, id))
        )[0]
    }
}