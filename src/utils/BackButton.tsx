import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from './styles/Back.module.scss'

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button onClick={handleBack} color="default" variant="outlined" className={styles.back}>
      ←
    </Button>
  );
};

export default BackButton;
