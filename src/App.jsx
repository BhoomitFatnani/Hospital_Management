import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import Login from "./components/Login";

function App() {
  const getPageFromHash = () => {
    const hash = window.location.hash;

    if (hash === "#doctors") return "doctors";
    if (hash === "#appointments") return "appointments";
    if (hash === "#login") return "login";

    return "home";
  };

  const [page, setPage] = useState(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange
      );
    };
  }, []);

  return (
    <>
      <Navbar />

      {page === "doctors" && <Doctors />}
      {page === "appointments" && <Appointments />}
      {page === "login" && <Login />}
      {page === "home" && <Home />}
    </>
  );
}

export default App;