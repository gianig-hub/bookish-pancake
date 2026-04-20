/** Auth route group layout – wraps /login and /register with a centred card shell. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 8,
          padding: "2rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
