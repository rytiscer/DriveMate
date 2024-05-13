import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { createCar } from "../../api/cars";
import CarForm from "../../components/AddCarForm/AddCarForm";

const AddCar = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const confirmed = window.confirm("Are you sure you want to add this car?");
    if (!confirmed) return;
    try {
      await createCar(formData);
      alert("Car added successfully!");
      navigate(ROUTES.CARS);
    } catch (error) {
      alert("Error adding car:", error);
    }
  };

  return <CarForm onSubmit={handleSubmit} />;
};

export default AddCar;
