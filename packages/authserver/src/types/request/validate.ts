import { t } from 'elysia'

const validate = t.Object({
    accessToken: t.String(),
    clientToken: t.String()
})

type Validate = typeof validate.static

export { Validate, validate }