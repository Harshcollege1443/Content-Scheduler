import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-6 py-28 text-center">
      <p className="eyebrow mb-4">Content operations, in one place</p>
      <h1 className="font-display text-4xl sm:text-5xl leading-tight">
        Plan every post before
        <br /> you ever hit record.
      </h1>
      <p className="text-mute mt-6 max-w-lg mx-auto">
        Drag ideas across a real calendar, track each one from idea to shooting
        to editing to posted, and never miss a publish date across YouTube,
        Instagram, and X.
      </p>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Link to={user ? "/calendar" : "/register"} className="btn-primary">
          {user ? "Open calendar" : "Start planning"}
        </Link>
        <Link to="/login" className="btn-ghost">Log in</Link>
      </div>
    </div>
  );
}
