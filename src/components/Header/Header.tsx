import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.title}>Realworld Blog</p>
      </Link>
      <div className={styles.navigation}>
        <button className={styles.login} onClick={() => navigate("/signIn")}>
          Sign in
        </button>
        <button className={styles.register} onClick={() => navigate("/signUp")}>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;
