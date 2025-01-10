import sql from "../sql";
import { randomBytes } from "crypto";

export abstract class Token {
    static async create(userId: string): Promise<string> {
        return (await sql`INSERT INTO tokens (token, userId) VALUES (${randomBytes(24).toString("hex")}, ${userId}) RETURNING token`)[0].token
    }

    static async getUserIdByToken(token: string): Promise<string> {
        return (await sql`SELECT userId FROM tokens WHERE token = ${token}`)[0].userid;
    }

    static async delete(token: string): Promise<void> {
        await sql`DELETE FROM tokens WHERE token = ${token}`
    }

    static async deleteTokensByUserId(userId: string): Promise<void> {
        await sql`DELETE FROM tokens WHERE userId = ${userId}`
    }
}