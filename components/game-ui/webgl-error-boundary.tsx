"use client";

import Link from "next/link";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface WebglErrorBoundaryProps {
  children: ReactNode;
}

interface WebglErrorBoundaryState {
  error: Error | null;
}

// React error boundaries can only be written as class components.
export class WebglErrorBoundary extends Component<WebglErrorBoundaryProps, WebglErrorBoundaryState> {
  state: WebglErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): WebglErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur du runtime 3D", error, errorInfo.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return <GameErrorScreen details={this.state.error.message} />;
  }
}

export function GameErrorScreen({ details }: { details?: string }) {
  return (
    <div role="alert" className="flex h-dvh flex-col items-center justify-center gap-4 bg-stone-950 px-6 text-center text-stone-100">
      <h1 className="text-2xl font-bold">Impossible de lancer la scène 3D</h1>
      <p className="max-w-md text-stone-300">
        Votre navigateur ou votre carte graphique ne permet peut-être pas WebGL, ou un fichier n&apos;a pas pu être
        chargé. Essayez de recharger la page ou d&apos;utiliser une version récente de Chrome, Edge, Firefox ou Safari.
      </p>
      {details && <p className="max-w-md font-mono text-xs text-stone-500">{details}</p>}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-stone-950 hover:bg-amber-400"
        >
          Recharger
        </button>
        <Link href="/" className="rounded-full bg-stone-800 px-5 py-2 hover:bg-stone-700">
          Retour au menu
        </Link>
      </div>
    </div>
  );
}
