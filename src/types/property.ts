import { t } from 'elysia'

const property = t.Object({
	name: t.String(),
    value: t.String()
})

type Property = typeof property.static

export { property, Property }