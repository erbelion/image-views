import badgenPkg from 'badgen-one-color'
const { badgen } = badgenPkg
import { applyGradient } from 'gradient-badge'

export default async function(icon64: string, status: string, gradient: string[]): Promise<string> {
    const svg = applyGradient(badgen({
        label: '',
        status: status,
        color: '1384C5',
        icon: icon64,
        scale: 1
    }), gradient) //1322C5

    return Buffer.from(svg).toString('base64')
}