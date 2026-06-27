export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="max-w-3xl text-center px-8">
        <h1 className="text-7xl font-black tracking-tight">
          WAITWHAT
        </h1>

        <p className="mt-8 text-2xl">
          Recover wonder.
          <br />
          One discovery at a time.
        </p>

        <button className="mt-16 rounded-xl bg-black px-8 py-4 text-lg font-bold text-white hover:opacity-90">
          Start Exploring →
        </button>
      </div>
    </main>
  );
}