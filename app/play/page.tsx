import type { Metadata } from "next";

import { GameLoader } from "@/components/game-ui/game-loader";

export const metadata: Metadata = {
  title: "Jouer · Cotonou Mission",
};

export default function PlayPage() {
  return (
    <main className="flex-1">
      <h1 className="sr-only">Cotonou Mission — prototype jouable</h1>
      <GameLoader />
    </main>
  );
}
