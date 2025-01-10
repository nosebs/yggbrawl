import { t } from 'elysia'

const hasJoined = t.Object({
    username: t.String(),
    serverId: t.String()
})

type HasJoined = typeof hasJoined.static

export { HasJoined, hasJoined }