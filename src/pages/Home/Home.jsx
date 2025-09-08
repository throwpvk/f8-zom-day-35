import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import Button from "../../components/Button";

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

      {/* Button Demo Section */}
      <section className={styles.buttonDemo}>
        <h2 className={styles.subtitle}>Button Component Examples</h2>
        <div className={styles.buttonGrid}>
          {/* 1. Basic Button */}
          <Button>Click Me</Button>

          {/* 2. Primary Button */}
          <Button variant="primary">Primary Button</Button>

          {/* 3. Link Button */}
          <Button href="https://google.com" target="_blank">
            Go to Google
          </Button>

          {/* 4. Small Button */}
          <Button size="small">Small Button</Button>

          {/* 5. Large Button */}
          <Button size="large">Large Button</Button>

          {/* 6. Bordered Button */}
          <Button variant="bordered">Bordered Button</Button>

          {/* 7. Rounded Button */}
          <Button variant="rounded">Rounded Button</Button>

          {/* 8. Primary Rounded Button */}
          <Button variant="primary" rounded>
            Primary Rounded
          </Button>

          {/* 9. Disabled Button */}
          <Button disabled onClick={() => alert("Should not show")}>
            Disabled Button
          </Button>

          {/* 10. Loading Button with Icon */}
          <Button loading variant="primary">
            <span>📧</span> Loading Email
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Home;
