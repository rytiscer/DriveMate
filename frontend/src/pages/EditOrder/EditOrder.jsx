import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCars } from "../../api/cars";
import { fetchClients } from "../../api/clients";
import { getOrderById, updateOrder } from "../../api/orders";
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

const EditOrder = () => {
  const { id } = useParams();
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

        const orderData = await getOrderById(id);
        setFormData({
          clientId: orderData.clientId,
          carId: orderData.carId,
          startDate: orderData.startDate,
          endDate: orderData.endDate,
          pickupLocation: orderData.pickupLocation,
          returnLocation: orderData.returnLocation,
          totalPrice: orderData.totalPrice,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to update this order?"
    );
    if (!confirmed) return;
    try {
      await updateOrder(id, formData);
      alert("Order updated successfully!");
      navigate(ROUTES.ORDERS);
    } catch (error) {
      alert("Error updating order:", error);
    }
  };

  const calculateTotalPrice = () => {
    const { carId, startDate, endDate } = formData;
    const car = cars.find((car) => car._id === carId);
    if (!car) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return car.price * days;
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Order
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
              value={calculateTotalPrice()}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditOrder;
