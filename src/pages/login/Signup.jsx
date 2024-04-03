import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCheck } from "../../firebase/authFunctions";
import { logup } from "../../firebase/authFunctions";

function Signup() {
  const navigate = useNavigate();
  const isLoading = useAuthCheck(navigate);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogup = async (e) => {
    e.preventDefault();
    logup(email, password, navigate);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      )}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Sign up
              </h2>
              <p className="mt-2 text-base text-gray-400">
                Already have an account?
                <span className="ml-1 font-medium text-white transition-all duration-200 hover:underline">
                  <Link to="/signin">Signin</Link>
                </span>
              </p>
              <form onSubmit={handleLogup} className="mt-8">
                {/* Your signup form fields */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="form-input"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-input"
                />
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
            <img
              className="cover-img mx-auto w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
