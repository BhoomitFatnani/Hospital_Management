import { useEffect, useState } from "react";
import Home from "./Home";
import Doctors from "./Doctors";
import Appointments from "./Appointments";
import Login from "./Login";

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
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (page === "doctors") {
    return <Doctors />;
  }

  if (page === "appointments") {
    return <Appointments />;
  }

  if (page === "login") {
    return <Login />;
  }

  return <Home />;
}

export default App;