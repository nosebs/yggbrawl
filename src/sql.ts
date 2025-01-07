import postgres from 'postgres'

const sql = postgres({
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
    /*hostname: process.env.PGHOST ? process.env.PGPORT : undefined,
    username: process.env.PGUSER ? process.env.PGPORT : undefined,
    password: process.env.PGPASSWORD ? process.env.PGPORT : undefined,
    database: process.env.PGDATABASE ? process.env.PGPORT : undefined,*/
})

export default sql