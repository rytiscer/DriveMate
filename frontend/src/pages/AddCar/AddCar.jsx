import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { createCar } from "../../api/cars";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    carType: "",
    gearbox: "",
    img: "",
    fuelType: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to add this car?");
    if (!confirmed) return;
    try {
      await createCar(formData);
      console.log("Car added successfully!");
      navigate(ROUTES.CARS);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          name="brand"
          label="Brand"
          variant="outlined"
          value={formData.brand}
          onChange={handleChange}
        />
        <TextField
          name="model"
          label="Model"
          variant="outlined"
          value={formData.model}
          onChange={handleChange}
        />
        <TextField
          name="year"
          label="Year"
          variant="outlined"
          value={formData.year}
          onChange={handleChange}
        />
        <TextField
          name="color"
          label="Color"
          variant="outlined"
          value={formData.color}
          onChange={handleChange}
        />
        <TextField
          name="carType"
          label="Car Type"
          variant="outlined"
          value={formData.carType}
          onChange={handleChange}
        />
        <TextField
          name="gearbox"
          label="Gearbox"
          variant="outlined"
          value={formData.gearbox}
          onChange={handleChange}
        />
        <TextField
          name="img"
          label="Image URL"
          variant="outlined"
          value={formData.img}
          onChange={handleChange}
        />
        <TextField
          name="fuelType"
          label="Fuel Type"
          variant="outlined"
          value={formData.fuelType}
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          value={formData.price}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Car
        </Button>
      </form>
    </>
  );
};

export default AddCar;
