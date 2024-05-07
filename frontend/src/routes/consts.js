import BasicLayout from "../layouts/BasicLayout";
import Main from "../pages/Main/Main";
import Cars from "../pages/Cars/Cars";
import AddCar from "../pages/AddCar/AddCar";
import EditCar from "../pages/EditCar/EditCar";
import Clients from "../pages/Clients/Clients";
import Orders from "../pages/Orders/Orders";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

export const ROUTES = {
  MAIN: "/",
  CARS: "/cars",
  NEW_CAR: "/cars/add",
  EDIT_CAR: "/cars/edit/:id",

  CLIENTS: "/clients",
  ORDERS: "/orders",
  REGISTER: "/register",
  LOGIN: "/login",
};

export const routes = [
  {
    path: ROUTES.MAIN,
    Component: Main,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.CARS,
    Component: Cars,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.NEW_CAR,
    Component: AddCar,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.EDIT_CAR,
    Component: EditCar,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.CLIENTS,
    Component: Clients,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.ORDERS,
    Component: Orders,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.REGISTER,
    Component: Register,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.LOGIN,
    Component: Login,
    Layout: BasicLayout,
  },
];

export const navigationBarLinks = [
  {
    title: "Home",
    path: ROUTES.MAIN,
  },
  {
    title: "Cars",
    path: ROUTES.CARS,
  },
  {
    title: "Clients",
    path: ROUTES.CLIENTS,
  },
  {
    title: "Orders",
    path: ROUTES.ORDERS,
  },
  {
    title: "Register",
    path: ROUTES.REGISTER,
  },
  {
    title: "Login",
    path: ROUTES.LOGIN,
  },
];
