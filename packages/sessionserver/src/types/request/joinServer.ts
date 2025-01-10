import { t } from 'elysia'

const joinServer = t.Object({
    accessToken: t.String(),
    selectedProfile: t.String(),
    serverId: t.String()
})

type JoinServer = typeof joinServer.static

export { JoinServer, joinServer }