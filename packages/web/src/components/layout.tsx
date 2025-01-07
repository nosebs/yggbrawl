import { Html } from '@elysiajs/html'
export default function Layout({ children }: any) {
    return (
        <html lang="en">
            <head>
                <title>Hello World</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}