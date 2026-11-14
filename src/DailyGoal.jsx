export default function DailyGoal({ done, goal }) {
  const shown = Math.min(done, goal);
  const left = Math.max(goal - done, 0);
  return (
    <div className="daily-goal">
      <div className="goal-ring" style={{ "--goal": `${(shown / goal) * 100}%` }}>
        <span>{shown}</span>
        <small>/{goal}</small>
      </div>
      <div>
        <strong>Daily goal</strong>
        <p>{left > 0 ? `${left} ${left === 1 ? "quiz" : "quizzes"} to go!` : "Goal reached!"}</p>
      </div>
    </div>
  );
}
