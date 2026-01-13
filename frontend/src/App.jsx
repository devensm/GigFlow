import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowseGigs from "./pages/BrowseGigs";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import Dashboard from "./pages/Dashboard";
import MyBids from "./pages/MyBids";
import MyGigs from "./pages/MyGigs";
import socket from "./services/socket";
import { NotificationProvider } from "./context/NotificationContext";


function App() {

  useEffect(() => {
    socket.on("hired", (data) => {
      alert(data.message);
    });

    return () => {
      socket.off("hired");
    };
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={<BrowseGigs />} />
          <Route path="/gigs/:id" element={<GigDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateGig />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bids"
            element={
              <ProtectedRoute>
                <MyBids />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-gigs"
            element={
              <ProtectedRoute>
                <MyGigs />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
