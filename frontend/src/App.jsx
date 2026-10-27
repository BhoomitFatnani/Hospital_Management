import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DockerVerification from "./components/DockerVerification";

function App() {
  const getPageFromHash = () => {
    const hash = window.location.hash;

    if (hash === "#doctors") return "doctors";
    if (hash === "#appointments") return "appointments";
    if (hash === "#login") return "login";
    if (hash === "#dashboard") return "dashboard";
    if (hash === "#docker") return "docker";

    return "home";
  };

  const [page, setPage] = useState(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <Navbar />

      {page === "doctors" && <Doctors />}
      {page === "appointments" && <Appointments />}
      {page === "login" && <Login />}
      {page === "dashboard" && <Dashboard />}
      {page === "docker" && <DockerVerification />}
      {page === "home" && <Home />}
    </>
  );
}

export default App;
