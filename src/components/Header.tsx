import { Avatar, Button, Flex, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import styles from "./styles/Header.module.scss";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()!;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  const avatarSrc = user?.image || null;
  console.log(user?.username);
  console.log(avatarSrc);
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
      {isAuthenticated && user && (
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
                {user.username || "User"}
              </Typography>
              {avatarSrc ? (
                <Avatar
                  style={{ width: "52px", height: "52px" }}
                  alt="Avatar"
                  src={avatarSrc}
                />
              ) : (
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "50%",
                  }}
                >
                  <p style={{ textAlign: "center", lineHeight: "52px" }}>👤</p>
                </div>
              )}
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
