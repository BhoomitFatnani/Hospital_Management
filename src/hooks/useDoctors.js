import { useEffect, useState } from "react";

function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorData = [
      {
        id: 1,
        name: "Dr. Rahul Sharma",
        specialization: "Cardiologist",
        experience: "12 Years Experience",
        icon: "👨‍⚕️",
      },
      {
        id: 2,
        name: "Dr. Priya Mehta",
        specialization: "Dermatologist",
        experience: "8 Years Experience",
        icon: "👩‍⚕️",
      },
      {
        id: 3,
        name: "Dr. Amit Patel",
        specialization: "Orthopedic",
        experience: "10 Years Experience",
        icon: "👨‍⚕️",
      },
      {
        id: 4,
        name: "Dr. Neha Kapoor",
        specialization: "Pediatrician",
        experience: "7 Years Experience",
        icon: "👩‍⚕️",
      },
      {
        id: 5,
        name: "Dr. Arjun Verma",
        specialization: "Neurologist",
        experience: "15 Years Experience",
        icon: "👨‍⚕️",
      },
      {
        id: 6,
        name: "Dr. Sneha Rao",
        specialization: "Gynecologist",
        experience: "9 Years Experience",
        icon: "👩‍⚕️",
      },
    ];

    const timer = setTimeout(() => {
      setDoctors(doctorData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const search = searchTerm.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(search) ||
      doctor.specialization.toLowerCase().includes(search)
    );
  });

  return {
    doctors: filteredDoctors,
    searchTerm,
    setSearchTerm,
    loading,
  };
}

export default useDoctors;