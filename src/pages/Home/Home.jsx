import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Danh sách bài tập React</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/counter">#1 Counter App</Link>
          </li>
          <li>
            <Link to="/todo">#2 Todo List</Link>
          </li>
          <li>
            <Link to="/profile">#3 Profile Card</Link>
          </li>
          <li>
            <Link to="/product">#4 Product List</Link>
          </li>
          <li>
            <Link to="/comment">#5 Comment System</Link>
          </li>
          <li>
            <Link to="/weather">#6 Weather App</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;


