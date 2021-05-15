import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";

import Layout from "../../components/Layout";

import { OBTAIN_CLIENT } from "../../services/queries";
import { UPDATE_CLIENT } from "../../services/mutations";

const EditClient = () => {
  const router = useRouter();

  // Obtain the id of the client that comes from the url parameter
  const {
    query: { id },
  } = router;

  // Query to obtain client
  const { data, loading, error } = useQuery(OBTAIN_CLIENT, {
    variables: { id },
  });

  // Set up the update client mutation
  const [updateClient] = useMutation(UPDATE_CLIENT);

  if (loading) return "Loading...";

  // If there is no data, push to home
  if (data === null || data === undefined) {
    return router.push("/");
  }

  const { obtainClient } = data;

  const validationSchemaForValueFields = Yup.object({
    name: Yup.string().required("The name of the client is required."),
    lastName: Yup.string().required("The last name of the client is required."),
    company: Yup.string().required("The company is required."),
    email: Yup.string()
      .email("Not a valid email.")
      .required("The email of the client is required."),
  });

  // Modify client in DB
  const updateClientInfoWithNew = async values => {
    const { name, lastName, company, email, phone } = values;
    console.log(name, lastName, company, email, phone);
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchemaForValueFields}
            enableReinitialize
            initialValues={obtainClient}
            onSubmit={(values) => {
              updateClientInfoWithNew(values)
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-med px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
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
                      value={props.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.name && props.errors.name ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
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
                      value={props.lastName}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.lastName && props.errors.lastName ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.lastName}</p>
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
                      value={props.company}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.company && props.errors.company ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.company}</p>
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
                      value={props.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>

                  {props.touched.email && props.errors.email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
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
                      value={props.phone}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white upperacase font-bold hover:bg-gray-900"
                    value="Edit client"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditClient;
