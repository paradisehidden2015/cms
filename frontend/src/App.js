import { Route, Routes, useRoutes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import routes from "./Routes";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        {router}
      </div>
    </>
  );
}

export default App;
