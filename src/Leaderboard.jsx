import { useMemo, useState } from "react";
import { Icon } from "./Icon";
import { PERIODS, SCOPES, buildBoard, fmt } from "./leaderboardData";

function PlayerAvatar({ player, className = "" }) {
  return (
    <span
      className={`avatar ${player.isMe ? "avatar-j" : ""} ${className}`}
      style={player.isMe ? undefined : { backgroundColor: player.color }}
    >
      {player.initials}
    </span>
  );
}

function Move({ value }) {
  if (value > 0) return <span className="rank-up">↑ {value}</span>;
  if (value < 0) return <span className="rank-down">↓ {-value}</span>;
  return <span className="rank-same" aria-label="No change">–</span>;
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
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

function PodiumCard({ player }) {
  return (
    <li className={`podium-card p${player.rank}${player.isMe ? " is-you" : ""}`}>
      <span className="podium-badge" aria-label={`Rank ${player.rank}`}>
        {player.rank === 1 ? <Icon name="crown" size={16} filled /> : player.rank}
      </span>
      <PlayerAvatar player={player} />
      <strong className="podium-name">
        {player.isMe ? "You" : player.name}
      </strong>
      <span className="podium-points">
        {fmt(player.score)} <small>pts</small>
      </span>
      <span className="podium-meta">
        Lv {player.level} · 🔥 {player.streak}
      </span>
    </li>
  );
}

export default function Leaderboard({ points, quizzesDone, initials, onPlay }) {
  const [period, setPeriod] = useState("week");
  const [scope, setScope] = useState("everyone");

  const board = useMemo(
    () => buildBoard(period, points, scope, quizzesDone, initials),
    [period, scope, points, quizzesDone, initials],
  );
  const { rows, me, next, behind } = board;
  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);

  const gap = next ? next.score - me.score + 1 : 0;
  const lead = !next && behind ? me.score - behind.score : 0;
  const progress = next ? Math.min((me.score / next.score) * 100, 100) : 100;
  const firstName = (p) => p.name.split(" ")[0];

  return (
    <div className="content lb-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">RANKINGS</p>
          <h1>Leaderboard</h1>
          <p className="subtitle">See how you stack up against other players.</p>
        </div>
        <span className="trophy-box lb-trophy" aria-hidden="true">
          <Icon name="trophy" size={32} />
        </span>
      </section>

      <div className="lb-layout">
        <aside className="standing-card" aria-label="Your standing">
          <div className="standing-top">
            <p className="eyebrow">YOUR STANDING</p>
            <Move value={me.move} />
          </div>
          <div className="standing-main">
            <span className="standing-rank">#{me.rank}</span>
            <PlayerAvatar player={me} className="standing-avatar" />
          </div>
          <p className="standing-pts">
            <strong>{fmt(me.score)}</strong> pts · {board.period.label.toLowerCase()}
          </p>

          <div className="gap-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
            <i style={{ width: `${progress}%` }} />
          </div>
          <p className="gap-text">
            {next ? (
              <>
                <strong>{fmt(gap)} pts</strong> to overtake {firstName(next)}
              </>
            ) : behind ? (
              <>
                You're leading! <strong>{fmt(lead)} pts</strong> clear of {firstName(behind)}
              </>
            ) : (
              "You're the only one here — invite a friend!"
            )}
          </p>

          <div className="stat-tiles">
            <div className="stat-tile mint">
              <strong>{me.quizzes}</strong>
              <small>Quizzes</small>
            </div>
            <div className="stat-tile peach">
              <strong>🔥 {me.streak}</strong>
              <small>Day streak</small>
            </div>
            <div className="stat-tile blue">
              <strong>{me.level}</strong>
              <small>Level</small>
            </div>
          </div>

          <button className="primary-btn standing-cta" onClick={onPlay}>
            <Icon name="bolt" size={18} filled /> Play a quiz
          </button>
        </aside>

        <div className="lb-main">
          <div className="lb-toolbar">
            <Segmented label="Time period" options={PERIODS} value={period} onChange={setPeriod} />
            <Segmented label="Player group" options={SCOPES} value={scope} onChange={setScope} />
          </div>
          <p className="lb-reset">
            <Icon name="clock" size={15} /> {board.period.reset}
          </p>

          <ol className="podium" key={`${period}-${scope}`}>
            {podium.map((player) => (
              <PodiumCard key={player.id} player={player} />
            ))}
          </ol>

          {rest.length > 0 && (
            <div className="lb-card">
              <div className="lb-cols" aria-hidden="true">
                <span>#</span>
                <span>PLAYER</span>
                <span className="num hide-sm">QUIZZES</span>
                <span className="num hide-sm">STREAK</span>
                <span className="num">POINTS</span>
                <span className="num">MOVE</span>
              </div>
              <ol className="lb-list" start={4}>
                {rest.map((player, i) => (
                  <li
                    key={`${period}-${scope}-${player.id}`}
                    className={player.isMe ? "lb-row me" : "lb-row"}
                    style={{ "--i": i }}
                  >
                    <span className="rank">{player.rank}</span>
                    <span className="lb-player">
                      <PlayerAvatar player={player} />
                      <span className="leader-name">
                        <strong>
                          {player.isMe ? "You" : player.name}
                          {player.isMe && <em className="you-chip">YOU</em>}
                        </strong>
                        <small>Level {player.level}</small>
                      </span>
                    </span>
                    <span className="num hide-sm">{player.quizzes}</span>
                    <span className="num hide-sm">🔥 {player.streak}</span>
                    <span className="num lb-score">{fmt(player.score)}</span>
                    <span className="num">
                      <Move value={player.move} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
