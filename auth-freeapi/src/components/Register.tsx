import { useState } from "react";

type RegisterCardProps = {
  onLogin: () => void;
  onRegister: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  error: string | null;
};

export default function RegisterCard({
  onLogin,
  onRegister,
  error,
}: RegisterCardProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <div className="auth-card w-full max-w-sm bg-[#0e0e0e] border border-[#333] rounded-none p-6 font-mono shadow-2xl shadow-black/30">
      <div className="mb-6">
        <h1 className="text-lg font-bold tracking-tight text-white">
          Register
        </h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">Create your Chai account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-widest text-[#999]">
            Name
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-3 py-2.5 rounded-none placeholder:text-[#444] focus:outline-none focus:border-[#F6723F] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-widest text-[#999]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-3 py-2.5 rounded-none placeholder:text-[#444] focus:outline-none focus:border-[#F6723F] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-widest text-[#999]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#1a1a1a] border border-[#333] text-white text-sm px-3 py-2.5 pr-14 rounded-none placeholder:text-[#444] focus:outline-none focus:border-[#F6723F] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#666] transition-colors hover:text-[#aaa]"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 border border-red-900 bg-red-950/30 px-3 py-2">
            {error}
          </p>
        )}

        <div className="space-y-2 border-t border-[#333] pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#777]">Account Type</span>
            <span className="text-white">Standard</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#777]">Verification</span>
            <span className="text-white">Email</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            className="w-full bg-[#F6723F] py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#e05e2d]"
          >
            Create Account
          </button>
          <p className="text-center text-xs text-[#666]">
            Your session starts after email verification.
          </p>
        </div>
      </form>

      <div className="auth-footer mt-6 border-t border-[#333] pt-4 text-center">
        <span className="text-xs text-[#666]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="text-[#F6723F] hover:underline"
          >
            Login
          </button>
        </span>
      </div>
    </div>
  );
}
