import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/calendar");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 px-6">
      <p className="eyebrow mb-2">Get started</p>
      <h1 className="font-display text-2xl mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input-field" placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="input-field" type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input-field" type="password" placeholder="Password (min 6 characters)" minLength={6}
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-coral text-sm">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>{busy ? "Creating account…" : "Sign up"}</button>
      </form>
      <p className="text-sm text-mute mt-6">Already have an account? <Link to="/login" className="text-indigo">Log in</Link></p>
    </div>
  );
}
