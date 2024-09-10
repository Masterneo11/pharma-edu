import Home from "./pages/Home";
import NewRx from "./pages/NewRx";
import Patient from "./pages/PatientProfile";
import Doctors from "./pages/Doctors";
import medsprofile from "./pages/RxItem";
import newPatient from "./pages/NewPatient";
import prescriptions from "./pages/Prescriptions";

interface PharmacyRoutes {
  name: string;
  path: string;
  component: React.FC;
}

const routes: PharmacyRoutes[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Rx",
    path: "/new-rx",
    component: NewRx,
  },
  // {
  //   name: "Patients",
  //   path: "/PatientProfile",
  //   component: Patient,
  // },
  {
    name: "Patient",
    path: "/New Patient",
    component: newPatient,
  },
  {
    name: "Doctor",
    path: "/doctors",
    component: Doctors,
  },
  {
    name: "Rx Item",
    path: "/RxItem",
    component: medsprofile,
  },
  {
    name: "prescriptions",
    path: "/prescriptions",
    component: prescriptions,
  }

];

export default routes;
