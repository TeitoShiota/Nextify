import TestComp from "@/components/TestComp";
import ThemeSwitch from "@/components/Themes/ThemeSwitch";

export default function Home() {
  return (
    <div>
      <ThemeSwitch />
      <TestComp/>
    </div>
  );
}
