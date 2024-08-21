import './App.css'
import './PatientPage.css'
import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import routes from "./routes";
// import NameField from './NameField';
// import QuickSearch from './QuickSearch';
// import Save from './SaveInfo'


const App: React.FC = () => {
  return (
    <div>
      <Nav Fillerword='bob' />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;
