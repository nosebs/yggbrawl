import { t } from 'elysia'

const signout = t.Object({
    username: t.String(),
    password: t.String()
})

type Signout = typeof signout.static

export { Signout, signout }