import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/cars");
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default Login;
