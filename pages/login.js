import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import Error from '../components/Error';

import { AUTHENTICATE_USER } from '../services/mutations';

const Login = () => {
  // routing
  const router = useRouter();

  const [message, setMessage] = useState(null);

  // Mutation to authenticate users in apollo
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("The email is not valid.")
        .required("The email is required."),
      password: Yup.string().required("The password is required."),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const { data } = await authenticateUser({
          variables: {
            input: {
              email,
              password
            }
          }
        });
        setMessage("Authenticating...");
        const { token } = data.authenticateUser;
        localStorage.setItem("token", token);
        setTimeout(() => {
          setMessage(null);
          router.push("/");
        }, 2000);
      } catch (error) {
        setMessage(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => setMessage(null), 1500);
      }
    },
  });

  return (
    <Layout>

      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="User email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Error touched={formik.touched.email} error={formik.errors.email} />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="User password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Error touched={formik.touched.password} error={formik.errors.password} />
            </div>
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900"
              value={message ? message : 'Login'}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
