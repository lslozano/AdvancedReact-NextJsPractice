import React, { useState } from "react";
import Layout from "../components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";


import { OBTAIN_CLIENTS_PER_SELLER } from '../services/queries';
import { NEW_CLIENT } from '../services/mutations';

const NewClient = () => {

  const router = useRouter();

  const [message, setMessage] = useState(null);

  // Mutation to create new clients
  const [ newClient ] = useMutation(NEW_CLIENT, {
    // updates copy of cache with the new data coming from newClient
    update(cache, { data: { newClient } }) {
      // Obtain the object of the cache that we want to update
      const { obtainClientsPerSeller } = cache.readQuery({ query: OBTAIN_CLIENTS_PER_SELLER })

      // Rewrite cache - cache must never be modified
      // With writeQuery you can rewrite without mutating the object.
      cache.writeQuery({
        // What query you will use to modify
        // The data you will use to modify
        query: OBTAIN_CLIENTS_PER_SELLER,
        data: { 
          obtainClientsPerSeller: [...obtainClientsPerSeller, newClient]
        }
      })
    }
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("The name of the client is required."),
      lastName: Yup.string().required(
        "The last name of the client is required."
      ),
      company: Yup.string().required("The company is required."),
      email: Yup.string()
        .email("Not a valid email.")
        .required("The email of the client is required."),
    }),
    onSubmit: async (values) => {
      const { name, lastName, company, email, phone } = values;

      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastName,
              company,
              email,
              phone
            }
          }
        });

        console.log(data);
        router.push("/");
      } catch (error) {
        setMessage(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          setMessage(null);
        }, 1500);
      }
    },
  });

  const showMessage = () => {
    return (
      <div className="bg-red-100 w-full mt-5 p-2 text-center mx-auto">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <Layout>
      
      <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form className="bg-white shadow-med px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="First name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.name && formik.errors.name ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.lastName && formik.errors.lastName ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.lastName}</p>
                </div>
              ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company"
              >
                Company
              </label>
              <input
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="company"
                type="text"
                placeholder="Company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.company && formik.errors.company ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.company}</p>
                </div>
              ) : null}

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
                type="text"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
              <input
                type="submit"
                className={message ? "bg-red-100 w-full mt-5 p-2 upperacase" : "bg-gray-800 w-full mt-5 p-2 text-white upperacase font-bold hover:bg-gray-900"}
                value={message ? message : 'Register client'}
              />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
