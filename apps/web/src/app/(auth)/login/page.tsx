import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>Sign in</h1>

      {/* TODO: Replace with a real form + server action / API call */}
      <form action="#" method="POST">
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.co.uk"
            style={{ width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid #d1d5db" }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            style={{ width: "100%", padding: "0.5rem", borderRadius: 4, border: "1px solid #d1d5db" }}
          />
        </div>

        {/* TODO: wire to POST /api/auth/login */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.6rem",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center", fontSize: 14 }}>
        Don&apos;t have an account?{" "}
        <Link href="/register">Register</Link>
      </p>
    </>
  );
}
