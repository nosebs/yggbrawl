import { Elysia, t } from "elysia";
import { joinServer } from "./types/request/joinServer";
import { Token } from "../../authserver/src/controllers/token";
import { Profile } from "../../authserver/src/controllers/profile";
import { redisClient } from "./redis";
import { hasJoined } from "./types/request/hasJoined";
import { hasJoinedResponse } from "./types/response/hasJoinedResponse";

new Elysia()
    .onError(({ error, code, set }) => {
        if (code === 'NOT_FOUND') {
            set.status = "Not Found";
        } else {
            console.error(error)
        }
        return ""
    })
    .get("/blockedservers", () => "")
    .post("/session/minecraft/join", async ({ set, body }) => {
        let userId = await Token.getUserIdByToken(body.accessToken)
        if(!userId) throw new Error("Token invalid");
        let profiles = await Profile.getUserProfiles(userId)
        let profile = profiles.find(x => x.id.replaceAll("-", "") === body.selectedProfile)
        if(!profile) throw new Error("Profile not found")
        await redisClient.set(profile.id, body.serverId, { EX: 60 })
        set.status = "No Content"
        return ""
    }, {
        body: joinServer
    })
    .get("/session/minecraft/hasJoined", async ({ query }) => {
        let profile = await Profile.getProfileByUsername(query.username);
        if(!profile) throw new Error("Profile not found")
        let serverId = await redisClient.get(profile.id)
        if(!serverId) throw new Error("Not joined")
        await redisClient.del(serverId);
        return {
            id: profile.id.replaceAll("-", ""),
            name: query.username,
            properties: []
        }
    }, {
        query: hasJoined,
        response: hasJoinedResponse
    })
    .get("/session/minecraft/profile/:id", async ({ query, params }) => {
        let profile = await Profile.getProfileById(params.id);
        if(!profile) throw new Error("Profile not found")
        return {
            id: profile.id.replaceAll("-", ""),
            name: profile.name,
            properties: []
        }
    }, {
        query: t.Object({
            unsigned: t.Optional(t.BooleanString())
        }),
        params: t.Object({
            id: t.String()
        }),
        response: hasJoinedResponse
    })
    .listen(4244)