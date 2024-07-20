import React, { useState } from "react";
import { AuthContainer, AuthPage } from "./auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { resetPassword } from "../../Services/authService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const Reset = () => {
  const { resetToken } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const passwordCriteria = {
    lowercase: {
      regex: /(?=.*[a-z])/,
      message: "at least one lowercase letter",
    },
    uppercase: {
      regex: /(?=.*[A-Z])/,
      message: "at least one uppercase letter",
    },
    digit: { regex: /(?=.*\d)/, message: "at least one digit" },
    specialChar: {
      regex: /(?=.*[@$!%*?&])/,
      message: "at least one special character (@$!%*?&)",
    },
    minLength: { regex: /.{8,}/, message: "a minimum length of 8 characters" },
  };

  const passwordValidation = Yup.string().test(
    "password-strength",
    "Password does not meet criteria",
    function (value) {
      const missingCriteria = [];
      Object.values(passwordCriteria).forEach(({ regex, message }) => {
        if (!regex.test(value || "")) {
          missingCriteria.push(message);
        }
      });
      if (missingCriteria.length) {
        return this.createError({
          message: `Password is weak. Missing criteria: ${missingCriteria.join(
            ", "
          )}`,
        });
      }
      return true;
    }
  );

  const validationSchema = Yup.object().shape({
    password: passwordValidation,
    newPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // console.log(values)
        // console.log(resetToken)
        setIsLoading(true);
        await resetPassword(values, resetToken);
        setIsLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setIsLoading(false);
        toast.error(error);
      }
    },
  });
  return (
    <AuthPage>
      <AuthContainer>
        {isLoading && <Loader />}
        <h2 className="mb-4 fw-bold text-center">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <label className="error text-danger">
                <small>{formik.errors.password}</small>
              </label>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              name="newPassword"
              placeholder="Confirm New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <label className="error text-danger">
                <small>{formik.errors.newPassword}</small>
              </label>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-primary mb-3 rounded-5 w-100"
          >
            Reset Password
          </button>
          <br />
        </form>
        <p className="text-center">
          <Link className="text-decoration-none text-primary" to="/login">
            Login
          </Link>
        </p>
        <Link
          className="text-decoration-none position-absolute fixed-top back"
          to="/"
        >
          {" "}
          <BsArrowLeftCircle className="back" />
        </Link>
      </AuthContainer>
    </AuthPage>
  );
};

export default Reset;
