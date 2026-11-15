import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import DailyGoal from "./DailyGoal";
import { bank, createSession, QUICK_PLAY_COUNT } from "./questions";
import { FEATURED_COUNT } from "./categoryData";

const LETTERS = ["A", "B", "C", "D"];

const makeRules = (time) => [
  { icon: "clock", title: `${time} seconds per question`, text: "Run out of time and it counts as a miss." },
  { icon: "check", title: "100 points per right answer", text: "Wrong answers score zero." },
  { icon: "bolt", title: "Up to +100 speed bonus", text: "The faster you answer, the more you earn." },
  { icon: "star", title: "Finish to hit your goal", text: "Counts toward your daily goal." },
];

// autoStart: a quiz config ({ kind: "quick" } or { kind: "category", category }) to begin right away
// onLeave: optional. When the quiz was started from another page (e.g. All categories), Quit and
// "Back" return there instead of to this page's own lobby. leaveLabel is the button text for it.
export default function QuizPage({
  categories,
  category,
  setCategory,
  autoStart,
  onSeeAll,
  onLeave,
  leaveLabel = "Back to quizzes",
  done,
  goal,
  questionTime = 20,
  onComplete,
}) {
  const [phase, setPhase] = useState(() =>
    autoStart
      ? { view: "play", config: autoStart, session: createSession(autoStart) }
      : { view: "lobby" },
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase.view]);

  const leave = onLeave ?? (() => setPhase({ view: "lobby" }));

  function start(config) {
    setPhase({ view: "play", config, session: createSession(config) });
  }

  function finish(log) {
    const correct = log.filter((entry) => entry.correct).length;
    const points = log.reduce((sum, entry) => sum + entry.earned, 0);
    const avgTime = Math.round(log.reduce((sum, entry) => sum + entry.spent, 0) / log.length);
    onComplete({ points });
    setPhase((p) => ({ ...p, view: "results", log, correct, points, avgTime }));
  }

  if (phase.view === "play") {
    return (
      <Play
        key={phase.session.id}
        session={phase.session}
        categories={categories}
        questionTime={questionTime}
        onFinish={finish}
        onQuit={leave}
      />
    );
  }

  if (phase.view === "results") {
    return (
      <Results
        result={phase}
        done={done}
        goal={goal}
        onReplay={() => start(phase.config)}
        onExit={leave}
        exitLabel={onLeave ? leaveLabel : "Back to quizzes"}
      />
    );
  }

  return (
    <Lobby
      questionTime={questionTime}
      categories={categories}
      category={category}
      setCategory={setCategory}
      done={done}
      goal={goal}
      onStart={start}
      onSeeAll={onSeeAll}
    />
  );
}

/* ---------------------------------------------------------------- Lobby */

