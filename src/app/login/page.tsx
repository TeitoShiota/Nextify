import Link from "next/link"
import ThemedImage from "@/components/Themes/ThemedImaged"

// LOGOS
import LogoLight from '@/assets/logo/music-logo-solid.png';
import LogoDark from '@/assets/logo/music-logo-dark.png'; 


// STYLES
import './style.scss'


export default function loginPage(){
    return(
        <main className="login-page__main">
            <ThemedImage
                className='login-page__main__logo'
                src_light={ LogoLight }
                src_dark={ LogoDark }
                alt=""
            />
            <h1 
                className="login-page__main__heading"
            >
                Nextify
            </h1>
            <Link
                className="login-page__main__login-link"
                href={'/auth/login'}
            >
                <span>
                Log In
                </span>
            </Link>
        </main>
    )
}