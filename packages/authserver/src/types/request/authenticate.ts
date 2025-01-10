import { t } from 'elysia'
import { agent } from '../agent'

const authenticate = t.Object({
    agent,
    username: t.String({ minLength: 3, maxLength: 16 }),
    password: t.String(),
    clientToken: t.String(),
    requestUser: t.Boolean()
})

type Authenticate = typeof authenticate.static

export { Authenticate, authenticate }