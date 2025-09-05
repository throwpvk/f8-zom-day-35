import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <span>Đang tải...</span>
    </div>
  );
}

function ProfileCard({ user }) {
  return (
    <div className={styles.card}>
      <h2>{user.name}</h2>
      <span>
        <b>Username:</b> {user.username}
      </span>
      <span>
        <b>Email:</b> {user.email}
      </span>
      <span>
        <b>Phone:</b> {user.phone}
      </span>
      <span>
        <b>Website:</b> {user.website}
      </span>
      <span>
        <b>Address:</b> {user.address.street}, {user.address.city}
      </span>
    </div>
  );
}

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.homeBtn}>
          <i className="fa-solid fa-house"></i>
          <span> Home</span>
        </Link>
      </div>
      {loading && <Loading />}
      {user && <ProfileCard user={user} />}
    </div>
  );
}

export default Profile;


