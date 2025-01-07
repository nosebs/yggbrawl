import { t } from 'elysia'
import { property } from './property'

const user = t.Object({
    id: t.String(),
	username: t.String(),
    properties: t.Array(property),
})

type User = typeof user.static

export { user, User }