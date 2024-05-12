import { Link } from "react-router-dom";
import image from "../../assets/bmw_logo.png";

const Main = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: "1" }}>
        <h1>Welcome to DriveMate</h1>
        <p>
          DriveMate is an internal system designed for a car rental company to
          streamline the car rental process. This web application allows
          managing cars, clients, orders, and service events in one place.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Car Management:</strong> Ability to view, add, edit, and
            delete cars.
          </li>
          <li>
            <strong>Client Management:</strong> Manage client data, add new
            clients, edit or delete existing ones.
          </li>
          <li>
            <strong>Order Management:</strong> Create new orders, view, edit, or
            delete existing orders. Each order assigns a car to a client, and
            the rental price is calculated based on the period the client plans
            to rent the car.
          </li>
          <li>
            <strong>Car Service:</strong> Register service events, such as
            technical inspections or oil changes. This helps track the technical
            condition of cars and plan future maintenance work.
          </li>
        </ul>

        <h2>Explore DriveMate</h2>
        <ul>
          <li>
            <Link to="/cars">View Cars</Link>
          </li>
          <li>
            <Link to="/clients">Manage Clients</Link>
          </li>
          <li>
            <Link to="/orders">Manage Orders</Link>
          </li>
          <li>
            <Link to="/services">Car Services</Link>
          </li>
        </ul>
      </div>
      <div style={{ flex: "1", textAlign: "right" }}>
        <img src={image} alt="DriveMate Image" style={{ maxWidth: "100%" }} />
      </div>
    </div>
  );
};

export default Main;
