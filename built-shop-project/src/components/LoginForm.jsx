import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 

const LoginForm = ({ formik }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-full md:max-w-[420px] mb-[60px]">
        <h2 className="text-[20px leading-[24px] font-bold mb-[20px] md:mb-[40px]">Prijavi se na svoj nalog</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-[46px]">
          <div className="relative">
            {formik.values.email && (
              <label
                htmlFor="email"
                className="absolute top-[-30px] left-0 text-[12px] text-gray-700"
              >
                E-mail adresa
              </label>
            )}
            <input
              id="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border-b border-black focus:outline-none focus:border-black focus:ring-0 text-[16px] leading-[28px] pb-[8px]"
              placeholder="E-mail adresa"
              autoComplete='username'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="relative">
            {formik.values.password && (
              <label
                htmlFor="password"
                className="absolute top-[-30px] left-0 text-[12px] text-gray-700"
              >
                Upišite šifru
              </label>
            )}
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full border-b border-black focus:outline-none focus:border-black focus:ring-0 text-[16px] leading-[28px] pb-[8px]"
              placeholder="Upišite šifru"
              autoComplete='current-password'
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-0 mt-1 mr-2"
            >
              {showPassword ? (
                <FiEyeOff className="h-6 w-6 text-gray-600" />
              ) : (
                <FiEye className="h-6 w-6 text-gray-600" />
              )}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className={`w-full py-3 bg-black text-white rounded-full text-lg font-semibold ${
                !(formik.isValid && formik.dirty) ? 'bg-gray-400' : 'hover:bg-gray-800'
              }`}
            >
              Prijavi se na nalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
