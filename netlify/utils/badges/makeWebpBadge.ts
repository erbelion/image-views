import badgenPkg from 'badgen-one-color'
const { badgen } = badgenPkg
import { applyGradient } from 'gradient-badge'
import sharp from 'sharp'

export default async function(icon64: string, status: string, gradient: string[]): Promise<string> {
    const svg = applyGradient(badgen({
        label: '',
        status: status,
        color: '1384C5',
        icon: icon64,
        scale: 1
    }), gradient) //1322C5

    const webp = await sharp(Buffer.from(svg))
    .webp({ lossless:true })
    .toBuffer()

    return Buffer.from(webp).toString('base64')
}