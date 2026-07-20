export const PLATFORMS = [
  { id: "youtube", label: "YouTube", color: "#E1352F" },
  { id: "instagram", label: "Instagram", color: "#C13584" },
  { id: "x", label: "X", color: "#111111" },
];

export const STATUSES = [
  { id: "idea", label: "Idea", color: "#E8A33D" },
  { id: "shooting", label: "Shooting", color: "#EF6461" },
  { id: "editing", label: "Editing", color: "#4F46E5" },
  { id: "posted", label: "Posted", color: "#5B8266" },
];

export function platformMeta(id) {
  return PLATFORMS.find((p) => p.id === id) || PLATFORMS[0];
}

export function statusMeta(id) {
  return STATUSES.find((s) => s.id === id) || STATUSES[0];
}
