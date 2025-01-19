import { db } from "../database";
import { profile, user } from "../database/schema";

const _user = (await db.insert(user)
    .values({
        email: "n1sebs@proton.me",
        password: await Bun.password.hash("obedkekov"),  
    })
    .returning()
)[0]
console.log(_user)
const _profile = (
    await db.insert(profile)
        .values({
            name: "nosebs",
            userId: _user.id
        })
)[0]
console.log(_profile)