import { t } from 'elysia'

const agent = t.Object({
	name: t.String(),
    version: t.Number()
})

type Agent = typeof agent.static

export { agent, Agent }