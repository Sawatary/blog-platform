import { Avatar, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextAuth";

import styles from "./styles/Header.module.scss";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()!;
  const navigate = useNavigate();

  // Логика выхода
  const handleLogout = () => {
    logout(); // Очищаем данные авторизации
    navigate("/sign-in"); // Перенаправляем на страницу входа
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.title}>Blog-Platform</p>
      </Link>
      {!isAuthenticated && (
        <div className={styles.navigation}>
          <button className={styles.login} onClick={() => navigate("/sign-in")}>
            Sign in
          </button>
          <button
            className={styles.register}
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </button>
        </div>
      )}
      {isAuthenticated && (
        <div className={styles.navigationAuth}>
          <Link to="/new-article">
            <Button type="primary">Create article</Button>
          </Link>
          <Typography style={{ fontSize: "16px" }} color="black">
            {user}
          </Typography>
          <Link to="/profile">
            <Avatar
              style={{ width: "52px", height: "52px" }}
              alt="Avatar"
              src={"https://via.placeholder.com/150"}
            />
          </Link>
          <Button variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
