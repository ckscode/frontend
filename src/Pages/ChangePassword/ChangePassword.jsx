import React, { useState } from 'react';
import useRedirectLoggedOutUser from '../../CustomHook/useRedirectLoggedOutUser';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { changePassword } from '../../Services/authService';
import Loader from '../../Components/Loader/Loader';
import { AuthContainer, AuthPage } from '../auth/auth';

const ChangePassword = () => {
    useRedirectLoggedOutUser('/login');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const passwordCriteria = {
        lowercase: { regex: /(?=.*[a-z])/, message: 'at least one lowercase letter' },
        uppercase: { regex: /(?=.*[A-Z])/, message: 'at least one uppercase letter' },
        digit: { regex: /(?=.*\d)/, message: 'at least one digit' },
        specialChar: { regex: /(?=.*[@$!%*?&])/, message: 'at least one special character (@$!%*?&)' },
        minLength: { regex: /.{8,}/, message: 'a minimum length of 8 characters' },
      };
      
      const passwordValidation = Yup.string()
        .test('password-strength', 'Password does not meet criteria', function (value) {
          const missingCriteria = [];
          Object.values(passwordCriteria).forEach(({ regex, message }) => {
            if (!regex.test(value || '')) {
              missingCriteria.push(message);
            }
          });
          if (missingCriteria.length) {
            return this.createError({
              message: `Password is weak. Missing criteria: ${missingCriteria.join(', ')}`,
            });
          }
          return true;
        });
    
      const validationSchema = Yup.object().shape({
        oldpassword:Yup.string().required('current password is required'),
        password:passwordValidation,
        newPassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('New Password is required'),
      })

      const formik = useFormik({
        initialValues:{
          oldpassword:"",
          password:"",
          newPassword:""
        },
        validationSchema,
        onSubmit:async(values) =>{
          try{
            const formData ={
                    "oldPassword":values.oldpassword,
                    "newPassword":values.newPassword                
            }
          
            // console.log(resetToken)
            setIsLoading(true)
            const response = await changePassword(formData);
            setIsLoading(false);
            navigate("/edit-profile");
          }catch(error){
               setIsLoading(false)  
               toast.error(error)
          }
        }
       })
    return (
        <>
            <AuthPage>
            <AuthContainer>
       <h2 className="mb-4 fw-bold text-center">Change Password</h2>
       {isLoading && <Loader/>}
       <form onSubmit={formik.handleSubmit}>
       <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
               name="oldpassword"
                placeholder="Old Password"
                value={formik.values.oldpassword}
                onChange={formik.handleChange}
            />
                               {formik.touched.oldpassword && formik.errors.oldpassword ? (
         <label className='error text-danger'><small>{formik.errors.oldpassword}</small></label>
        ) : null}
          </div>
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
         <label className='error text-danger'><small>{formik.errors.password}</small></label>
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
              <label className='error text-danger'><small>{formik.errors.newPassword}</small></label>
             ) : null}
          </div>
            <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary mb-3 rounded-5 w-100">
              Change Password
            </button>
            <br/>
          </form>
          </AuthContainer>
          </AuthPage>
       </>
    );
};

export default ChangePassword;