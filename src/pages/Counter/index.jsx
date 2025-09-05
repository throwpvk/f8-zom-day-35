import { useEffect, useState } from "react";
import styles from "./Counter.module.scss";

function Display({ color, fontSize, children }) {
  return (
    <h1 className={styles.display} style={{ color, fontSize }}>{children}</h1>
  );
}

function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

function Nav({ onPlus, onMinus, onReset, onHome }) {
  return (
    <nav className={styles.nav}>
      <Button onClick={onHome}>
        <i className="fa-solid fa-house"></i>
      </Button>
      <Button onClick={onMinus}>
        <i className="fa-solid fa-minus"></i>
      </Button>
      <Button onClick={onPlus}>
        <i className="fa-solid fa-plus"></i>
      </Button>
      <Button onClick={onReset}>
        <i className="fa-solid fa-rotate-left"></i>
      </Button>
    </nav>
  );
}

function Counter() {
  const texts = ["Chào mừng bạn đến với ứng dụng Counter!"]; 
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    function typeText(index, charIndex = 0) {
      if (index >= texts.length) {
        setStep(texts.length);
        return;
      }
      if (charIndex < texts[index].length) {
        setTyped((prev) => prev + texts[index][charIndex]);
        setTimeout(() => typeText(index, charIndex + 1), 50);
      } else {
        setTimeout(() => {
          setTyped("");
          typeText(index + 1, 0);
        }, 1000);
      }
    }
    typeText(0);
  }, []);

  return (
    <div className={styles.container}>
      {step < texts.length && (
        <Display color="cadetblue" fontSize="4vw">{typed}</Display>
      )}
      {step >= texts.length && (
        <>
          <Display color={count >= 0 ? "cadetblue" : "chocolate"} fontSize="20vw">
            {count}
          </Display>
          <Nav
            onPlus={() => setCount((c) => c + 1)}
            onMinus={() => setCount((c) => c - 1)}
            onReset={() => setCount(0)}
            onHome={() => (window.location.href = "/")}
          />
        </>
      )}
    </div>
  );
}

export default Counter;


