import { useState, useEffect } from "react";

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random",
      ).then((res) => res.json());
      const joke = res.data.content;
      setJoke(joke);
    } catch (err) {
      setError("Oops! The joke machine broke. 🔧");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6">
      <main className="relative pt-10 z-10 w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/6 rounded-2xl shadow-xl">
        <header className="flex items-start justify-center ">
          <div className="flex justify-center">
            <h1 className="text-2xl text-center font-extrabold tracking-tight">
              Random Joke Machine
            </h1>
          </div>
        </header>

        <section className="mt-3 flex flex-col items-center">
          <div className="min-h-[120px] flex items-center pb-3 pt-1 px-5">
            <p className="text-lg leading-relaxed text-white/90">
              {loading && (
                <span className="inline-flex items-center gap-3">
                  <svg
                    className="w-5 h-5 animate-spin text-white/90"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              )}

              {joke && !loading && <span>{joke}</span>}

              {error && !loading && (
                <span className="text-amber-300">{error}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 pb-6">
            <button
              onClick={fetchJoke}
              className="inline-flex items-center px-4 py-1  bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-black rounded-md shadow"
            >
              getJoke
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
