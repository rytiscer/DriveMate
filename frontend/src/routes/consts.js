import BasicLayout from "../layouts/BasicLayout";
import Main from "../pages/Main/Main";
import Cars from "../pages/Cars/Cars";
import AddCar from "../pages/AddCar/AddCar";
import EditCar from "../pages/EditCar/EditCar";
import Clients from "../pages/Clients/Clients";
import Orders from "../pages/Orders/Orders";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import EditClient from "../pages/EditClient/EditClient";
import AddClient from "../pages/AddClient/AddClient";
import AddOrder from "../pages/AddOrder/AddOrder";
import Service from "../pages/Service/Service";
import EditOrder from "../pages/EditOrder/EditOrder";

export const ROUTES = {
  MAIN: "/",

  CARS: "/cars",
  NEW_CAR: "/cars/add",
  EDIT_CAR: "/cars/edit/:id",

  CLIENTS: "/clients",
  NEW_CLIENT: "/clients/add",
  EDIT_CLIENT: "/clients/edit/:id",

  ORDERS: "/orders",
  NEW_ORDER: "/orders/add",
  EDIT_ORDER: "/orders/edit/:id",

  SERVICE: "/service",

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
  {
    path: ROUTES.EDIT_CLIENT,
    Component: EditClient,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.NEW_CLIENT,
    Component: AddClient,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.NEW_ORDER,
    Component: AddOrder,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.SERVICE,
    Component: Service,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.EDIT_ORDER,
    Component: EditOrder,
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
    title: "Service notes",
    path: ROUTES.SERVICE,
  },
];
