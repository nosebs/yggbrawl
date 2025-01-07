import { t } from 'elysia'
import { profile } from '../profile'
import { user } from '../user'

const refreshResponse = t.Object({
    clientToken: t.String(),
    accessToken: t.String(),
    selectedProfile: t.Optional(profile),
    user: t.Optional(user),
})

type RefreshResponse = typeof refreshResponse.static

export { RefreshResponse, refreshResponse }