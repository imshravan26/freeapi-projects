import "./App.css";
import { useEffect, useState } from "react";
import LoginCard from "./components/Login";
import RegisterCard from "./components/Register";
import UserProfile from "./components/UserProfile";
import useAuth from "./hooks/useAuth";

type AuthMode = "login" | "register";

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const { getCurrentUser, user, loading, Login, Register, Logout, error } =
    useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-10 md:grid-cols-[1fr_420px] md:px-8 lg:px-10">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em]">
            Chai Auth by{" "}
            <a
              href="https://github.com/imshravan26"
              className="text-[#F6723F] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              imshravan26
            </a>
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Auth with FreeAPI
            </h1>
            <p className="max-w-xl text-sm leading-7 text-[#a1a1aa] md:text-base">
              Sign in to manage secure sessions, password auth, and account
              access from a focused dashboard.
            </p>
          </div>
          <div className="grid max-w-lg grid-cols-2 border border-[#2f2f2f] text-sm">
            <div className="border-r border-[#2f2f2f] p-4">
              <p className="text-[#666]">Provider</p>
              <p className="mt-1 font-bold text-white">FreeAPI</p>
            </div>
            <div className="p-4">
              <p className="text-[#666]">Session</p>
              <p className="mt-1 font-bold text-white">Persistent</p>
            </div>
          </div>
        </div>

        <div className="auth-frame w-full justify-self-center md:justify-self-end">
          {loading ? (
            <p className="text-sm text-[#666] font-mono">Initializing...</p>
          ) : user ? (
            <UserProfile user={user} onLogout={Logout} />
          ) : (
            <div key={authMode} className="auth-panel">
              {authMode === "login" ? (
                <LoginCard
                  onLogin={Login}
                  error={error}
                  onRegister={() => setAuthMode("register")}
                />
              ) : (
                <RegisterCard
                  onRegister={Register}
                  error={error}
                  onLogin={() => setAuthMode("login")}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
