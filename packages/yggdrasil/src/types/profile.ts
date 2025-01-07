import { t } from 'elysia'

const profile = t.Object({
    id: t.String(),
    name: t.String()
})

type Profile = typeof profile.static

export { profile, Profile }