function Lobby({ categories, category, setCategory, done, goal, questionTime, onStart, onSeeAll }) {
  const selected = categories.find((c) => c.name === category) ?? categories[0];
  const count = bank[selected.name].length;

  return (
    <div className="content quiz-view">
      <section className="welcome">
        <div>
          <p className="eyebrow">TEST YOUR KNOWLEDGE</p>
          <h1>Pick your next quiz</h1>
          <p className="subtitle">Jump into a quick round or choose a topic you love.</p>
        </div>
        <DailyGoal done={done} goal={goal} />
      </section>

      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">QUICK START</p>
            <h2>Jump straight in</h2>
          </div>
        </div>
        <div className="mode-grid single">
          <button className="mode-card yellow" onClick={() => onStart({ kind: "quick" })}>
            <span className="mode-icon">
              <Icon name="bolt" size={25} />
            </span>
            <span className="tag">Popular</span>
            <span className="mode-copy">
              <strong>Quick Play</strong>
              <small>{QUICK_PLAY_COUNT} mixed questions · {Math.max(1, Math.round((QUICK_PLAY_COUNT * questionTime) / 60))} min</small>
            </span>
            <span className="mode-arrow">
              <Icon name="arrow" size={18} />
            </span>
          </button>
        </div>
      </section>

      <div className="lower-grid">
        <section className="topic-section">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">EXPLORE</p>
              <h2>Choose a topic</h2>
            </div>
            <button className="text-button" onClick={onSeeAll}>
              See all <Icon name="arrow" size={16} />
            </button>
          </div>
          <div className="category-grid">
            {categories.slice(0, FEATURED_COUNT).map((item) => (
              <button
                key={item.name}
                onClick={() => setCategory(item.name)}
                aria-pressed={category === item.name}
                className={`category-card ${item.color} ${category === item.name ? "selected" : ""}`}
              >
                <span>{item.emoji}</span>
                <strong>{item.name}</strong>
                <small>{bank[item.name].length} questions</small>
              </button>
            ))}
          </div>

          <div className="start-card">
            <div className="start-icon">{selected.emoji}</div>
            <div className="start-info">
              <strong>{selected.name} quiz</strong>
              <span className="start-meta">
                {count} questions · about {Math.round((count * questionTime) / 60)} min
              </span>
            </div>
            <button className="primary-btn" onClick={() => onStart({ kind: "category", category: selected.name })}>
              Start quiz <Icon name="arrow" size={18} />
            </button>
          </div>
        </section>

        <aside className="leaderboard-card">
          <div className="leader-head">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>Every second counts</h2>
            </div>
            <span className="trophy-box">
              <Icon name="bolt" size={23} />
            </span>
          </div>
          <div className="rule-list">
            {makeRules(questionTime).map((rule) => (
              <div className="rule-row" key={rule.title}>
                <span className="rule-icon">
                  <Icon name={rule.icon} size={19} filled={rule.icon === "star"} />
                </span>
                <span>
                  <strong>{rule.title}</strong>
                  <small>{rule.text}</small>
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Play */

function Play({ session, categories, questionTime, onFinish, onQuit }) {
  const { questions } = session;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null); // null = still open, -1 = ran out of time
  const [timeLeft, setTimeLeft] = useState(questionTime);
  const [log, setLog] = useState([]);
  const stageRef = useRef(null);
  const nextRef = useRef(null);
  // Synchronous guards. React state only updates on the next render, so two events that
  // land before it (a click + a key press, the timer + a click) could both pass a
  // `picked !== null` check and record the same question twice. Refs update instantly.
  const answeredRef = useRef(false); // has the current question been answered?
  const finishedRef = useRef(false); // has the round already been handed to onFinish?
  const logRef = useRef([]); // one entry per answered question, always in sync

  const q = questions[index];
  const meta = categories.find((c) => c.name === q.category);
  const answered = picked !== null;
  const isLast = index === questions.length - 1;
  const last = log[log.length - 1];

  function choose(i) {
    if (answeredRef.current) return;
    answeredRef.current = true;
    const correct = i === q.answer;
    logRef.current = [
      ...logRef.current,
      {
        picked: i,
        correct,
        earned: correct ? 100 + Math.round((timeLeft / questionTime) * 100) : 0,
        spent: questionTime - timeLeft,
      },
    ];
    setLog(logRef.current);
    setPicked(i);
  }

  function next() {
    if (!answeredRef.current) return;
    if (isLast) {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onFinish(logRef.current.slice(0, questions.length));
      return;
    }
    answeredRef.current = false;
    setIndex(index + 1);
    setPicked(null);
    setTimeLeft(questionTime);
  }

  // countdown: one tick per second while the question is open
  useEffect(() => {
    if (picked !== null) return;
    if (timeLeft <= 0) {
      choose(-1);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [picked, timeLeft]);

  // keyboard: 1-4 or A-D pick an answer
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      const key = e.key.toLowerCase();
      const i = "1234".includes(key) && key.length === 1 ? "1234".indexOf(key) : "abcd".indexOf(key);
      if (key.length === 1 && i >= 0 && i < q.options.length) choose(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // focus: the question when it appears, the Next button once answered
  useEffect(() => {
    stageRef.current?.focus({ preventScroll: true });
  }, [index]);
  useEffect(() => {
    if (!answered) return;
    nextRef.current?.focus({ preventScroll: true });
    // on phones the button can sit under the bottom nav: bring it into view
    nextRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [answered]);

  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="content quiz-view">
      <div className="play">
        <div className="play-top">
          <button className="text-button muted" onClick={onQuit}>
            <Icon name="close" size={16} /> Quit
          </button>
          <p className="eyebrow">
            QUESTION {index + 1} OF {questions.length}
          </p>
          <div
            className={`timer-chip${!answered && timeLeft <= 5 ? " low" : ""}`}
            role="timer"
            aria-live="off"
            aria-label={`${timeLeft} seconds left`}
          >
            <Icon name="clock" size={16} />
            {timeLeft}s
          </div>
        </div>

        <div
          className="quiz-progress"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={index + (answered ? 1 : 0)}
        >
          <i style={{ width: `${progress}%` }} />
        </div>

        <section key={index} className="question-card" ref={stageRef} tabIndex={-1} aria-labelledby="question-text">
          <span className={`cat-pill ${meta.color}`}>
            <span aria-hidden="true">{meta.emoji}</span> {q.category}
          </span>
          <h2 id="question-text" className="question-text">
            {q.q}
          </h2>

          <div className="options" role="group" aria-label="Answers">
            {q.options.map((option, i) => {
              let state = "";
              if (answered) state = i === q.answer ? "correct" : i === picked ? "wrong" : "dim";
              return (
                <button
                  key={i}
                  className={`option ${state}`}
                  onClick={() => choose(i)}
                  disabled={answered}
                  aria-keyshortcuts={`${i + 1} ${LETTERS[i]}`}
                >
                  <span className="letter">{LETTERS[i]}</span>
                  <span className="option-text">{option}</span>
                  {state === "correct" && <Icon name="check" size={20} />}
                  {state === "wrong" && <Icon name="close" size={20} />}
                </button>
              );
            })}
          </div>

          <div className="feedback" aria-live="polite">
            {answered && (
              <>
                <p className={`feedback-text ${last?.correct ? "good" : "bad"}`}>
                  {last?.correct ? (
                    <>
                      <Icon name="check" size={18} /> Correct! +{last.earned} pts
                    </>
                  ) : (
                    <>
                      <Icon name="close" size={18} />
                      <span>
                        {picked === -1 ? "Time's up." : "Not quite."} The answer is{" "}
                        <strong>{q.options[q.answer]}</strong>.
                      </span>
                    </>
                  )}
                </p>
                <button ref={nextRef} className="primary-btn" onClick={next}>
                  {isLast ? "See results" : "Next question"} <Icon name="arrow" size={18} />
                </button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Results */

function Results({ result, done, goal, onReplay, onExit, exitLabel }) {
  const { session, log, correct, points, avgTime } = result;
  const total = session.questions.length;
  const pct = Math.round((correct / total) * 100);
  const headline =
    pct >= 90 ? "Outstanding, Jamie!" : pct >= 70 ? "Great round, Jamie!" : pct >= 40 ? "Nice effort, Jamie!" : "Keep practicing, Jamie!";

  return (
    <div className="content quiz-view">
      <div className="results">
        <div className="results-card">
          <p className="eyebrow">ROUND COMPLETE</p>
          <div className="result-ring" style={{ "--goal": `${pct}%` }}>
            <div className="ring-label">
              <strong>{correct}</strong>
              <small>/{total}</small>
            </div>
          </div>
          <h1>{headline}</h1>
          <p className="subtitle">
            You earned <strong>{points.toLocaleString("en-US")} points</strong> in {session.title}.
          </p>

          <div className="result-stats">
            <div>
              <strong>
                {correct}/{total}
              </strong>
              <small>Correct</small>
            </div>
            <div>
              <strong>{pct}%</strong>
              <small>Accuracy</small>
            </div>
            <div>
              <strong>{avgTime}s</strong>
              <small>Avg. time</small>
            </div>
          </div>

          <p className="goal-note">
            {done >= goal ? "🎉 Daily goal reached" : `Daily goal: ${done} of ${goal} quizzes done`}
          </p>

          <div className="result-actions">
            <button className="primary-btn" onClick={onReplay}>
              Play again
            </button>
            <button className="secondary-btn" onClick={onExit}>
              {exitLabel}
            </button>
          </div>
        </div>

        <section className="review">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">REVIEW</p>
              <h2>Your answers</h2>
            </div>
          </div>
          <div className="review-list">
            {session.questions.map((item, i) => {
              const entry = log[i];
              return (
                <div className="review-row" key={i}>
                  <span className={`review-mark ${entry.correct ? "good" : "bad"}`}>
                    <Icon name={entry.correct ? "check" : "close"} size={16} />
                  </span>
                  <span className="review-copy">
                    <strong>{item.q}</strong>
                    <small>
                      {entry.correct
                        ? item.options[item.answer]
                        : `${entry.picked === -1 ? "No answer" : `You said ${item.options[entry.picked]}`} · Correct: ${item.options[item.answer]}`}
                    </small>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
