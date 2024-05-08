import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MainButton from "../../components/Button/MainButton";
import styles from "../Cars/Cars.module.scss";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../../api/cars";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [selectedGearboxType, setSelectedGearboxType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = checkAuthentication(); // Patikriname autentifikaciją
    setIsAuthenticated(isAuthenticated); // Nustatome autentifikacijos būseną
  }, []);

  useEffect(() => {
    const getCars = async () => {
      try {
        const carData = await fetchCars();
        setCars(carData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    getCars();
  }, []);

  const checkAuthentication = () => {
    // Gauti JWT iš saugyklos (local storage, cookies ar kt.)
    const jwt = localStorage.getItem("token");
    // Patikrinti, ar JWT yra ir ar jis teisingas (galbūt patikrinimas serverio pusėje)
    return jwt ? true : false;
  };

  const handleDeleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );
    if (confirmDelete) {
      try {
        await deleteCar(carId);
        setCars(cars.filter((car) => car._id !== carId));
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  const handleFilterByFuelType = (e) => {
    setSelectedFuelType(e.target.value);
  };

  const handleFilterByGearboxType = (e) => {
    setSelectedGearboxType(e.target.value);
  };

  return (
    <>
      <div className={styles.carsTopContainer}>
        <div className={styles.topRight}>
          <h1>Cars</h1>
          <select value={selectedFuelType} onChange={handleFilterByFuelType}>
            <option value="">All fuel types</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select
            value={selectedGearboxType}
            onChange={handleFilterByGearboxType}
          >
            <option value="">All gearbox types</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <Link to="/cars/add">
          {isAuthenticated && <MainButton>Add Car</MainButton>}
        </Link>
      </div>
      <Grid container spacing={2}>
        {cars
          .filter((car) =>
            selectedFuelType ? car.fuelType === selectedFuelType : true
          )
          .filter((car) =>
            selectedGearboxType ? car.gearbox === selectedGearboxType : true
          )
          .map((car) => (
            <Grid item xs={12} md={6} lg={4} key={car._id}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={car.img}
                  title={`${car.brand} ${car.model}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.brand} {car.model} {car.carId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Year: {car.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Color: {car.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Gearbox: {car.gearbox}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type: {car.carType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fuel: {car.fuelType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {car.price}$
                  </Typography>
                </CardContent>
                <CardActions>
                  {isAuthenticated && (
                    <Link to={`/cars/edit/${car._id}`}>
                      <Button size="small">Edit</Button>
                    </Link>
                  )}
                  {isAuthenticated && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteCar(car._id)}
                    >
                      Delete
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Cars;
