type UserProfileProps = {
  user: {
    username?: string;
    email?: string;
    role?: string;
  } | null;
  onLogout: () => void;
};

export default function UserProfile({ user, onLogout }: UserProfileProps) {
  if (!user || typeof user !== "object") {
    return null;
  }

  const username = user.username;
  const email = user.email;
  const role = user.role;

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="w-full max-w-sm bg-[#0e0e0e] border border-[#333] rounded-none p-6 font-mono shadow-2xl shadow-black/30">
      <div className="mb-6">
        <h1 className="text-lg font-bold tracking-tight text-white">
          User Profile
        </h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">Your account details.</p>
      </div>

      <div className="space-y-4">
        <div className="border-b border-[#333] pb-3">
          <p className="text-xs uppercase tracking-widest text-[#999] mb-2">
            Username
          </p>
          <p className="text-white font-semibold">{username}</p>
        </div>

        <div className="border-b border-[#333] pb-3">
          <p className="text-xs uppercase tracking-widest text-[#999] mb-2">
            Email
          </p>
          <p className="text-white font-semibold">{email}</p>
        </div>

        <div className="pb-3">
          <p className="text-xs uppercase tracking-widest text-[#999] mb-2">
            Account Role
          </p>
          <p className="text-[#F6723F] font-semibold uppercase tracking-wide">
            {role}
          </p>
        </div>
      </div>

      <div className="space-y-2 border-t border-[#333] mt-6 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-[#777]">Session Status</span>
          <span className="text-green-500 font-semibold">Active</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#777]">Auth Method</span>
          <span className="text-white">Password</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 text-sm font-bold tracking-wide text-white transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
