import { useState, useEffect } from "react";
import { fetchOrders, deleteOrder } from "../../api/orders";
import { fetchClients } from "../../api/clients";
import { fetchCars } from "../../api/cars";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState({});
  const [cars, setCars] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);

        const clientsData = await fetchClients();
        const clientsMap = {};
        clientsData.forEach((client) => {
          clientsMap[client._id] = `${client.name} ${client.lastName}`;
        });
        setClients(clientsMap);

        const carsData = await fetchCars();
        const carsMap = {};
        carsData.forEach((car) => {
          carsMap[car._id] = car.brand + " " + car.model;
        });
        setCars(carsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmDelete) {
      try {
        await deleteOrder(orderId);
        setOrders(orders.filter((order) => order._id !== orderId));
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  return (
    <Container>
      <h2>Orders</h2>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} lg={4} key={order._id}>
            <Card>
              <CardContent>
                {clients[order.clientId] ? (
                  <>
                    <Typography variant="h5" component="div">
                      Client Name: {clients[order.clientId]}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Email: {clients[order.clientId].email}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Phone: {clients[order.clientId].phone}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" component="div" color="error">
                    Order is not valid: Client not found
                  </Typography>
                )}
                {cars[order.carId] ? (
                  <>
                    <Typography variant="h6" component="div">
                      Car Name: {cars[order.carId]}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Start Date: {formatDate(order.startDate)}
                    </Typography>
                    <Typography variant="body1" component="div">
                      End Date: {formatDate(order.endDate)}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Pickup Location: {order.pickupLocation}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Return Location: {order.returnLocation}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Total Price: {order.totalPrice} $
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" component="div" color="error">
                    Order is not valid: Car not found
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Link to={`/clients/edit/${order._id}`}>
                  <Button size="small">Edit</Button>
                </Link>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;
