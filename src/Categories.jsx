import { Icon } from "./Icon";
import DailyGoal from "./DailyGoal";
import { bank } from "./questions";
import { categories } from "./categoryData";

export default function Categories({ query = "", onClearQuery, category, setCategory, onStart, onBack, done, goal, questionTime = 20 }) {
  const selected = categories.find((c) => c.name === category) ?? categories[0];
  const count = bank[selected.name].length;
  const term = query.trim().toLowerCase();
  const shown = term ? categories.filter((c) => c.name.toLowerCase().includes(term)) : categories;

  return (
    <div className="content quiz-view">
      <button className="text-button muted back-link" onClick={onBack}>
        <Icon name="arrow" size={16} /> Back
      </button>

      <section className="welcome">
        <div>
          <p className="eyebrow">EXPLORE</p>
          <h1>All categories</h1>
          <p className="subtitle">Pick any topic and test what you know.</p>
        </div>
        <DailyGoal done={done} goal={goal} />
      </section>

      <section>
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">
              {term ? `${shown.length} OF ${categories.length} TOPICS` : `${categories.length} TOPICS`}
            </p>
            <h2>Choose a category</h2>
          </div>
        </div>

        {shown.length === 0 && (
          <div className="no-results" role="status">
            <strong>No topics match “{query.trim()}”</strong>
            <span>Try a different word, or browse everything.</span>
            <button className="secondary-btn" onClick={onClearQuery}>
              Clear search
            </button>
          </div>
        )}

        <div className="all-grid">
          {shown.map((item) => (
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

        <div className="start-card cat-start">
          <div className="start-icon">{selected.emoji}</div>
          <div className="start-info">
            <strong>{selected.name} quiz</strong>
            <span className="start-meta">
              {count} questions · about {Math.max(1, Math.round((count * questionTime) / 60))} min
            </span>
          </div>
          <button className="primary-btn" onClick={() => onStart(selected.name)}>
            Start quiz <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
