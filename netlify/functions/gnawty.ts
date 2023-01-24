import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import fs from 'fs'
import path from 'path'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // const { lang } = event.queryStringParameters;

    let img = fs.readFileSync(path.resolve(__dirname, './../assets/walkin.webp'), {encoding: 'base64'})

    return {
        statusCode: 200,
        body: img,
        isBase64Encoded: true,
        headers: {
            'Content-Type': 'image/webp'
        },
    }
}

export { handler }

