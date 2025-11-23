import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // Pre-filled for demo convenience
  const [email, setEmail] = useState("admin@autorex.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulated API call/Validation
    setTimeout(() => {
      // Accept generic admin login or a bypass
      if (
        (email === "admin@autorex.com" && password === "admin") ||
        (email === "demo" && password === "demo")
      ) {
        setLoading(false);
        onLogin();
      } else {
        setError("Invalid email or password. Try (admin@autorex.com / admin)");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <section className="py-20 bg-white min-h-[600px] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-blue font-heading mb-4 relative inline-block">
            Login to your account
            <div className="absolute -right-12 top-1/2 h-[2px] w-8 bg-brand-red hidden md:block"></div>
            <div className="absolute -left-12 top-1/2 h-[2px] w-8 bg-brand-red hidden md:block"></div>
          </h2>
          <p className="text-gray-400 text-xs">
            Staff and Administrator Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100"
        >
          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Email Address
            </label>
            <input
              type="text"
              placeholder="admin@autorex.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-200 text-sm focus:outline-none focus:border-brand-red transition-colors rounded bg-white text-gray-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-200 text-sm focus:outline-none focus:border-brand-red transition-colors rounded bg-white text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-red text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-red-700 transition-colors uppercase rounded disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Forgot your password?{" "}
              <a href="#" className="text-brand-red underline">
                Reset here
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
