import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import * as dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'

import { compactNumber } from '@erbelion/utils'

import { createClient } from '@supabase/supabase-js'

import getScore from '../../utils/db/getScore'
import makeWebpBadge from '../../utils/badges/makeWebpBadge'

const supabase = createClient(process.env.SUPABASE_DATABASE_URL ?? '', process.env.SUPABASE_SERVICE_API_KEY ?? '')

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if(!event.queryStringParameters || event.queryStringParameters.id === undefined) {
        return {
            statusCode: 400,
            body: 'Bad Request',
        }
    }

    const score = await getScore(supabase, event.queryStringParameters.id, 'likes')

    const icon64 = 'data:image/png;base64,' + fs.readFileSync('./netlify/assets/heart-white.png', {encoding: 'base64'})

    const badge64 = await makeWebpBadge(
        icon64,
        compactNumber(score),
        ['C513AC', 'C5136B']
    )

    return {
        statusCode: 200,
        body: badge64,
        isBase64Encoded: true,
        headers: {
            'Content-Type': 'image/webp'
        },
    }
}

export { handler }
