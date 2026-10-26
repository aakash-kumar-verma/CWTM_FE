"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { z } from "zod";

import Button from "../input/Button";
import Input from "../input/Input";
import { login, loginWithGoogle } from "@/app/api/api";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../input/GoogleLoginButton";
import { useBoolVariation } from "@launchdarkly/react-sdk";

const loginInitialValues = {
  email: "",
  password: "",
};

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const showRememberMe = useBoolVariation("display-rememberme", false);
  const showForgotPassword = useBoolVariation("display-forgot-password", false);
  const router = useRouter();
  const formik = useFormik<LoginFormValues>({
    initialValues: loginInitialValues,

    validate: (values) => {
      const result = loginSchema.safeParse(values);

      if (result.success) {
        return {};
      }

      const errors: Partial<Record<keyof LoginFormValues, string>> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormValues;

        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });

      return errors;
    },

    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Call your login API here.
        const result = await login(values);
        console.log("Login result:", result);
        router.replace("/dashboard");
        router.refresh();
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
    };
  }, []);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid gap-y-5 rounded bg-gray-300 px-12 py-20">
        {/* Email */}
        <div>
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            className="flex flex-col"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputClassName="shadow-sm rounded-sm"
            labelClassName="mb-1 text-sm"
            placeholder="Enter your email"
          />

          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            className="flex flex-col"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputClassName="shadow-sm rounded-sm"
            labelClassName="mb-1 text-sm"
            placeholder="Enter your password"
          />

          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Remember me / Forgot password */}
        <div className="flex items-center justify-between">
          {showRememberMe && (
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rememberme" name="rememberme" />
              <label htmlFor="rememberme" className="text-sm">
                Remember me
              </label>
            </div>
          )}
          {showForgotPassword && (
            <Link
              href="/auth/forgot-password"
              className="text-sm text-indigo-700"
            >
              Forgot Password?
            </Link>
          )}
        </div>

        <Button
          label="Sign in"
          className="w-full rounded bg-indigo-600 px-4 py-1 text-white"
          type="submit"
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
        />

        <div className="text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold text-blue-700">
            Sign up
          </Link>
        </div>
        <GoogleLoginButton onClick={loginWithGoogle} />
      </div>
    </form>
  );
};

export default LoginForm;
