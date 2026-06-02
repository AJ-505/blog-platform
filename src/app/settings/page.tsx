"use client";

// ============================================================
// FILE: app/settings/page.tsx
// PAGE: Settings Page
// Sections: Account, Membership, Notifications, Appearance,
//           Data & Privacy, Support & About, Danger Zone
// ============================================================

import { useState } from "react";

export default function SettingsPage() {

  // ── STATE ──────────────────────────────────────────────────
  // Controls the notification toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  // Controls which appearance theme is selected
  const [theme, setTheme] = useState("light");

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>


      {/* ============================================================
          SECTION 1: NAVBAR
          Scribbled logo top left
          ============================================================ */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 40px", height: "56px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1f", fontFamily: "Georgia, serif" }}>
          Scribbled
        </span>
      </nav>
      {/* END NAVBAR */}


      {/* ── PAGE WRAPPER ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 24px" }}>


        {/* ============================================================
            SECTION 2: ACCOUNT MANAGEMENT
            User profile, email, phone, password, 2FA
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>
          Account Management
        </h2>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "32px" }}>

          {/* User profile row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
            {/* Avatar placeholder — 👉 replace with <img src="/avatar.jpg" /> */}
            <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#d1d5db", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a1f" }}>Julian Aris</p>
              <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>Member since October 2022</p>
            </div>
          </div>

          {/* Email and Phone fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div>
              <label style={{ fontSize: "11px", color: "#6b7280", display: "block", marginBottom: "6px" }}>Email Address</label>
              <input
                type="email"
                defaultValue="julian.aris@example.com"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", color: "#1a1a1f", outline: "none", fontFamily: "inherit" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "11px", color: "#6b7280", display: "block", marginBottom: "6px" }}>Phone Number</label>
              <input
                type="text"
                defaultValue="+1 (555) 012-3456"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", color: "#1a1a1f", outline: "none", fontFamily: "inherit" }}
              />
            </div>
          </div>

          {/* Security section */}
          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "20px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>Security</p>

            {/* Password row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#1a1a1f" }}>Password</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Last changed 4 months ago</p>
              </div>
              <button style={{ padding: "7px 18px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", color: "#1a1a1f" }}>
                Update
              </button>
            </div>

            {/* 2FA row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#1a1a1f" }}>Two-Factor Authentication</p>
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Secured via Authenticator App</p>
              </div>
              <button style={{ padding: "7px 18px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", color: "#1a1a1f" }}>
                Manage
              </button>
            </div>
          </div>

        </div>
        {/* END ACCOUNT MANAGEMENT */}


        {/* ============================================================
            SECTION 3: MEMBERSHIP
            Current plan card + payment methods
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>
          Membership
        </h2>

        {/* Dark plan card */}
        <div style={{ background: "#0f1f2e", borderRadius: "12px", padding: "24px 28px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "10px", color: "#4ecca3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Current Plan</p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Premium Annual</p>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>Renews on Oct 12, 2024 for $120.00/year</p>
          </div>
          <button style={{ background: "#4ecca3", color: "#0f1f2e", border: "none", padding: "10px 20px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            Upgrade to Pro
          </button>
        </div>

        {/* Payment methods */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px 24px", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1f", marginBottom: "14px" }}>Payment Methods</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Card icon */}
              <div style={{ width: "36px", height: "24px", background: "#e5e7eb", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#6b7280" }}>💳</div>
              <div>
                <p style={{ fontSize: "13px", color: "#1a1a1f" }}>Visa ending in 4421</p>
                <p style={{ fontSize: "11px", color: "#9ca3af" }}>Expires 09/2026</p>
              </div>
            </div>
            <a href="#" style={{ fontSize: "13px", color: "#4ecca3", textDecoration: "none", fontWeight: 500 }}>Edit</a>
          </div>
        </div>
        {/* END MEMBERSHIP */}


        {/* ============================================================
            SECTION 4: NOTIFICATIONS
            Toggle switches for email and push notifications
            Clicking the toggle flips it on/off using useState
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>
          Notifications
        </h2>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "32px", overflow: "hidden" }}>

          {/* Email newsletters toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #f3f4f6" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1f" }}>Email Newsletters</p>
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Daily briefings and weekend long-reads.</p>
            </div>
            {/* Toggle — green when on, grey when off */}
            <div
              onClick={() => setEmailNotif(!emailNotif)}
              style={{ width: "44px", height: "24px", borderRadius: "12px", background: emailNotif ? "#4ecca3" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
            >
              <div style={{ position: "absolute", top: "3px", left: emailNotif ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </div>

          {/* Push notifications toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1f" }}>Browser Push Notifications</p>
              <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Breaking news and major investigation alerts.</p>
            </div>
            <div
              onClick={() => setPushNotif(!pushNotif)}
              style={{ width: "44px", height: "24px", borderRadius: "12px", background: pushNotif ? "#4ecca3" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
            >
              <div style={{ position: "absolute", top: "3px", left: pushNotif ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </div>

        </div>
        {/* END NOTIFICATIONS */}


        {/* ============================================================
            SECTION 5: APPEARANCE
            Light / Dark / System theme selector + font size
            Clicking a theme card sets it as active
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>
          Appearance
        </h2>

        {/* Theme cards */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          {[
            { id: "light", label: "Light Mode", bg: "#fff", cardBg: "#f9fafb" },
            { id: "dark", label: "Dark Mode", bg: "#1f2937", cardBg: "#374151" },
            { id: "system", label: "System", bg: "#e5e7eb", cardBg: "#d1d5db" },
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                width: "100px", height: "80px", borderRadius: "10px",
                background: t.bg, border: theme === t.id ? "2px solid #4ecca3" : "2px solid #e5e7eb",
                cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "flex-end", paddingBottom: "8px",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Mini preview lines inside the card */}
              <div style={{ position: "absolute", top: "12px", left: "10px", right: "10px" }}>
                <div style={{ height: "6px", borderRadius: "3px", background: t.cardBg, marginBottom: "4px" }} />
                <div style={{ height: "6px", borderRadius: "3px", background: t.cardBg, width: "70%" }} />
              </div>
              <p style={{ fontSize: "11px", color: theme === t.id ? "#4ecca3" : "#6b7280", fontWeight: theme === t.id ? 600 : 400 }}>
                {t.label}
              </p>
            </div>
          ))}
        </div>

        {/* Font size row */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "#1a1a1f" }}>Reading Font Size</p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#4ecca3" }}>18px</p>
        </div>
        {/* END APPEARANCE */}


        {/* ============================================================
            SECTION 6: DATA & PRIVACY
            Download data + Ad preferences buttons
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>
          Data & Privacy
        </h2>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "32px" }}>
          <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, marginBottom: "20px" }}>
            Your data is yours. We believe in total transparency regarding how your information is used to curate your reading experience.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button style={{ padding: "10px 18px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", color: "#1a1a1f", display: "flex", alignItems: "center", gap: "6px" }}>
              ↓ Download Personal Data
            </button>
            <button style={{ padding: "10px 18px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", color: "#1a1a1f", display: "flex", alignItems: "center", gap: "6px" }}>
              ✦ Ad Preferences
            </button>
          </div>
        </div>
        {/* END DATA & PRIVACY */}


        {/* ============================================================
            SECTION 7: SUPPORT & ABOUT
            List of links with chevron arrows
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1a1a1f", marginBottom: "16px" }}>
          Support & About
        </h2>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", marginBottom: "32px" }}>
          {[
            { label: "Help Center", value: null },
            { label: "Privacy Policy", value: null },
            { label: "Terms of Service", value: null },
            { label: "Version Info", value: "2.4.12-Stable" },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none", cursor: "pointer" }}>
              <p style={{ fontSize: "13px", color: "#1a1a1f" }}>{item.label}</p>
              {item.value
                ? <p style={{ fontSize: "13px", color: "#9ca3af" }}>{item.value}</p>
                : <span style={{ color: "#9ca3af", fontSize: "16px" }}>›</span>
              }
            </div>
          ))}
        </div>
        {/* END SUPPORT & ABOUT */}


        {/* ============================================================
            SECTION 8: DANGER ZONE
            Delete account — red warning section
            ============================================================ */}
        <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#dc2626", marginBottom: "16px" }}>
          Danger Zone
        </h2>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #fee2e2", padding: "24px", marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#dc2626", marginBottom: "4px" }}>Delete Account</p>
              <p style={{ fontSize: "12px", color: "#6b7280", maxWidth: "400px", lineHeight: 1.5 }}>
                This action is permanent. All your saved articles, reading history, and membership data will be erased.
              </p>
            </div>
            <button style={{ background: "#dc2626", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              Delete Forever
            </button>
          </div>
        </div>
        {/* END DANGER ZONE */}


      </div>
      {/* END PAGE WRAPPER */}


      {/* ============================================================
          SECTION 9: FOOTER
          Logo + copyright + links
          ============================================================ */}
      <footer style={{ background: "#1a1a1f", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif", marginBottom: "4px" }}>Scribbled</p>
          <p style={{ fontSize: "11px", color: "#6b7280" }}>© 2024 The Review. All rights reserved. Editorial excellence in every word.</p>
        </div>
        <div style={{ display: "flex", gap: "24px", fontSize: "12px", color: "#9ca3af" }}>
          {["Terms of Service", "Privacy Policy", "Accessibility", "Contact Us", "Archive"].map((link) => (
            <a key={link} href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>{link}</a>
          ))}
        </div>
      </footer>
      {/* END FOOTER */}


    </div>
  );
}