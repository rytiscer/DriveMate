// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import Orders from "../pages/Orders/Orders";
import BasicLayout from "../layouts/BasicLayout";
// import AuthLayout from "../layouts/AuthLayout";
// import Order from "../pages/Order/Order";
// import NewOrder from "../pages/NewOrder/NewOrder";
// import Hotels from "../pages/Hotels/Hotels";
// import NewHotel from "../pages/NewHotel/NewHotel";
import Main from "../pages/Main/Main";
import Cars from "../pages/Cars/Cars";
import AddCar from "../pages/AddCar/AddCar";

export const ROUTES = {
  MAIN: "/",
  CARS: "/cars",
  NEW_CAR: "/cars/add",
  //   REGISTER: "/register",
  //   ORDERS: "/orders",
  //   NEW_ORDER: "/orders/new",
  //   ORDER: "/orders/:id",
  //   HOTELS: "/hotels",
  //   NEW_HOTEL: "/hotels/new",
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
  //   {
  //     path: ROUTES.REGISTER,
  //     Component: Register,
  //     Layout: AuthLayout,
  //   },
  //   {
  //     path: ROUTES.ORDERS,
  //     Component: Orders,
  //     Layout: BasicLayout,
  //   },
  //   {
  //     path: ROUTES.ORDER,
  //     Component: Order,
  //     Layout: BasicLayout,
  //   },
  //   {
  //     path: ROUTES.NEW_ORDER,
  //     Component: NewOrder,
  //     Layout: BasicLayout,
  //   },
  //   {
  //     path: ROUTES.HOTELS,
  //     Component: Hotels,
  //     Layout: BasicLayout,
  //   },
  //   {
  //     path: ROUTES.NEW_HOTEL,
  //     Component: NewHotel,
  //     Layout: BasicLayout,
  //   },
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
];
