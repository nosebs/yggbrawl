import { randomBytes } from "crypto";
import { db } from "../../../../database";
import { profile, token } from "../../../../database/schema";
import { eq } from "drizzle-orm";

export abstract class Token {
    static async create(userId: string): Promise<string> {
        return (
            await db.insert(token).values({
                token: randomBytes(24).toString("hex"),
                userId
            }).returning({
                token: token.token
            })
        )[0].token
    }

    static async getUserIdByToken(_token: string): Promise<string | null> {
        let user = (
                    await db.select({ userId: token.userId })
                        .from(token)
                        .where(eq(token.token, _token))
        )[0]
        if(!user) return null
        return user.userId
    }

    static async delete(_token: string): Promise<void> {
        await db.delete(token).where(eq(token.token, _token))
    }

    static async deleteTokensByUserId(userId: string): Promise<void> {
        await db.delete(token).where(eq(token.userId, userId))
    }
}