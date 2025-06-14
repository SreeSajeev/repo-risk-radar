
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0E0E10] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-[#1A1A1C]/80 border border-[#00FFD1]/20 rounded-xl shadow-2xl shadow-blue-800/10 p-8 md:p-14 glassmorphism backdrop-blur-lg max-w-sm w-full space-y-7">
          <div>
            <h2 className="text-2xl font-semibold mb-1 text-[#EAEAEA]">Log in</h2>
            <p className="text-[#A2A2A2] text-sm mb-1">
              Log in to analyze your repositories and get personalized churn insights.
            </p>
          </div>
          {/* Email/password fields */}
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="rounded px-4 py-2 bg-[#181B22]/75 border border-[#8892B0]/40 text-[#F2F2F2] placeholder-[#A2A2A2] focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded px-4 py-2 bg-[#181B22]/75 border border-[#8892B0]/40 text-[#F2F2F2] placeholder-[#A2A2A2] focus:outline-none focus:ring-2 focus:ring-[#00FFD1]"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#EAEAEA] to-[#A2A2A2] text-[#000000] font-bold py-2 rounded shadow hover:scale-105 transition-all duration-300"
            >
              Log In
            </button>
            <button
              type="button"
              className="w-full border border-[#00FFD1] text-white font-bold py-2 rounded hover:bg-[#00FFD1]/10 transition-all"
            >
              Start without login
            </button>
            <button
              type="button"
              className="w-full bg-[#181B22]/70 border border-[#A2A2A2]/40 text-[#A2A2A2] font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-[#A2A2A2]/10"
            >
              <svg width="18" height="18" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.6C34.7 33.2 29.9 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.4 1 7.4 2.6l6.4-6.3C34.5 5.7 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.1 0 19.3-7.6 20-20a17.1 17.1 0 0 0-.5-4z"></path><path fill="#34A853" d="M6.3 14.6 13.9 19.7C15.7 16.1 19.5 13 24 13c2.8 0 5.3 1.1 7.2 2.8l6.5-6.5A19.888 19.888 0 0 0 24 4c-6.1 0-11.5 2.4-15.3 6.3z"></path><path fill="#FBBC05" d="M24 44c5.4 0 10.2-1.8 14-5l-6.5-5.3c-2 1.6-4.5 2.5-7.5 2.5-5.8 0-10.5-3.9-12.2-9.1L6.3 33.5C10.2 39.6 16.6 44 24 44z"></path><path fill="#EA4335" d="m44.5 20-.1-.1H24v8.5h11.6c-.6 2.7-2.2 5-4.7 6.6l.1.1 6.4 6.3c1.8-1.7 3.3-4 4.1-6.6.6-1.7 1-3.5 1-5.5 0-1.3-.1-2.6-.3-3.8z"></path></g></svg>
              <span>Sign in with GitHub</span>
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
