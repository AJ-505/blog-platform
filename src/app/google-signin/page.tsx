"use client";
// ============================================================
// FILE: app/google-signin/page.tsx
// PAGE: Google Sign In — exact Google layout with Scribbled top bar
// ============================================================

export default function GoogleSignInPage() {
  return (
    <div style={{
      fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
      background: "#fff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ============================================================
          SECTION 1: TOP BAR
          Scribbled branding at the top left
          ============================================================ */}
      <div style={{ padding: "14px 24px", borderBottom: "1px solid #e0e0e0" }}>
        <span style={{
          fontSize: "16px", fontWeight: 600, fontStyle: "italic",
          fontFamily: "Georgia, serif", color: "#1d1d1f",
        }}>
          Scribbled
        </span>
      </div>

      {/* ============================================================
          SECTION 2: PAGE BODY
          Centers the card on the page
          ============================================================ */}
      <div style={{
        flex: 1, display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "40px 20px",
      }}>

        {/* ── THE CARD ── */}
        <div style={{
          width: "100%", maxWidth: "450px",
          padding: "48px 40px 36px",
          border: "1px solid #dadce0",
          borderRadius: "8px",
          textAlign: "center",
          background: "#fff",
        }}>

          {/* Google logo using colored letters
              👉 Replace with <img src="/google-logo.png" /> if you have it */}
          <div style={{ marginBottom: "16px", fontSize: "28px", letterSpacing: "-1px", fontWeight: 400 }}>
            <span style={{ color: "#4285F4" }}>G</span>
            <span style={{ color: "#EA4335" }}>o</span>
            <span style={{ color: "#FBBC05" }}>o</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#34A853" }}>l</span>
            <span style={{ color: "#EA4335" }}>e</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "24px", fontWeight: 400,
            color: "#202124", marginBottom: "8px",
          }}>
            Sign in
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "16px", color: "#202124", marginBottom: "28px" }}>
            Use your Google Account
          </p>

          {/* Email input */}
          <input
            type="text"
            placeholder="Email or phone"
            style={{
              width: "100%", padding: "13px 15px",
              border: "1px solid #dadce0", borderRadius: "4px",
              fontSize: "16px", color: "#202124",
              outline: "none", fontFamily: "inherit",
              background: "#fff", marginBottom: "8px",
            }}
          />

          {/* Forgot email link */}
          <div style={{ textAlign: "left", marginBottom: "28px" }}>
            <a href="#" style={{ fontSize: "14px", color: "#1a73e8", textDecoration: "none" }}>
              Forgot email?
            </a>
          </div>

          {/* Guest mode notice */}
          <p style={{
            fontSize: "14px", color: "#202124",
            lineHeight: 1.6, marginBottom: "32px",
            textAlign: "left",
          }}>
            Not your computer? Use a private browsing window to sign in.{" "}
            <a href="#" style={{ color: "#1a73e8", textDecoration: "none" }}>
              Learn more about using Guest mode
            </a>
          </p>

          {/* Buttons row — Create account left, Next right */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            {/* Create account button */}
            <a href="#" style={{
              fontSize: "14px", fontWeight: 500,
              color: "#1a73e8", textDecoration: "none",
              padding: "10px 8px",
            }}>
              Create account
            </a>

            {/* Next button */}
            <button style={{
              background: "#1a73e8", color: "#fff",
              border: "none", borderRadius: "4px",
              padding: "10px 24px", fontSize: "14px",
              fontWeight: 500, cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Next
            </button>

          </div>

        </div>
      </div>

      {/* ============================================================
          SECTION 3: FOOTER
          Language selector left, links right — exactly like Google's page
          ============================================================ */}
      <footer style={{
        padding: "16px 24px",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "8px",
      }}>

        {/* Left: language selector */}
        <select style={{
          fontSize: "12px", color: "#202124",
          border: "none", background: "transparent",
          cursor: "pointer", fontFamily: "inherit",
          outline: "none",
        }}>
          <option>English (United States)</option>
        </select>

        {/* Right: links */}
        <div style={{ display: "flex", gap: "24px", fontSize: "12px", color: "#202124" }}>
          {["Help", "Privacy", "Terms"].map((link) => (
            <a key={link} href="#" style={{ color: "#202124", textDecoration: "none" }}>
              {link}
            </a>
          ))}
        </div>

      </footer>

    </div>
  );
}