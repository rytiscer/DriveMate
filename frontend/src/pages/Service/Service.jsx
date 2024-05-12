import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import MainButton from "../../components/Button/MainButton";
import { fetchServices, deleteService } from "../../api/service";
import { getCarById } from "../../api/cars";
import styles from "../Service/Service.module.scss";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    const jwt = localStorage.getItem("token");
    return jwt ? true : false;
  };

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setIsAuthenticated(isAuthenticated);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceData = await fetchServices();
        const servicesWithCarNames = await Promise.all(
          serviceData.map(async (service) => {
            const car = await getCarById(service.carId);
            return {
              ...service,
              carName: car.brand + " " + car.model,
            };
          })
        );
        setServices(servicesWithCarNames);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmDelete) {
      try {
        await deleteService(serviceId);
        setServices(services.filter((service) => service._id !== serviceId));
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleShowAll = (event) => {
    setShowAll(event.target.checked);
  };

  const filteredServices = services
    .filter((service) => (showAll ? true : service.status !== "Done"))
    .filter((service) =>
      service.carName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      {!isAuthenticated && (
        <div className={styles.errorMessage}>
          Please log in to view service notes
        </div>
      )}
      {isAuthenticated && (
        <>
          <div className={styles.servicesTopContainer}>
            <div className={styles.topRight}>
              <h1>Services</h1>
              <TextField
                className={styles.searchField}
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FormControlLabel
                className={styles.checkbox}
                control={
                  <Checkbox
                    checked={showAll}
                    onChange={handleShowAll}
                    color="primary"
                  />
                }
                label="Show All"
              />
            </div>
            <Link to="/services/add">
              <MainButton className={styles.addButton}>Add Service</MainButton>
            </Link>
          </div>
          <Grid container spacing={2}>
            {filteredServices.map((service) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
                <Card>
                  <CardContent
                    style={{
                      height: "120px",
                      overflow: "hidden",
                      backgroundColor: getStatusColor(service.status),
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      Car: {service.carName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Note: {service.note}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {service.status}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`/services/edit/${service._id}`}>
                      <Button size="small">Edit</Button>
                    </Link>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteService(service._id)}
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

const getStatusColor = (status) => {
  switch (status) {
    case "Done":
      return "rgba(119, 231, 137, 0.322)";
    case "Pending":
      return "rgba(255, 255, 0, 0.226)";
    default:
      return "white";
  }
};

export default Services;
