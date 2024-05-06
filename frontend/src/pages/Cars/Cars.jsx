import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import { fetchCars } from "../../api/cars";

const Cars = () => {
  const [cars, setCars] = useState([]);

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

  return (
    <Grid container spacing={2}>
      {cars.map((car) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={car._id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={car.img}
              title={`${car.brand} ${car.model}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {car.brand} {car.model}
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
              <Button size="small">Edit</Button>
              <Button size="small" color="error">
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cars;
