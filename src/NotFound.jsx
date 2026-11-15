import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export default function NotFound() {
  return (
    <div className="content quiz-view">
      <section className="welcome">
        <div>
          <p className="eyebrow">ERROR 404</p>
          <h1>Page not found</h1>
          <p className="subtitle">We couldn’t find the page you were looking for. It may have moved or never existed.</p>
        </div>
      </section>
      <div className="result-actions not-found-actions">
        <Link className="primary-btn" to="/">
          <Icon name="home" size={18} /> Back to Home
        </Link>
        <Link className="secondary-btn" to="/quiz">
          Browse quizzes
        </Link>
      </div>
    </div>
  );
}
