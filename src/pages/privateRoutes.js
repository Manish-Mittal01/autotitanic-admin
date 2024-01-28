import Dashboard from "./SideTabs/Dashboard/Index";
import AddContest from "./SideTabs/ManageContest/AddContest/AddContest";
import ManageContest from "./SideTabs/ManageContest/Index";
import AddManageUser from "./SideTabs/ManageUsers/Add/Index";
import ManageUsers from "./SideTabs/ManageUsers/Index";
import Vehicles from "./SideTabs/Reports/Index";
import UserContest from "./SideTabs/UserContest/Index";
import CountryAndCity from "./SideTabs/countries";
import MakeAndModel from "./SideTabs/makeAndModel/Index";
import VehicleDetails from "./SideTabs/vehicleDetails";
import ContentPage from "./contentPage";

const privateRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/manage-users", component: <ManageUsers /> },
  { path: "/manage-users/add", component: <AddManageUser /> },
  { path: "/manage-users/edit/:id", component: <AddManageUser /> },
  { path: "/user-contest", component: <UserContest /> },
  { path: "/manage-contest", component: <ManageContest /> },
  { path: "/manage-contest/add", component: <AddContest /> },
  { path: "/manage-contest/edit/:id", component: <AddContest /> },
  { path: "/make", component: <MakeAndModel /> },
  { path: "/country", component: <CountryAndCity /> },
  { path: "/inventory", component: <Vehicles /> },
  { path: "/contentPage", component: <ContentPage /> },
  { path: "/details/:id", component: <VehicleDetails /> },
];

export default privateRoutes;
