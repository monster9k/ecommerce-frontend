import React, { useState } from "react";

import { loginUserApi } from "../utils/api";
import { Link } from "react-router-dom";

// với Ant Design v5
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const checkValidInput = () => {
    let isValid: boolean = true;
    let arrInput: (keyof FormData)[] = ["email", "password"];
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
      const { email, password } = formData;
      try {
        let response = await loginUserApi(email, password);

        if (response?.data?.result?.success === true) {
          localStorage.setItem(
            "access_token",
            response.data.result.access_token
          );
          notification.success({
            message: "Login Successfully",
            description: response.data.result.message,
            placement: "topRight",
          });
          //

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          notification.error({
            message: "Login Failed",
            description: response?.data?.result?.message,
            placement: "topRight",
          });
          // alert("Register failed: " + response?.data?.result?.message);
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
                Login
              </button>
            </form>

            <p className="text-center mt-4">
              Not a member?
              <Link to="/register" className="text-dark  fw-bold">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
