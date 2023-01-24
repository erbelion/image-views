import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import { makeBadge, ValidationError } from 'badge-maker'
import sharp from 'sharp'
import { compactNumber } from '@erbelion/utils'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const format = {
        label: compactNumber(114298042),
        message: 'views',
        labelColor: 'blue',
        color: '#fff',
    }
      
    const svg = makeBadge(format)

    const webp = await sharp(Buffer.from(svg))
        .webp({ lossless:true })
        .toBuffer()

    const webp64 = Buffer.from(webp).toString('base64')

    return {
        statusCode: 200,
        body: webp64,
        isBase64Encoded: true,
        headers: {
            'Content-Type': 'image/webp'
        },
    }
}

export { handler }
