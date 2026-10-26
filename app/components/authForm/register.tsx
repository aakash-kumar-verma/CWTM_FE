"use client";

import React, { useEffect, useState } from "react";
import { registerUser } from "@/app/api/api";
import Input from "../input/Input";
import Button from "../input/Button";
import { useFormik } from "formik";
import { z } from "zod";
import { REGISTER_INITIAL_VALUES } from "./constants";
import {
  EMAIL_REGEX,
  INVALID_EMAIL,
  INVALID_NAME,
  INVALID_PASSWORD,
  PASSWORD_REGEX,
} from "../utils/constants";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().trim().min(2, { message: INVALID_NAME }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(EMAIL_REGEX, {
      message: INVALID_EMAIL,
    }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(PASSWORD_REGEX, {
      message: INVALID_PASSWORD,
    }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [isUserRegisteredSuccessfully, setIsUserRegisteredSuccessfully] =
    useState(false);
  const formik = useFormik<RegisterFormValues>({
    initialValues: REGISTER_INITIAL_VALUES,
    validate: (values) => {
      const result = registerSchema.safeParse(values);
      if (result.success) {
        return {};
      }
      const errors: Partial<Record<keyof RegisterFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterFormValues;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      });
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await registerUser(values);
        setIsUserRegisteredSuccessfully(true);
        console.log("Registration result:", result);
      } catch (error) {
        console.error("Registration failed:", error);
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
        <div>
          <Input
            label="Name"
            id="name"
            name="name"
            className="flex flex-col"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputClassName="shadow-sm rounded-sm"
            labelClassName="mb-1 text-sm"
            placeholder="Enter your name"
          />

          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            id="email"
            name="email"
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

        <div>
          <Input
            type="password"
            id="password"
            name="password"
            className="flex flex-col"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            inputClassName="shadow-sm rounded-sm"
            labelClassName="mb-1 text-sm"
            placeholder="Enter your password"
          />

          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-xs text-red-600 break-words">
              {formik.errors.password}
            </p>
          )}
        </div>

        <Button
          label="Register"
          className="w-full rounded bg-indigo-600 px-4 py-1 text-white"
          disabled={formik.isSubmitting}
          loading={formik.isSubmitting}
          type="submit"
        />
        <Link
          href="/auth/login"
          className="bg-white rounded text-black text-sm py-1 w-full flex items-center justify-center"
        >
          Login
        </Link>
        {isUserRegisteredSuccessfully && (
          <div className="text-green-900 text-xs">
            User registered successfully. &nbsp;&nbsp;
            <Link href={"/auth/login"} className="text-blue-600">
              Login
            </Link>
          </div>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
