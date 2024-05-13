import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import ClientForm from "../../components/AddClientForm/AddClientForm";

const AddClient = () => {
  const navigate = useNavigate();

  const handleFormSubmit = () => {
    navigate(ROUTES.CLIENTS);
  };

  return <ClientForm onSubmit={handleFormSubmit} />;
};

export default AddClient;
