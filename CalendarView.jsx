import { useEffect, useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import api from "../api/axios";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";

export default function CalendarView() {
  const [month, setMonth] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [presetDate, setPresetDate] = useState(null);

  const gridStart = startOfWeek(startOfMonth(month));
  const gridEnd = endOfWeek(endOfMonth(month));
  const days = useMemo(
    () => eachDayOfInterval({ start: gridStart, end: gridEnd }),
    [month]
  );

  useEffect(() => {
    loadPosts();
  }, [month]);

  async function loadPosts() {
    const { data } = await api.get("/posts", {
      params: { from: gridStart.toISOString(), to: gridEnd.toISOString() },
    });
    setPosts(data);
  }

  function postsForDay(day) {
    return posts.filter((p) => isSameDay(new Date(p.scheduledDate), day));
  }

  function openNew(day) {
    setEditing(null);
    setPresetDate(day);
    setModalOpen(true);
  }

  function openEdit(post) {
    setEditing(post);
    setPresetDate(null);
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
  }

  async function handleDelete(id) {
    await api.delete(`/posts/${id}`);
    setModalOpen(false);
    loadPosts();
  }

  function handleDragStart(e, post) {
    e.dataTransfer.setData("postId", post._id);
  }

  async function handleDrop(e, day) {
    e.preventDefault();
    const postId = e.dataTransfer.getData("postId");
    if (!postId) return;
    await api.patch(`/posts/${postId}/move-date`, { scheduledDate: day.toISOString() });
    loadPosts();
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="eyebrow mb-1">Plan the month</p>
          <h1 className="font-display text-2xl">{format(month, "MMMM yyyy")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setMonth(subMonths(month, 1))} className="btn-ghost !px-3 !py-1.5 text-sm">←</button>
          <button onClick={() => setMonth(new Date())} className="btn-ghost !px-3 !py-1.5 text-sm">Today</button>
          <button onClick={() => setMonth(addMonths(month, 1))} className="btn-ghost !px-3 !py-1.5 text-sm">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-t border-l border-line">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="eyebrow text-center py-2 border-b border-r border-line bg-white">
            {d}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toISOString()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, day)}
            onClick={() => openNew(day)}
            className={`min-h-[110px] border-b border-r border-line p-2 align-top cursor-pointer
              ${isSameMonth(day, month) ? "bg-panel" : "bg-base/60"}
              hover:bg-indigo/5 transition`}
          >
            <p className={`text-xs font-mono mb-1.5 ${isSameDay(day, new Date()) ? "text-indigo font-semibold" : "text-mute"}`}>
              {format(day, "d")}
            </p>
            <div className="space-y-1.5">
              {postsForDay(day).map((post) => (
                <div key={post._id} onClick={(e) => e.stopPropagation()}>
                  <PostCard post={post} onClick={openEdit} onDragStart={handleDragStart} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PostModal
        open={modalOpen}
        initial={editing || (presetDate ? { scheduledDate: presetDate.toISOString() } : null)}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
