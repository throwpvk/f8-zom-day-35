import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <span>Đang tải...</span>
    </div>
  );
}

function Modal({ visible, onClose, children }) {
  if (!visible) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div className={`${styles.modal} ${styles.show}`} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function ProductCard({ post, onDetail }) {
  const truncate = (str, n = 100) => (str.length > n ? str.slice(0, n) + "…" : str);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div className={styles.card}>
      <h3>{capitalize(post.title)}</h3>
      <span>{truncate(post.body)}</span>
      <button onClick={() => onDetail(post)}>Show detail</button>
    </div>
  );
}

function Product() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDetail = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
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
        <div className={styles.grid}>
          {posts.map((post) => (
            <ProductCard key={post.id} post={post} onDetail={handleDetail} />
          ))}
        </div>
      )}
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        {selectedPost && (
          <>
            <h3>{selectedPost.title}</h3>
            <span>{selectedPost.body}</span>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Product;


