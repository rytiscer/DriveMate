import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, updateService } from "../../api/service";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carId: "",
    note: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await getServiceById(id);
        setFormData(serviceData);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serviceData = await getServiceById(id);
      const currentTime = new Date().toISOString();
      const newData = {
        ...serviceData,
        status: formData.status,
        updatedAt: currentTime,
      };
      await updateService(id, newData);
      alert("Service updated successfully!");
      navigate("/services");
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Edit note status
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Service
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditService;
