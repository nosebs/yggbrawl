import { t } from 'elysia'

const property = t.Object({
    name: t.String(),
    value: t.String(),
    signature: t.Optional(t.String())
})

type Property = typeof property.static

export { Property, property }