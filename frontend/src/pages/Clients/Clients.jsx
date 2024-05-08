// import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import MainButton from "../../components/Button/MainButton";
import styles from "./Clients.module.scss";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { fetchClients, deleteClient } from "../../api/clients";
import { getCarById } from "../../api/cars";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [carNames, setCarNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {!isAuthenticated && (
        <div className={styles.errorMessage}>Please log in to view clients</div>
      )}
      {isAuthenticated && (
        <>
          <div className={styles.clientsTopContainer}>
            <div className={styles.topRight}>
              <h1>Clients</h1>
              <TextField
                className={styles.searchField}
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/clients/add">
              <MainButton className={styles.addButton}>Add Client</MainButton>
            </Link>
          </div>
          <Grid container spacing={2}>
            {filteredClients.map((client, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={client._id}>
                <Card sx={{ maxWidth: 400 }}>
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
      )}
    </>
  );
};

export default Clients;
