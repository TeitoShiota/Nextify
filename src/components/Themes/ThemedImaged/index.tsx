import Image, { StaticImageData } from 'next/image'
import { useTheme } from 'next-themes'

export default function ThemedImage(
    { 
        src_light,
        src_dark,
        alt 
    } : {
        src_light: StaticImageData | string ,
        src_dark: StaticImageData | string,
        alt : string,

    }) {
    const { resolvedTheme } = useTheme()
    let src

    switch (resolvedTheme) {
        case 'light':
        src = src_light
        break
        case 'dark':
        src = src_dark
        break
        default:
        src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        break
    }

    return (
        <Image
            src={ src }
            width={400}
            height={400}
            alt={ alt }
        />
    )
}

