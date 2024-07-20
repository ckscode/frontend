import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus } from "../Services/authService";
import { SET_LOGIN, selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);
  const getStatus = async () => {
    const status = await getLoginStatus();
    dispatch(SET_LOGIN(status));

    if (!status) {
      toast.info("session expired, please login to continue.");
      navigate(path);
      return;
    }
  };
  useEffect(() => {
    getStatus();
  }, [dispatch, path, navigate]);
};

export default useRedirectLoggedOutUser;
