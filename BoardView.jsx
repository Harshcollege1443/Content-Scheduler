import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../api/axios";
import { STATUSES } from "../constants";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";

export default function BoardView() {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadPosts();
    loadReminders();
  }, []);

  async function loadPosts() {
    const { data } = await api.get("/posts");
    setPosts(data);
  }

  async function loadReminders() {
    const { data } = await api.get("/posts/reminders");
    setReminders(data);
  }

  function postsForStatus(status) {
    return posts.filter((p) => p.status === status);
  }

  function openEdit(post) {
    setEditing(post);
    setModalOpen(true);
  }

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  async function handleSave(form) {
    const payload = {
      title: form.title,
      platform: form.platform,
      status: form.status,
      scheduledDate: form.scheduledDate,
      reminderAt: form.reminderAt || null,
      notes: form.notes,
    };
    if (form.id) {
      await api.patch(`/posts/${form.id}`, payload);
    } else {
      await api.post("/posts", payload);
    }
    setModalOpen(false);
    loadPosts();
    loadReminders();
  }

  async function handleDelete(id) {
    await api.delete(`/posts/${id}`);
    setModalOpen(false);
    loadPosts();
  }

  function handleDragStart(e, post) {
    e.dataTransfer.setData("postId", post._id);
  }

  async function handleDrop(e, status) {
    e.preventDefault();
    const postId = e.dataTransfer.getData("postId");
    if (!postId) return;
    await api.patch(`/posts/${postId}/move-status`, { status });
    loadPosts();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow mb-1">Production line</p>
          <h1 className="font-display text-2xl">Board</h1>
        </div>
        <button onClick={openNew} className="btn-primary text-sm !px-4 !py-2">+ New post</button>
      </div>

      {reminders.length > 0 && (
        <div className="card border-amber/40 bg-amber/5 p-4 mb-8">
          <p className="eyebrow mb-2 text-amber">Due in the next 24 hours</p>
          <ul className="space-y-1">
            {reminders.map((r) => (
              <li key={r._id} className="text-sm">
                {r.title} — <span className="text-mute font-mono">{format(new Date(r.reminderAt), "MMM d, h:mm a")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUSES.map((s) => (
          <div
            key={s.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, s.id)}
            className="bg-base rounded-lg border border-line p-3 min-h-[400px]"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <p className="font-display text-sm">{s.label}</p>
              <span className="text-xs text-mute font-mono ml-auto">{postsForStatus(s.id).length}</span>
            </div>
            <div className="space-y-2">
              {postsForStatus(s.id).map((post) => (
                <PostCard key={post._id} post={post} onClick={openEdit} onDragStart={handleDragStart} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <PostModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
