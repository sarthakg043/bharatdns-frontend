import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthCheck } from "./firebase/authFunctions";

function Layout() {
  const navigate = useNavigate();
  const isLoading = useAuthCheck(navigate);

  return (
    <>
      <Header />
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      )}
      <>
        <Outlet />
        <Footer />
      </>
    </>
  );
}

export default Layout;
