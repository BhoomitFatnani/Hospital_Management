import { useEffect, useState } from "react";

function useAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments =
      localStorage.getItem("hospitalAppointments");

    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "hospitalAppointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      status: "Confirmed",
    };

    setAppointments((previousAppointments) => [
      ...previousAppointments,
      newAppointment,
    ]);

    return newAppointment;
  };

  const cancelAppointment = (id) => {
    setAppointments((previousAppointments) =>
      previousAppointments.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: "Cancelled",
            }
          : appointment
      )
    );
  };

  return {
    appointments,
    addAppointment,
    cancelAppointment,
  };
}

export default useAppointments;