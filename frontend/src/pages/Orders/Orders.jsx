import { useState, useEffect } from "react";
import { fetchOrders, deleteOrder } from "../../api/orders";
import { fetchClients } from "../../api/clients";
import { fetchCars } from "../../api/cars";
import styles from "../Orders/Orders.module.scss";
import MainButton from "../../components/Button/MainButton";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setIsAuthenticated(isAuthenticated);
  }, []);

  const checkAuthentication = () => {
    const jwt = localStorage.getItem("token");
    return jwt ? true : false;
  };

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
    <>
      {!isAuthenticated && (
        <div className={styles.errorMessage}>Please log in to view orders</div>
      )}
      {isAuthenticated && (
        <>
          <Container>
            <div className={styles.ordersTopContainer}>
              <div className={styles.topRight}>
                <h1>Orders</h1>
              </div>
              <Link to="/orders/add">
                <MainButton className={styles.addButton}>Add Client</MainButton>
              </Link>
            </div>
            <Grid container spacing={2}>
              {orders.map((order) => (
                <Grid item xs={12} md={6} lg={4} key={order._id}>
                  <Card>
                    <CardContent style={{ minHeight: "220px" }}>
                      {clients[order.clientId] ? (
                        <>
                          <Typography variant="h5" component="div">
                            Client: {clients[order.clientId]}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          component="div"
                          color="error"
                        >
                          Order is not valid: Client not found
                        </Typography>
                      )}
                      {cars[order.carId] ? (
                        <>
                          <Typography variant="h6" component="div">
                            Car: {cars[order.carId]}
                          </Typography>
                          <Typography variant="body2" component="div">
                            Start Date: {formatDate(order.startDate)}
                          </Typography>
                          <Typography variant="body2" component="div">
                            End Date: {formatDate(order.endDate)}
                          </Typography>
                          <Typography variant="body2" component="div">
                            Pickup Location: {order.pickupLocation}
                          </Typography>
                          <Typography variant="body2" component="div">
                            Return Location: {order.returnLocation}
                          </Typography>
                          <Typography variant="body2" component="div">
                            Total Price: {order.totalPrice} $
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          component="div"
                          color="error"
                        >
                          Order is not valid: Car not found
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
                      <Link to={`/orders/edit/${order._id}`}>
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
        </>
      )}
    </>
  );
};

export default Orders;
