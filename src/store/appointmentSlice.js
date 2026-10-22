import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../services/api";

// Helper function to load initial state from localStorage (fallback)
const loadLocalState = () => {
  const savedAppointments = localStorage.getItem("hospitalAppointments");
  return savedAppointments ? JSON.parse(savedAppointments) : [];
};

// 1. Fetch appointments from MongoDB backend
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`);
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 2. Create appointment in MongoDB backend
export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      if (!res.ok) throw new Error("Failed to save appointment in database");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// 3. Cancel appointment in MongoDB backend
export const cancelAppointmentApi = createAsyncThunk(
  "appointments/cancelAppointmentApi",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });
      if (!res.ok) throw new Error("Failed to cancel appointment");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: loadLocalState(),
    loading: false,
    error: null,
  },
  reducers: {
    // Synchronous fallback actions
    addAppointment: (state, action) => {
      const newAppointment = {
        ...action.payload,
        id: Date.now(),
        status: "Confirmed",
      };
      state.list.unshift(newAppointment);
      localStorage.setItem("hospitalAppointments", JSON.stringify(state.list));
    },
    cancelAppointment: (state, action) => {
      const targetId = action.payload;
      const appointment = state.list.find(
        (appt) => (appt._id || appt.id) === targetId
      );
      if (appointment) {
        appointment.status = "Cancelled";
        localStorage.setItem("hospitalAppointments", JSON.stringify(state.list));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        localStorage.setItem("hospitalAppointments", JSON.stringify(action.payload));
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        localStorage.setItem("hospitalAppointments", JSON.stringify(state.list));
      })
      // Cancel
      .addCase(cancelAppointmentApi.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex(
          (appt) => (appt._id || appt.id) === (updated._id || updated.id)
        );
        if (index !== -1) {
          state.list[index] = updated;
        }
        localStorage.setItem("hospitalAppointments", JSON.stringify(state.list));
      });
  },
});

export const { addAppointment, cancelAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
