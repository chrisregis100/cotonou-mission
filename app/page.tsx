import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-6 py-16">
      <header className="flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="text-sm font-medium tracking-widest text-amber-400 uppercase">Prototype technique</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Cotonou Mission</h1>
        <p className="text-lg text-stone-300">
          Aventure urbaine en 3D inspirée de Cotonou. Cette version est un prototype : décor, personnage et PNJ sont
          provisoires.
        </p>
      </header>

      <Link
        href="/play"
        className="rounded-full bg-amber-500 px-8 py-3 text-lg font-semibold text-stone-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
      >
        Jouer
      </Link>

      <section aria-labelledby="controls-title" className="w-full max-w-md rounded-2xl bg-stone-900 p-6">
        <h2 id="controls-title" className="mb-4 text-lg font-semibold">
          Commandes
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          {CONTROLS.map((control) => (
            <div key={control.action} className="contents">
              <dt className="font-mono text-amber-300">{control.keys}</dt>
              <dd className="text-stone-300">{control.action}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

const CONTROLS = [
  { keys: "ZQSD / WASD / flèches", action: "Se déplacer" },
  { keys: "Maj (Shift)", action: "Courir" },
  { keys: "Souris (après clic)", action: "Tourner la caméra" },
  { keys: "Molette", action: "Zoom" },
  { keys: "E", action: "Interagir" },
  { keys: "Échap", action: "Libérer la souris" },
] as const;
