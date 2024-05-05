import { Routes as Switch, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

import { AuthContextProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContextProvider } from "./context/ToastContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FetchApodDataPage from "./pages/ApodDataPage.js";
import FetchApodSpecificDateRange from "./pages/ApodDateRange.js";
import FetchApodRandom from "./pages/ApodRandom.js";
import FetchMarsRoverPhotos from "./pages/MarsPhotos.js"
import FetchMarsRoverPhotosDate from "./pages/MarsPhotosDate.js";
import FetchMissionManifestData from "./pages/MissionManifestData.js";


function App() {
  return (
    <Router>
      <div style={{ minHeight: "90vh", margin: "0px", padding: "0px" }}>
        <ToastContextProvider>
          <AuthContextProvider>
            <Header />
            <Layout>
              <Switch>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/apod" element={<FetchApodDataPage />} />
                <Route path="/apodrange" element={<FetchApodSpecificDateRange />} />
                <Route path="/apodrandom" element={<FetchApodRandom />} />
                <Route path="/marssol" element={<FetchMarsRoverPhotos />} />
                <Route path="/marsearthdate" element={<FetchMarsRoverPhotosDate />} />
                <Route path="/marsmanifestdata" element={<FetchMissionManifestData />} />

              </Switch>
            </Layout>
          </AuthContextProvider>
        </ToastContextProvider>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
