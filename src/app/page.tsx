import ThemeSwitch from "@/components/Themes/ThemeSwitch";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={'/auth/login'}>Login</Link>
      <ThemeSwitch />
    </div>
  );
}
