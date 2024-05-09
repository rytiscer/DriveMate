import { useState, useEffect } from "react";
import { fetchClients } from "../../api/clients";
import { fetchCars } from "../../api/cars";
import { createOrder } from "../../api/orders";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";

const AddOrder = () => {
  const [clients, setClients] = useState([]);
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    clientId: "",
    carId: "",
    startDate: "",
    endDate: "",
    pickupLocation: "",
    returnLocation: "",
    totalPrice: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData);

        const carsData = await fetchCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to add this order?"
    );
    if (!confirmed) return;
    try {
      const totalPrice = calculateTotalPrice(formData);
      const newOrder = { ...formData, totalPrice };
      await createOrder(newOrder);
      alert("Order updated successfully!");
      navigate(ROUTES.ORDERS);
    } catch (error) {
      alert("Error adding order:", error);
    }
  };

  const calculateTotalPrice = (formData) => {
    const { carId, startDate, endDate } = formData;
    const car = cars.find((car) => car._id === carId);
    if (!car) return 0; // Patikriname, ar car yra apibrėžtas
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return car.price * days;
  };

  return (
    <Container>
      <Typography variant="h2" component="h2" gutterBottom>
        Add New Order
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Client"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
            >
              {clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {`${client.name} ${client.lastName}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Car"
              name="carId"
              value={formData.carId}
              onChange={handleChange}
              required
            >
              {cars.map((car) => (
                <MenuItem key={car._id} value={car._id}>
                  {car.brand} {car.model}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pickup Location"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Return Location"
              name="returnLocation"
              value={formData.returnLocation}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Price"
              name="totalPrice"
              value={calculateTotalPrice(formData)} // Atvaizduojame totalPrice
              InputProps={{
                readOnly: true, // Naudotojas negali keisti šio lauko
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddOrder;
