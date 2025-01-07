import sql from "../sql";

export abstract class User {
    static async getByEmail(email: string) {
        return (await sql`SELECT * FROM users WHERE email = ${email}`)[0];
    }

    static async getById(id: string) {
        return (await sql`SELECT * FROM users WHERE id = ${id}`)[0];
    }
}