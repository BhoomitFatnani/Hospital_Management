import { createSlice } from "@reduxjs/toolkit";

// Helper function to load initial state from localStorage
const loadState = () => {
  const savedAppointments = localStorage.getItem("hospitalAppointments");
  return savedAppointments ? JSON.parse(savedAppointments) : [];
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: loadState(),
  },
  reducers: {
    addAppointment: (state, action) => {
      const newAppointment = {
        ...action.payload,
        id: Date.now(),
        status: "Confirmed",
      };
      
      // Redux Toolkit uses Immer under the hood, allowing "mutations" like .push()
      state.list.push(newAppointment);
      localStorage.setItem("hospitalAppointments", JSON.stringify(state.list));
    },
    cancelAppointment: (state, action) => {
      // action.payload will be the appointment ID
      const appointment = state.list.find((appt) => appt.id === action.payload);
      if (appointment) {
        appointment.status = "Cancelled";
        localStorage.setItem("hospitalAppointments", JSON.stringify(state.list));
      }
    },
  },
});

export const { addAppointment, cancelAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;