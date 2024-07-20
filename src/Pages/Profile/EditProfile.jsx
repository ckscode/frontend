import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  SET_NAME,
  SET_USER,
} from "../../redux/features/auth/authSlice";
import Loader from "../../Components/Loader/Loader";
import { FormContainer } from "../../Components/Product/ProductForm/Form.styled";
import { getUserProfile, UpdateUser } from "../../Services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../CustomHook/useRedirectLoggedOutUser";

const EditProfile = () => {
  useRedirectLoggedOutUser("/login");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  useEffect(() => {
    const getUser = async () => {
      const data = await getUserProfile();
      await dispatch(SET_USER(data.data));
    };
    getUser();
    setProfile(user);
  }, [dispatch, user]);

  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //handle image upload
      let imageUrl;
      if (
        (profileImage && profileImage.type === "image/jpeg") ||
        profileImage.type === "image/jpg" ||
        profileImage.type === "image/png"
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dhfuqnra4");
        image.append("upload_preset", "lkxbmdpv");

        //first save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dhfuqnra4/image/upload",
          {
            method: "post",
            body: image,
          }
        );
        const imgData = await response.json();
        // imageUrl = imgData.url.toString()
        const getTransformedImageUrl = (url, width, height) => {
          const parts = url.split("/");
          parts.splice(6, 0, `w_${width},h_${height},c_fill`); // Add transformations
          return parts.join("/");
        };

        const originalUrl =
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1625770649/sample.jpg";
        imageUrl = getTransformedImageUrl(imgData.url.toString(), 800, 800);
        toast.success("Image Uploaded Successfully")
      }
      //Save Profile
      const formData = {
        name: profile.name,
        contact: profile.contact,
        bio: profile.bio,
        photo: profileImage ? imageUrl : profile.photo,
      };
      const data = await UpdateUser(formData);
      toast.success("User Updated");
      navigate("/profile");

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="row">
      <FormContainer className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
        {isLoading && <Loader />}
        <div className="w-100">
          <img className="w-100" src={user?.photo} alt="profilepic" />
        </div>
        <p>
          <label htmlFor="image" className="form-label">
            Photo
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            name="image"
            onChange={handleImageChange}
          />
        </p>
        <form onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                value={profile?.email}
                disabled
              />

              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label htmlFor="contact" className="form-label">
                Phone
              </label>
              <input
                type="text"
                name="contact"
                id="contact"
                className="form-control"
                value={profile?.contact}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={profile?.bio}
                className="form-control"
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>

            <div>
              <button className="btn btn-primary mb-3">Edit Profile</button>
            </div>
          </span>
        </form>
        <p className="mb-0">
          <Link to="/changePassword" className="text-primary">
            Change Password?
          </Link>
        </p>
      </FormContainer>
    </div>
  );
};

export default EditProfile;
