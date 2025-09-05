import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Comment.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <span>Đang tải...</span>
    </div>
  );
}

function CommentCard({ comment }) {
  return (
    <div className={styles.commentCard}>
      <img src={comment.avt_src} alt={comment.name} />
      <div className={styles.commentInfo}>
        <h4>{comment.name}</h4>
        <span>
          {comment.email} • {comment.timeAgo}
        </span>
        <p>{comment.body}</p>
      </div>
    </div>
  );
}

function Comment() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [nextId, setNextId] = useState(1);

  const fakeTimeAgo = () => {
    const hours = Math.floor(Math.random() * 24);
    const days = Math.floor(Math.random() * 5);
    return days > 0 ? `${days} ngày trước` : `${hours} giờ trước`;
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((c) => ({
          ...c,
          avt_src: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random`,
          timeAgo: fakeTimeAgo(),
        }));
        const maxId = Math.max(...mapped.map((c) => c.id));
        setNextId(maxId + 1);
        setComments(mapped.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newCmt = {
      postId: 1,
      id: nextId,
      name: "Guest User",
      email: "guest@example.com",
      body: newComment.trim(),
      avt_src: `https://ui-avatars.com/api/?name=Guest User&background=random`,
      timeAgo: "Vừa xong",
    };
    setComments([newCmt, ...comments]);
    setNextId(nextId + 1);
    setNewComment("");
  };

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.homeBtn}>
          <i className="fa-solid fa-house"></i>
          <span> Home</span>
        </Link>
      </div>
      {loading && <Loading />}
      {!loading && (
        <>
          <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
              placeholder="Nhập bình luận của bạn..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Gửi bình luận</button>
          </form>
          <div className={styles.commentsList}>
            {comments.map((c) => (
              <CommentCard key={c.id} comment={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Comment;


