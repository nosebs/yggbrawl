import { Elysia } from "elysia";
import { Exception, NOT_FOUND_MESSAGE } from "./types/exception";
import { authenticate } from "./types/request/authenticate";
import { authenticateResponse } from "./types/response/authenticateresponse";
import sql from "./sql";
import { ForbiddenOperationException, INVALID_USERNAME_PASSWORD } from "./exceptions/forbiddenOperationException";
import { refresh } from "./types/request/refresh";
import { refreshResponse } from "./types/response/refreshresponse";
import { validate } from "./types/request/validate";
import { signout } from "./types/request/signout";
import { User as UserC } from "./controllers/user";
import { Profile as ProfileC } from "./controllers/profile";
import { Token } from "./controllers/token";
import { UserProperty } from "./controllers/userProperty";

new Elysia()
  .onError(({ error, code, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = "Not Found";
      return {
        error: "Not Found",
        errorMessage: NOT_FOUND_MESSAGE
      } as Exception
    }
    if(error instanceof ForbiddenOperationException) {
      set.status = "Forbidden"
      return {
        error: error.name,
        errorMessage: error.errorMessage
      } as Exception
    }
    console.error(error)
  })
  .post("/authenticate", async ({ body }) => {
    let user = await UserC.getByEmail(body.username);
    if(!user || !(await Bun.password.verify(body.password, user.password))) throw new ForbiddenOperationException(INVALID_USERNAME_PASSWORD)
    
    let profiles = await ProfileC.getUserProfiles(user.id);

    return {
      user: {
        id: user.id,
        username: user.email,
        properties: await UserProperty.getByUserId(user.id)
      },
      clientToken: body.clientToken,
      accessToken: await Token.create(user.id),
      availableProfiles: profiles,
      selectedProfile: profiles[0]
    }
  }, {
    body: authenticate,
    response: authenticateResponse
  })
  .post("/validate", async ({ body, set }) => {
    let userId = await Token.getUserIdByToken(body.accessToken)
    if(!userId) throw new ForbiddenOperationException("Invalid token")
    set.status = "No Content"
    return ""
  }, {
    body: validate
  })
  .post("/refresh", async ({ body }) => {
    let userId = await Token.getUserIdByToken(body.accessToken)
    if(!userId) throw new ForbiddenOperationException("")
    
    await Token.delete(body.accessToken)

    let user = await UserC.getById(userId)
    return {
      accessToken: await Token.create(userId),
      clientToken: body.clientToken,
      selectedProfile: (await ProfileC.getUserProfiles(userId))[0],
      ...(body.requestUser && {
        user: {
          id: user.id,
          username: user.email,
          properties: await UserProperty.getByUserId(user.id)
        }
      })
    }
  }, {
    body: refresh,
    response: refreshResponse
  })
  .post("/signout", async ({ body, set }) => {
    let user = (await sql`SELECT * FROM users WHERE email = ${body.username}`)[0]
    if(!user || !(await Bun.password.verify(body.password, user.password))) throw new ForbiddenOperationException(INVALID_USERNAME_PASSWORD)
    
    await Token.deleteTokensByUserId(user.id)

    set.status = "No Content"
    return ""
  }, {
    body: signout
  })
  .post("/invalidate", async ({ body, set }) => {
    let token = await Token.getUserIdByToken(body.accessToken)
    if(!token) throw new ForbiddenOperationException("")
    
    await Token.delete(body.accessToken)

    set.status = "No Content"
    return ""
  }, {
    body: validate
  })
  .listen(4242);