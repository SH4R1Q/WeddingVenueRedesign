import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgetPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Please enter your email!'),
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, 'OTP must be 6 digits')
      .required('Please enter the OTP!'),
  });

  const resetSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your new password!'),
  });

  const formik = useFormik({
    initialValues: { email: '', otp: '', newPassword: '' },
    validationSchema: step === 'email' ? emailSchema : step === 'otp' ? otpSchema : resetSchema,
    onSubmit: async (values) => {
      if (step === 'email') {
        setEmail(values.email);
        console.log(email);
        setOtp("123456");
        setMessage('OTP sent to your email.');
        setStep('otp');
      } else if (step === 'otp') {
        if (values.otp === otp) {
          setMessage('OTP verified. Set your new password.');
          setStep('reset');
        } else {
          setMessage('Invalid OTP.');
        }
      } else if (step === 'reset') {
        setNewPassword(values.newPassword);
        console.log(newPassword);
        setMessage('Password reset successfully!');
        setStep('email');
      }
    },
  });

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      <div className="bg-white shadow-lg p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {step === 'email' && 'Forgot Password'}
          {step === 'otp' && 'Verify OTP'}
          {step === 'reset' && 'Reset Password'}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {step === 'email' && (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-2 text-sm text-red-500">{formik.errors.email}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Send OTP
              </button>
            </>
          )}

          {step === 'otp' && (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter the OTP"
                />
                {formik.touched.otp && formik.errors.otp && (
                  <p className="mt-2 text-sm text-red-500">{formik.errors.otp}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Verify OTP
              </button>
            </>
          )}

          {step === 'reset' && (
            <>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-4 py-2 border ${
                    formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter new password"
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="mt-2 text-sm text-red-500">{formik.errors.newPassword}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
        {message && <p className="mt-4 text-sm text-green-600 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
