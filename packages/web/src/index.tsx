import { Elysia } from 'elysia'
import { html, Html } from '@elysiajs/html'
import Layout from './components/layout'

new Elysia()
    .use(html()) 
    .get('/', () => (
        <Layout>
            <h2>Hi</h2>
        </Layout>
    ))
    .listen(4243)