"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { clearUser, saveUser, type AuthUser } from "@/lib/auth";

function initialsOf(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-2xl font-semibold text-primary">{children}</h2>
  );
}

const cardClass =
  "rounded-3xl bg-white/80 backdrop-blur border border-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.12)] p-6 md:p-8";

export function SettingsView({
  user,
  memberSince,
}: {
  user: AuthUser;
  memberSince: string;
}) {
  const router = useRouter();

  const memberSinceLabel = useMemo(
    () =>
      new Date(memberSince).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      }),
    [memberSince],
  );

  // ── Profile (name + email) ──────────────────────────────────
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profileMsg, setProfileMsg] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const profileDirty = name.trim() !== user.name || email.trim() !== user.email;

  async function saveProfile() {
    if (savingProfile || !profileDirty) return;
    setSavingProfile(true);
    setProfileMsg(null);

    const res = await fetch("/api/user/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        name: name.trim(),
        email: email.trim(),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSavingProfile(false);

    if (!res.ok) {
      setProfileMsg({ type: "error", text: data?.error ?? "Could not save." });
      return;
    }

    // Keep the locally cached user in sync with what we just saved.
    saveUser({ username: user.username, name: name.trim(), email: email.trim() });
    setProfileMsg({ type: "ok", text: "Profile updated." });
    router.refresh();
  }

  // ── Password ────────────────────────────────────────────────
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);

  function resetPasswordForm() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingPassword) return;
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    setSavingPassword(true);
    const res = await fetch("/api/user/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    setSavingPassword(false);

    if (!res.ok) {
      setPasswordMsg({
        type: "error",
        text: data?.error ?? "Could not update password.",
      });
      return;
    }

    resetPasswordForm();
    setShowPasswordForm(false);
    setPasswordMsg({ type: "ok", text: "Password updated." });
  }

  // ── Data download ───────────────────────────────────────────
  const [downloading, setDownloading] = useState(false);

  async function downloadData() {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch("/api/user/data");
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `scribbled-${user.username}-data.json`;
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  // ── Sign out ────────────────────────────────────────────────
  async function signOut() {
    await fetch("/api/logout", { method: "POST" });
    clearUser();
    router.push("/");
    router.refresh();
  }

  // ── Delete account ──────────────────────────────────────────
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<string | null>(null);

  async function deleteAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (deleting) return;
    setDeleting(true);
    setDeleteMsg(null);

    const res = await fetch("/api/user/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: deletePassword }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setDeleting(false);
      setDeleteMsg(data?.error ?? "Could not delete account.");
      return;
    }

    clearUser();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen">
      <header className="header glassmorphism flex items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="logo font-bold text-2xl flex items-center gap-2"
          style={{ color: "#0B1F3B" }}
        >
          <Image
            src="/blog_pen_logo.svg"
            alt="Scribbled logo"
            width={32}
            height={32}
          />
          SCRIBBLED
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="btn-secondary rounded-full flex items-center gap-2 px-4 py-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back
          </button>
          <Link href="/" className="btn-secondary btn-home rounded-full px-4 py-2">
            Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-[760px] px-4 py-12">
        <h1 className="mb-2 text-4xl font-semibold text-primary">Settings</h1>
        <p className="mb-10 text-sm text-on-surface-variant">
          Manage your account, security, and privacy.
        </p>

        {/* ── ACCOUNT ─────────────────────────────────────────── */}
        <SectionHeading>Account</SectionHeading>
        <div className={`${cardClass} mb-10`}>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-on-primary">
              {initialsOf(user.name)}
            </div>
            <div>
              <p className="text-lg font-semibold text-on-surface">
                {user.name}
              </p>
              <p className="text-sm text-on-surface-variant">
                @{user.username} · Member since {memberSinceLabel}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-on-surface-variant">
                Display name
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-on-surface outline-none focus:border-primary/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-on-surface-variant">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-on-surface outline-none focus:border-primary/40"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={saveProfile}
              disabled={!profileDirty || savingProfile}
              className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50"
            >
              {savingProfile ? "Saving…" : "Save changes"}
            </button>
            {profileMsg ? (
              <span
                className={`text-sm ${
                  profileMsg.type === "ok" ? "text-green-700" : "text-red-600"
                }`}
              >
                {profileMsg.text}
              </span>
            ) : null}
          </div>
        </div>

        {/* ── SECURITY ────────────────────────────────────────── */}
        <SectionHeading>Security</SectionHeading>
        <div className={`${cardClass} mb-10`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-on-surface">Password</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                Choose a strong password you don&apos;t use elsewhere.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowPasswordForm((open) => !open);
                setPasswordMsg(null);
                resetPasswordForm();
              }}
              className="btn-outline px-4 py-2 text-sm"
            >
              {showPasswordForm ? "Cancel" : "Update"}
            </button>
          </div>

          {showPasswordForm ? (
            <form
              onSubmit={changePassword}
              className="mt-5 space-y-4 border-t border-black/10 pt-5"
            >
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wide text-on-surface-variant">
                  Current password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-on-surface outline-none focus:border-primary/40"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-on-surface-variant">
                    New password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-on-surface outline-none focus:border-primary/40"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wide text-on-surface-variant">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-on-surface outline-none focus:border-primary/40"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={savingPassword}
                className="btn-primary px-5 py-2.5 text-sm disabled:opacity-50"
              >
                {savingPassword ? "Updating…" : "Update password"}
              </button>
            </form>
          ) : null}

          {passwordMsg ? (
            <p
              className={`mt-4 text-sm ${
                passwordMsg.type === "ok" ? "text-green-700" : "text-red-600"
              }`}
            >
              {passwordMsg.text}
            </p>
          ) : null}
        </div>

        {/* ── APPEARANCE ──────────────────────────────────────── */}
        <SectionHeading>Appearance</SectionHeading>
        <div className={`${cardClass} mb-10`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-on-surface">Dark mode</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                A darker theme for late-night reading. Coming soon.
              </p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-on-surface-variant">
              Coming soon
            </span>
          </div>
        </div>

        {/* ── DATA & PRIVACY ──────────────────────────────────── */}
        <SectionHeading>Data &amp; Privacy</SectionHeading>
        <div className={`${cardClass} mb-10`}>
          <p className="mb-5 text-sm leading-relaxed text-on-surface-variant">
            Your writing and your data belong to you. Download a complete copy
            of your account, posts, comments, and follow connections at any
            time — exported as a single JSON file.
          </p>
          <button
            type="button"
            onClick={downloadData}
            disabled={downloading}
            className="btn-outline px-4 py-2.5 text-sm disabled:opacity-50"
          >
            {downloading ? "Preparing…" : "↓ Download your data"}
          </button>
        </div>

        {/* ── SESSION ─────────────────────────────────────────── */}
        <SectionHeading>Session</SectionHeading>
        <div className={`${cardClass} mb-10`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-on-surface">Sign out</p>
              <p className="mt-1 text-xs text-on-surface-variant">
                End your session on this device.
              </p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="btn-secondary px-4 py-2 text-sm"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* ── DANGER ZONE ─────────────────────────────────────── */}
        <h2 className="mb-4 text-2xl font-semibold text-red-600">
          Danger Zone
        </h2>
        <div className="mb-16 rounded-3xl border border-red-200 bg-white/80 p-6 backdrop-blur md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-red-600">
                Delete account
              </p>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-on-surface-variant">
                This is permanent. Your account, posts, comments, and follows
                will be erased and cannot be recovered.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowDeleteForm((open) => !open);
                setDeleteMsg(null);
                setDeletePassword("");
              }}
              className="whitespace-nowrap rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              {showDeleteForm ? "Cancel" : "Delete account"}
            </button>
          </div>

          {showDeleteForm ? (
            <form
              onSubmit={deleteAccount}
              className="mt-5 space-y-4 border-t border-red-100 pt-5"
            >
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wide text-on-surface-variant">
                  Confirm your password to delete
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(event) => setDeletePassword(event.target.value)}
                  required
                  className="h-12 w-full max-w-sm rounded-xl border border-red-200 bg-white px-4 text-on-surface outline-none focus:border-red-400"
                />
              </div>
              {deleteMsg ? (
                <p className="text-sm text-red-600">{deleteMsg}</p>
              ) : null}
              <button
                type="submit"
                disabled={deleting}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting…" : "Delete account forever"}
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </main>
  );
}
