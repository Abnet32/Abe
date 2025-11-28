import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { loginUser } from "../api/Auth.ts"; // Import from your API file

interface LoginProps {
  onLogin: (token: string, role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("admin@abe-garage.com"); // default for demo
  const [password, setPassword] = useState("password123"); // default for demo
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password }); // call API
      onLogin(data.token, data.role); // pass token & role to parent
      setLoading(false);
    } catch (err: unknown) {
      // Handle errors from backend
      if (typeof err === "object" && err !== null && "response" in err) {
        const anyErr = err as any;
        setError(anyErr.response?.data?.message || "Server error");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err) || "Server error");
      }
      setLoading(false);
    }
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
              type="email"
              placeholder="admin@abe-garage.com"
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
