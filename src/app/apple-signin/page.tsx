"use client";

import Link from "next/link";

export default function AppleSignInPage() {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif", background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* TOP BAR */}
      <div style={{ padding: "14px 24px", borderBottom: "1px solid #d2d2d7" }}>
        <span style={{ fontSize: "16px", fontWeight: 600, fontStyle: "italic", fontFamily: "Georgia, serif", color: "#1d1d1f" }}>
          Scribbled
        </span>
      </div>

      {/* CENTERED CARD */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div style={{ width: "100%", maxWidth: "460px", padding: "52px 52px 44px", border: "1px solid #d2d2d7", borderRadius: "18px", textAlign: "center", background: "#fff" }}>

          {/* Logo */}
          <div style={{ width: "48px", height: "48px", margin: "0 auto 20px", background: "#1d1d1f", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.3px", marginBottom: "10px" }}>Apple Account</h1>
          <p style={{ fontSize: "16px", color: "#6e6e73", marginBottom: "32px" }}>Manage your Apple Account</p>

          <input type="text" placeholder="Email or Phone Number" style={{ width: "100%", padding: "14px 16px", border: "1px solid #d2d2d7", borderRadius: "12px", fontSize: "16px", color: "#1d1d1f", outline: "none", fontFamily: "inherit", background: "#fff", marginBottom: "20px" }} />

          <svg style={{ display: "block", margin: "0 auto 14px" }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>

          <p style={{ fontSize: "12px", color: "#6e6e73", lineHeight: 1.65, marginBottom: "32px", textAlign: "center" }}>
            Your Apple Account information is used to allow you to sign in securely and access your data. Apple records certain data for security, support, and reporting purposes. If you agree, Apple may also use your Apple Account information to send you marketing emails and communications, including based on your use of Apple services.{" "}
            <a href="#" style={{ color: "#0071e3", textDecoration: "none" }}>See how your data is managed...</a>
          </p>

          {/* Continue button — links to /discover */}
          <Link href="/discover">
            <button style={{ width: "100%", padding: "14px", background: "#0071e3", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
              Continue
            </button>
          </Link>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #d2d2d7", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "#6e6e73" }}>Copyright © 2024 Apple Inc. All rights reserved.</span>
        <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: "#6e6e73" }}>
          {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map((link, i, arr) => (
            <span key={link} style={{ display: "flex", alignItems: "center" }}>
              <a href="#" style={{ color: "#6e6e73", textDecoration: "none", padding: "0 10px" }}>{link}</a>
              {i < arr.length - 1 && <span style={{ color: "#d2d2d7" }}>|</span>}
            </span>
          ))}
        </div>
      </footer>

    </div>
  );
}