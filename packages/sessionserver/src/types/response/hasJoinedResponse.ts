import { t } from 'elysia'
import { property } from '../property'

const hasJoinedResponse = t.Object({
    id: t.String(),
    name: t.String(),
    properties: t.Array(property)
})

type HasJoinedResponse = typeof hasJoinedResponse.static

export { HasJoinedResponse, hasJoinedResponse }