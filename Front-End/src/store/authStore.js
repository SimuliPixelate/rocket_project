import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/userauth";

// ✅ Dedicated instance — withCredentials only applies to your backend
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  userregister: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/userregister", {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  userlogin: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/userlogin", { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  userlogout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/userlogout");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  userverifyemail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/userverifyemail", { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get("/checkauth");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  userforgotpassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/userforgotpassword", { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error sending reset password email",
        isLoading: false,
      });
      throw error;
    }
  },

  userresetpassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/userresetpassword/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
