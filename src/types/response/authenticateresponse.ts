import { t } from 'elysia'
import { profile } from '../profile'
import { user } from '../user'

const authenticateResponse = t.Object({
    user: t.Optional(user), //requestUser == false
	clientToken: t.String(),
    accessToken: t.String(),
    availableProfiles: t.Optional(t.Array(profile)), // https://minecraft.wiki/w/Yggdrasil#:~:text=If%20a%20user%20attempts%20to%20log%20into%20a%20valid%20Mojang%20account%20with%20no%20attached%20Minecraft%20license%2C%20the%20authentication%20will%20be%20successful%2C%20but%20the%20response%20will%20not%20contain%20a%20selectedProfile%20field%2C%20and%20the%20availableProfiles%20array%20will%20be%20empty.
    selectedProfile: t.Optional(profile)
})

type AuthenticateResponse = typeof authenticateResponse.static

export { AuthenticateResponse, authenticateResponse }