import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import * as dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'

import { compactNumber } from '@erbelion/utils'

import { createClient } from '@supabase/supabase-js'

import getScore from './../utils/db/getScore'
import makeSvgBadge from './../utils/badges/makeSvgBadge'

import rateLimiter from 'lambda-rate-limiter'

const rateLimit = rateLimiter({
    interval: 1000 * 60 * 60 // 1 hour
}).check

const supabase = createClient(process.env.SUPABASE_DATABASE_URL ?? '', process.env.SUPABASE_SERVICE_API_KEY ?? '')

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    try {
        const token = event.headers['client-ip']

        await rateLimit(100, token)
    } catch (error) {
        return {
            statusCode: 302,
            headers: {
                'Location': process.env.VITE_FULL_APP_URL as string + `/too-many-requests.svg`
            }
        }
    }

    if(!event.queryStringParameters || event.queryStringParameters.id === undefined)
        return { statusCode: 400 }

    event.queryStringParameters.id = event.queryStringParameters.id.toLowerCase()

    const score = await getScore(supabase, event.queryStringParameters.id, 'likes')

    const icon64 = 'data:image/svg+xml;base64,' + fs.readFileSync('./netlify/assets/heart.svg', {encoding: 'base64'})

    const badge64 = await makeSvgBadge(
        icon64,
        compactNumber(score),
        ['C513AC', 'C5136B']
    )

    return {
        statusCode: 200,
        body: badge64,
        isBase64Encoded: true,
        headers: {
            'Content-Type': 'image/svg+xml'
        },
    }
}

export { handler }
