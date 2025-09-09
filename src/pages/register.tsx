import "./register.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { createUserApi } from "../utils/api";
// import { notifySuccess, notifyError } from "../utils/toast";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const checkValidInput = () => {
    let isValid: boolean = true;
    let arrInput: (keyof FormData)[] = ["username", "email", "password"];
    for (let i = 0; i < arrInput.length; i++) {
      let key = arrInput[i];
      if (!formData[key] || formData[key].trim() === "") {
        isValid = false;
        alert(`Missing parameters: ${key}`);
        break;
      }
    }
    return isValid;
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(">>check onChange", name, value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //  chặn hành vi reload mặc định của form
    if (checkValidInput()) {
      const { username, email, password } = formData;
      try {
        let response = await createUserApi(username, email, password);

        if (response?.data?.result?.success === true) {
          alert(response.data.result.message);
          navigate("/login");
        } else {
          alert(response.data.result.message);
        }
      } catch (e) {
        console.log(e);
      }
    }
    // xử lý theo cách ta muốn
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div
        className="row shadow rounded overflow-hidden"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        {/* LEFT SIDE */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="fw-bold">abc.com</h2>
          <p className="fs-5 mt-4">
            abc.com is the best place to find remote talent. <br />
            We've been super impressed by the quality of applicants.
          </p>
          <p className="mt-auto small">
            Madhushan Sasanka <br /> CEO, abc.com
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-white">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="fw-bold mb-2">Create an account</h3>
            <p className="text-muted mb-4">
              Let's get started with your 30 days free trial
            </p>

            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                />
              </div>

              <button type="submit" className="btn btn-dark w-100 mb-3">
                Create Account
              </button>
              <button className="btn btn-outline-dark w-100">
                <i className="bi bi-google me-2"></i> Sign up with Google
              </button>
            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
