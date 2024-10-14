import { Link, useNavigate } from "react-router-dom";
import { Avatar, Typography, Button } from "antd";

import styles from "./styles/Header.module.scss";

const Header = () => {
  const state = false;

  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.title}>Blog-Platform</p>
      </Link>
      {!state && (
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
      {state && (
        <div className={styles.navigationAuth}>
          <Link to="/new-article">
            <Button type="primary">Create article</Button>
          </Link>
          <Typography style={{ fontSize: "16px" }} color="black">
            John Doe
          </Typography>
          <Link to="/profile">
            <Avatar
              style={{ width: "52px", height: "52px" }}
              alt="Avatar"
              src={"https://via.placeholder.com/150"}
            />
          </Link>
          <Button variant="outlined">Log Out</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
