import Hero from "@/components/hero";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Hero>
      <SignIn />
    </Hero>
  );
}
