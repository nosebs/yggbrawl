import { t } from 'elysia'

export const NOT_FOUND_MESSAGE = "The server has not found anything matching the request URI"

const exception = t.Object({
    error: t.String(),
    cause: t.Optional(t.String()),
    errorMessage: t.String()
})

type Exception = typeof exception.static

export { exception, Exception }