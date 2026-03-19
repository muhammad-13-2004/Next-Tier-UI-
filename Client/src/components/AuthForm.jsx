import React, { useState } from "react";
import { z } from "zod";

// Zod Schemas
const signupSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept terms",
  }),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

const AuthForm = ({ mode = "signup" }) => {
  const isSignup = mode === "signup";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const schema = isSignup ? signupSchema : loginSchema;

    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Form Submitted:", result.data);
    }
  };

  return (
    <div className="w-[380px] bg-white p-6 rounded-xl shadow-md">
      
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-1">
        {isSignup ? "Start Your Journey!" : "Welcome Back!"}
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <span className="text-green-500 cursor-pointer">Sign in</span>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <span className="text-green-500 cursor-pointer">Sign up</span>
          </>
        )}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Name Fields (Signup only) */}
        {isSignup && (
          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                name="firstName"
                placeholder="John"
                onChange={handleChange}
                className="w-full p-3 rounded-full bg-gray-100 outline-none"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                onChange={handleChange}
                className="w-full p-3 rounded-full bg-gray-100 outline-none"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="johnDoe123@gmail.com"
            onChange={handleChange}
            className="w-full p-3 rounded-full bg-gray-100 outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="••••••••••"
            onChange={handleChange}
            className="w-full p-3 rounded-full bg-gray-100 outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        {/* Terms (Signup only) */}
        {isSignup && (
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="terms"
              onChange={handleChange}
            />
            <p className="text-gray-500">
              I Agree To The Terms Of Service And The Privacy Policy
            </p>
          </div>
        )}

        {errors.terms && (
          <p className="text-red-500 text-xs">{errors.terms}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-full"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-gray-400 text-sm">Or</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full border py-3 rounded-full flex items-center justify-center gap-2"
        >
          <img
            src="https://via.placeholder.com/20"
            alt="google"
          />
          <span className="text-gray-600">Continue With Google</span>
        </button>

      </form>
    </div>
  );
};

export default AuthForm;