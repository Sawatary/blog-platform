import { Avatar, Button, Typography, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextAuth";

import styles from "./styles/Header.module.scss";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.title}>Blog Platform</p>
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

          <Link to="/profile">
            <Flex>
              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "12px",
                  marginRight: "10px",
                }}
                color="black"
              >
                {user}
              </Typography>
              <Avatar
                style={{ width: "52px", height: "52px" }}
                alt="Avatar"
                src={
                  "https://i2020.otzovik.com/2020/04/avatar/75334401.jpeg?4bdb"
                }
              />
            </Flex>
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
