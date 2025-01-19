import {
    pgTable,
    varchar,
    uuid,
    timestamp,
    customType
} from 'drizzle-orm/pg-core'
import { v4 as uuidv4 } from 'uuid';

export const user = pgTable(
    'user',
    {
        id: uuid('id')
            .$defaultFn(() => uuidv4())
            .primaryKey(),
        email: varchar('email').notNull().unique(),
        password: varchar('password').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull()
    }
)


export const profile = pgTable(
    'profile',
    {
        id: uuid('id')
            .$defaultFn(() => uuidv4())
            .primaryKey(),
        name: varchar('name').notNull().unique(),
        userId: uuid('user_id').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull()
    }
)

export const token = pgTable(
    'token',
    {
        id: uuid('id')
            .$defaultFn(() => uuidv4())
            .primaryKey(),
        token: varchar('token').notNull().unique(),
        userId: uuid('user_id').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull()
    }
)

export const table = {
	user,
    profile,
    token
} as const

export type Table = typeof table