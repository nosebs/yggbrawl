import { t } from 'elysia'

const refresh = t.Object({
    accessToken: t.String(),
    clientToken: t.String(),
    //selectedProfile: profile,
    requestUser: t.Boolean()
})

type Refresh = typeof refresh.static

export { Refresh, refresh }