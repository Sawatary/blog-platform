import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button onClick={handleBack} color="default" variant="outlined">
      ←
    </Button>
  );
};

export default BackButton;
