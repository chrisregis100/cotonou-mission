import { LoadingOverlay } from "@/components/game-ui/loading-screen";

export default function PlayLoading() {
  return (
    <div className="relative h-dvh">
      <LoadingOverlay />
    </div>
  );
}
