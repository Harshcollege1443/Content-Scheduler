import PlatformTag from "./PlatformTag";

export default function PostCard({ post, onClick, draggable = true, onDragStart }) {
  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart && onDragStart(e, post)}
      onClick={() => onClick && onClick(post)}
      className="bg-white border border-line rounded-md px-3 py-2 cursor-grab active:cursor-grabbing
                 hover:border-indigo/50 transition text-left w-full"
    >
      <p className="text-sm font-medium leading-snug line-clamp-2">{post.title}</p>
      <div className="mt-2">
        <PlatformTag platform={post.platform} />
      </div>
    </div>
  );
}
