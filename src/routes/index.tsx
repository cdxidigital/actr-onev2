import { createFileRoute } from "@tanstack/react-router";
import { LandingHome } from "@/components/landing-home";
import { MarketingPage } from "@/components/marketing-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <MarketingPage current="home">
      <LandingHome />
    </MarketingPage>
  );
}
