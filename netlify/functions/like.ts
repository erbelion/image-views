import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import * as dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'

import addScore from './../utils/db/addScore'

import rateLimiter from 'lambda-rate-limiter'

const rateLimit = rateLimiter({
    interval: 1000 * 60 * 60 // 1 hour
}).check

const likeRateLimit = rateLimiter({
    interval: 1000 * 60 * 60 * 24 * 30 // 1 month
}).check

const supabase = createClient(process.env.SUPABASE_DATABASE_URL ?? '', process.env.SUPABASE_SERVICE_API_KEY ?? '')

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    try {
        const token = event.headers['client-ip']

        await rateLimit(100, token)
    } catch (error) {
        return { statusCode: 429 }
    }

    if(!event.queryStringParameters || event.queryStringParameters.id === undefined)
        return { statusCode: 400 }

    event.queryStringParameters.id = event.queryStringParameters.id.toLowerCase()

    try {
        const token = JSON.stringify({
            ip: event.headers['client-ip'],
            pageId: event?.queryStringParameters?.id
        })

        await likeRateLimit(1, token)

        await addScore(supabase, event.queryStringParameters.id, 'likes')
    } catch (error) {}

    return {
        statusCode: 302,
        headers: {
            'Location': process.env.VITE_FULL_APP_URL as string + `/page/?id=${event.queryStringParameters.id}&action=liked`
        },
    }
}

export { handler }
