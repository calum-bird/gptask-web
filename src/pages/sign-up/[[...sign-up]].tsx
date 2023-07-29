import Hero from "@/components/hero";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Hero>
      <SignUp redirectUrl={"/dashboard"} />
    </Hero>
  );
}
