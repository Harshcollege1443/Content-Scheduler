import { useEffect, useState } from "react";
import { PLATFORMS, STATUSES } from "../constants";

const empty = {
  title: "",
  platform: "youtube",
  status: "idea",
  scheduledDate: "",
  reminderAt: "",
  notes: "",
};

export default function PostModal({ open, initial, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        platform: initial.platform || "youtube",
        status: initial.status || "idea",
        scheduledDate: initial.scheduledDate ? initial.scheduledDate.slice(0, 10) : "",
        reminderAt: initial.reminderAt ? initial.reminderAt.slice(0, 16) : "",
        notes: initial.notes || "",
      });
    } else {
      setForm(empty);
    }
  }, [initial, open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ ...form, id: initial?._id });
  }

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 px-4">
      <div className="card w-full max-w-md p-6">
        <p className="eyebrow mb-1">{initial ? "Edit post" : "New post"}</p>
        <h2 className="font-display text-xl mb-5">{initial ? "Update this post" : "Plan a new post"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input-field"
            placeholder="Post title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="input-field"
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
            <select
              className="input-field"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-mute block mb-1">Scheduled date</label>
            <input
              type="date"
              className="input-field"
              value={form.scheduledDate}
              onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-xs text-mute block mb-1">Reminder (optional)</label>
            <input
              type="datetime-local"
              className="input-field"
              value={form.reminderAt}
              onChange={(e) => setForm({ ...form, reminderAt: e.target.value })}
            />
          </div>
          <textarea
            className="input-field"
            placeholder="Notes"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <div className="flex items-center justify-between pt-2">
            <div>
              {initial && (
                <button
                  type="button"
                  onClick={() => onDelete(initial._id)}
                  className="text-sm text-coral hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-ghost text-sm !px-4 !py-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm !px-4 !py-2">
                {initial ? "Save changes" : "Add post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
