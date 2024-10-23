import Link from "next/link"

export default function loginPage(){
    return(
        <>
            <Link href={'/auth/login'}>Login</Link>
        </>
    )
}