import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MainButton from "../../components/Button/MainButton";
import styles from "./Clients.module.scss";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { fetchClients, deleteClient } from "../../api/clients";
import { getCarById } from "../../api/cars";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [carNames, setCarNames] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = await fetchClients();
        setClients(clientData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    const fetchCarNames = async () => {
      try {
        const names = await Promise.all(
          clients.map(async (client) => {
            const carName = await getCarName(client.carId);
            return carName;
          })
        );
        setCarNames(names);
      } catch (error) {
        console.error("Error fetching car names:", error);
      }
    };

    fetchCarNames();
  }, [clients]);

  const handleDeleteClient = async (clientId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (confirmDelete) {
      try {
        await deleteClient(clientId);
        setClients(clients.filter((client) => client._id !== clientId));
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  const getCarName = async (carId) => {
    try {
      const carData = await getCarById(carId);
      if (carData && carData.brand && carData.model) {
        return `${carData.brand} ${carData.model}`;
      } else {
        return "No Car Assigned";
      }
    } catch (error) {
      console.error("Error fetching car name:", error);
      return "Unknown Car";
    }
  };

  return (
    <>
      <div className={styles.clientsTopContainer}>
        <div className={styles.topRight}>
          <h1>Clients</h1>
        </div>
        <Link to="/clients/add">
          <MainButton>Add Client</MainButton>
        </Link>
      </div>
      <Grid container spacing={2}>
        {clients.map((client, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={client._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {client.name} {client.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {client.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {client.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Driving Experience: {client.driving_experience} years
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Car:{" "}
                  {carNames[index] !== undefined
                    ? carNames[index]
                    : "No Car Assigned"}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`/clients/edit/${client._id}`}>
                  <Button size="small">Edit</Button>
                </Link>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteClient(client._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Clients;
