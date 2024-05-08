import { useState, useEffect } from "react";
import { fetchOrders, deleteOrder } from "../../api/orders";
import { fetchClients } from "../../api/clients";
import { fetchCars } from "../../api/cars";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);

        const clientsData = await fetchClients();
        const clientsMap = {};
        clientsData.forEach((client) => {
          clientsMap[client._id] = client;
        });
        setClients(clientsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Paverčia į suprantamą datą ir laiką
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
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} md={6} lg={4} key={order._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Client: {clients[order.clientId]?.name}{" "}
                  {clients[order.clientId]?.lastName}
                </Typography>
                <Typography variant="h6" component="div">
                  Car: {order.carId}
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
              </CardContent>
              <CardActions>
                <Link to={`/clients/edit/${order.clientId}`}>
                  <Button size="small">Edit Client</Button>
                </Link>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete Order
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Orders;
