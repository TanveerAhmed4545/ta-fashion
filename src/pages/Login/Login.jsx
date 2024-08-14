import Lottie from "lottie-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaGoogle } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import signInAnimation from "../../assets/animation/signInAnimation.json";
const Login = () => {
  // show password
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-0 lg:ml-10">
          <h1 className="text-5xl font-bold mb-5">Login Now</h1>
          <div className=" max-w-[500px] md:max-w-md lg:max-w-[570px]  ">
            <Lottie
              className="w-full"
              animationData={signInAnimation}
              loop={true}
            />
          </div>
        </div>
        <div className="card  shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form className="card-body pb-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 font-semibold pt-2">
                  This Email field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full input input-bordered"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute top-4 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash></FaEyeSlash>
                  ) : (
                    <IoMdEye></IoMdEye>
                  )}
                </span>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#0EB1EA] text-white">Login</button>
            </div>
          </form>
          <div className="px-8 pt-6">
            <button
              //  onClick={() => handleSocialLogin(googleLogin)}
              className="btn bg-blue-600 border-none text-white w-full"
            >
              <FaGoogle></FaGoogle>
              Google
            </button>
          </div>

          <div className="text-center py-5">
            <p>
              Do not have an account ?{" "}
              <Link className="text-[#0EB1EA] font-bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
