import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button
      onClick={handleBack}
      color="default"
      variant="outlined"
      style={{
        position: "absolute",
        top: "160px",
        left: "260px",
        border: "none",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      }}
    >
      ←
    </Button>
  );
};

export default BackButton;
