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
  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.title}>Blog Platform</p>
      </Link>
      {!isAuthenticated && (
        <div className={styles.navigation}>
          <Button
            type="primary"
            className={styles.login}
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </Button>
          <Button
            type="dashed"
            className={styles.register}
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </Button>
        </div>
      )}
      {isAuthenticated && user && (
        <div className={styles.navigationAuth}>
          <Link to="/new-article">
            <Button type="primary" className={styles.btnCreate}>
              Create article
            </Button>
          </Link>

          <Link to="/profile">
            <Flex
              style={{
                borderRadius: "10px",
                width: "100%",
                padding: "5px 15px 5px 15px",
                margin: "0 10px 0 10px",
              }}
            >
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
                  style={{
                    width: "52px",
                    height: "52px",
                  }}
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

          <Button
            className={styles.btnCreate}
            variant="outlined"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
