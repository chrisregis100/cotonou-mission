"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import { LoadingOverlay } from "@/components/game-ui/loading-screen";
import { GameErrorScreen, WebglErrorBoundary } from "@/components/game-ui/webgl-error-boundary";

const GameRuntime = dynamic(() => import("@/game/core/game-runtime").then((module) => module.GameRuntime), {
  ssr: false,
  loading: () => <LoadingOverlay />,
});

export function GameLoader() {
  const webglSupport = useSyncExternalStore(subscribeToNothing, detectWebglSupport, getServerWebglSupport);

  if (webglSupport === "unknown") return <LoadingOverlay />;
  if (webglSupport === "unsupported") return <GameErrorScreen details="WebGL n'est pas disponible dans ce navigateur." />;

  return (
    <WebglErrorBoundary>
      <GameRuntime />
    </WebglErrorBoundary>
  );
}

type WebglSupport = "unknown" | "supported" | "unsupported";

let cachedWebglSupport: WebglSupport | null = null;

function detectWebglSupport(): WebglSupport {
  if (cachedWebglSupport) return cachedWebglSupport;
  const canvas = document.createElement("canvas");
  cachedWebglSupport = canvas.getContext("webgl2") || canvas.getContext("webgl") ? "supported" : "unsupported";
  return cachedWebglSupport;
}

function getServerWebglSupport(): WebglSupport {
  return "unknown";
}

function subscribeToNothing() {
  return () => undefined;
}
