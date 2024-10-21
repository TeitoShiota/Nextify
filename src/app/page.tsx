import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={'/auth/login'}>Login</Link>
<a href="/api/auth/login">Login with Spotify</a>
    </div>
  );
}
