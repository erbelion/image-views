import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import { makeBadge, ValidationError } from 'badge-maker'
import sharp from 'sharp'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const format = {
        label: 'build',
        message: 'passed',
        color: 'green',
    }
      
    const svg = makeBadge(format)
    const svg64 = Buffer.from(svg).toString('base64')

    return {
        statusCode: 200,
        body: svg64,
        isBase64Encoded: true,
        headers: {
            'Content-Type': 'image/svg'
        },
    }
}

export { handler }
