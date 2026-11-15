import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export const TIME_OPTIONS = [
  { id: 15, label: "15s" },
  { id: 20, label: "20s" },
  { id: 30, label: "30s" },
];

const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className="switch"
      onClick={() => onChange(!checked)}
    />
  );
}

function Row({ icon, tint, title, text, className = "", children }) {
  return (
    <div className={`set-row ${className}`}>
      <span className={`set-icon ${tint}`}>
        <Icon name={icon} size={19} />
      </span>
      <span className="set-copy">
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <span className="set-control">{children}</span>
    </div>
  );
}

function Card({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`set-card ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="set-body">{children}</div>
    </section>
  );
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={value === option.id ? "active" : ""}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ProfileCard({ name, initials, onSaveName }) {
  const [draft, setDraft] = useState(name);
  const [saved, setSaved] = useState(false);
  const timer = useRef(null);
  const clean = draft.trim().replace(/\s+/g, " ");
  const tooLong = clean.length > 24;
  const invalid = clean.length === 0 || tooLong;
  const unchanged = clean === name;

  useEffect(() => () => clearTimeout(timer.current), []);

  function submit(e) {
    e.preventDefault();
    if (invalid || unchanged) return;
    onSaveName(clean);
    setDraft(clean);
    setSaved(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 2200);
  }

  return (
    <Card eyebrow="YOUR ACCOUNT" title="Profile">
      <div className="profile-hero">
        <span className="avatar avatar-j profile-avatar">{initials}</span>
        <span className="profile-hero-copy">
          <strong>{name}</strong>
          <small>Level 12 · 🔥 7 day streak</small>
        </span>
      </div>
      <form className="field" onSubmit={submit} noValidate>
        <label htmlFor="display-name">Display name</label>
        <div className="field-row">
          <input
            id="display-name"
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
            maxLength={40}
            autoComplete="nickname"
            aria-invalid={invalid && draft !== name}
            aria-describedby="display-name-hint"
          />
          <button className="primary-btn" type="submit" disabled={invalid || unchanged}>
            {saved ? (
              <>
                <Icon name="check" size={18} /> Saved
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
        <p id="display-name-hint" className={`field-hint${invalid && draft !== name ? " error" : ""}`}>
          {clean.length === 0 && draft !== name
            ? "Please enter a name."
            : tooLong
              ? "Keep it to 24 characters or fewer."
              : "Shown in the sidebar and on your home screen."}
        </p>
      </form>
    </Card>
  );
}

export default function Settings({
  name,
  initials,
  onSaveName,
  dark,
  setDark,
  sidebarOpen,
  setSidebarOpen,
  prefs,
  setPref,
  onResetPrefs,
  onResetProgress,
}) {
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState("");
  const confirmRef = useRef(null);

  useEffect(() => {
    if (confirming) confirmRef.current?.focus();
  }, [confirming]);

  function flash(message) {
    setDone(message);
    setTimeout(() => setDone(""), 2400);
  }

  return (
    <div className="content lb-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">PREFERENCES</p>
          <h1>Settings</h1>
          <p className="subtitle">Make Quizbolt feel like yours.</p>
        </div>
        <span className="trophy-box lb-trophy set-hero" aria-hidden="true">
          <Icon name="settings" size={32} />
        </span>
      </section>

      <div className="set-grid">
        <div className="set-col">
          <ProfileCard name={name} initials={initials} onSaveName={onSaveName} />

          <Card eyebrow="LOOK & FEEL" title="Appearance">
            <Row icon={dark ? "moon" : "sun"} tint="yellow" title="Theme" text="Switch between light and dark.">
              <Segmented
                label="Theme"
                options={THEME_OPTIONS}
                value={dark ? "dark" : "light"}
                onChange={(id) => setDark(id === "dark")}
              />
            </Row>
            <Row
              icon="panel"
              tint="blue"
              className="desk-only"
              title="Keep sidebar open"
              text="Collapse it for more room to play."
            >
              <Switch checked={sidebarOpen} onChange={setSidebarOpen} label="Keep sidebar open" />
            </Row>
            <Row icon="bolt" tint="pink" title="Reduce motion" text="Tone down animations and transitions.">
              <Switch checked={prefs.reduceMotion} onChange={(v) => setPref("reduceMotion", v)} label="Reduce motion" />
            </Row>
          </Card>
        </div>

        <div className="set-col">
          <Card eyebrow="GAMEPLAY" title="Quiz preferences">
            <Row
              icon="clock"
              tint="mint"
              title="Time per question"
              text="Speed bonus scales to the time you pick."
            >
              <Segmented
                label="Time per question"
                options={TIME_OPTIONS}
                value={prefs.questionTime}
                onChange={(v) => setPref("questionTime", v)}
              />
            </Row>
          </Card>

          <Card eyebrow="STAY IN THE LOOP" title="Notifications">
            <Row icon="trophy" tint="yellow" title="Rank changes" text="When you move up or down the board.">
              <Switch checked={prefs.notifRank} onChange={(v) => setPref("notifRank", v)} label="Rank change notifications" />
            </Row>
            <Row icon="bolt" tint="peach" title="Streak reminders" text="A nudge to keep your streak alive.">
              <Switch checked={prefs.notifStreak} onChange={(v) => setPref("notifStreak", v)} label="Streak reminders" />
            </Row>
            <Row icon="users" tint="pink" title="Friend invites" text="When someone invites you to a room.">
              <Switch checked={prefs.notifInvites} onChange={(v) => setPref("notifInvites", v)} label="Friend invite notifications" />
            </Row>
          </Card>

          <Card eyebrow="DATA" title="Reset" className="danger-card">
            <Row icon="refresh" tint="mint" title="Restore default settings" text="Puts every preference above back.">
              <button
                type="button"
                className="secondary-btn small"
                onClick={() => {
                  onResetPrefs();
                  flash("Settings restored");
                }}
              >
                Restore
              </button>
            </Row>
            <Row icon="trash" tint="rose" title="Reset progress" text="Clears your points and today's quizzes.">
              {!confirming && (
                <button type="button" className="secondary-btn small danger" onClick={() => setConfirming(true)}>
                  Reset
                </button>
              )}
            </Row>
            {confirming && (
              <div className="confirm-box" role="alertdialog" aria-label="Confirm reset progress">
                <p>
                  <strong>Reset all progress?</strong> Your points and daily goal go back to the start. This can't be undone.
                </p>
                <div className="confirm-actions">
                  <button type="button" className="secondary-btn small" onClick={() => setConfirming(false)}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    ref={confirmRef}
                    className="primary-btn small danger-fill"
                    onClick={() => {
                      onResetProgress();
                      setConfirming(false);
                      flash("Progress reset");
                    }}
                  >
                    Yes, reset
                  </button>
                </div>
              </div>
            )}
            <p className="set-status" role="status" aria-live="polite">
              {done && (
                <>
                  <Icon name="check" size={15} /> {done}
                </>
              )}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
