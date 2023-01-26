import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import * as dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'

import { compactNumber } from '@erbelion/utils'

import { createClient } from '@supabase/supabase-js'

import addScore from './../utils/db/addScore'
import getScore from './../utils/db/getScore'
import makeSvgBadge from './../utils/badges/makeSvgBadge'

import rateLimiter from 'lambda-rate-limiter'

const rateLimit = rateLimiter({
    interval: 1000 * 60 * 60 // 1 hour
}).check

const viewRateLimit = rateLimiter({
    interval: 1000 * 60 * 60 * 24 * 30 // 1 month
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

    let score = 0

    try {
        const token = JSON.stringify({
            ip: event.headers['client-ip'],
            pageId: event?.queryStringParameters.id
        })

        await viewRateLimit(1, token)

        score = await addScore(supabase, event.queryStringParameters.id, 'views')
    } catch (error) {
        score = await getScore(supabase, event.queryStringParameters.id, 'views')
    }

    const icon64 = 'data:image/svg+xml;base64,' + fs.readFileSync('./netlify/assets/eye.svg', {encoding: 'base64'})

    const badge64 = await makeSvgBadge(
        icon64,
        compactNumber(score),
        ['1384C5', '1373c5']
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
