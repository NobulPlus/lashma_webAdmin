import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import AgencyList from "./pages/AgencyList";
import CreateAgency from "./pages/CreateAgency";
import EditAgency from "./pages/EditAgency";
import BulkUploadAgencies from "./pages/BulkUploadAgencies";
import AgentList from "./pages/AgentList";
import CreateAgent from "./pages/CreateAgent";
import EditAgent from "./pages/EditAgent";
import ProviderList from "./pages/ProviderList";
import CreateProvider from "./pages/CreateProvider";
import EditProvider from "./pages/EditProvider";
import BulkUploadProviders from "./pages/BulkUploadProviders";
import PharmacyList from "./pages/PharmacyList";
import CreatePharmacy from "./pages/CreatePharmacy";
import EditPharmacy from "./pages/EditPharmacy";
import BulkUploadPharmacies from "./pages/BulkUploadPharmacies";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
          <Route path="agencies" element={<AgencyList />} />
          <Route path="agencies/create" element={<CreateAgency />} />
          <Route path="agencies/edit/:id" element={<EditAgency />} />
          <Route path="agencies/bulk-upload" element={<BulkUploadAgencies />} />
          <Route path="agents" element={<AgentList />} />
          <Route path="agents/create" element={<CreateAgent />} />
          <Route path="agents/edit/:id" element={<EditAgent />} />
          <Route path="providers" element={<ProviderList />} />
          <Route path="providers/create" element={<CreateProvider />} />
          <Route path="providers/edit/:id" element={<EditProvider />} />
          <Route path="providers/bulk-upload" element={<BulkUploadProviders />} />
          <Route path="pharmacies" element={<PharmacyList />} />
          <Route path="pharmacies/create" element={<CreatePharmacy />} />
          <Route path="pharmacies/edit/:id" element={<EditPharmacy />} />
          <Route path="pharmacies/bulk-upload" element={<BulkUploadPharmacies />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;