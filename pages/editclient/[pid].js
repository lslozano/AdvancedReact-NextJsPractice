import React from "react";
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';

import Layout from "../../components/Layout";

import { OBTAIN_CLIENT } from '../../services/queries';

const EditClient = () => {
  const router = useRouter();

  // Obtain the id of the client that comes from the url parameter
  const {
    query: { id },
  } = router;

  // Query to obtain client
  const { data, loading, error } = useQuery(OBTAIN_CLIENT, {
    variables: { id }
  });

  if (loading) return "Loading...";

  // If there is no data, push to login
  if (data === null || data === undefined) {
    return router.push("/");
  }

  console.log(data);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-med px-8 pt-6 pb-8 mb-4"
            // onSubmit={formik.handleSubmit}
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
                // value={formik.values.name}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
            </div>

            {/* {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null} */}

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
                // value={formik.values.lastName}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
            </div>

            {/* {formik.touched.lastName && formik.errors.lastName ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null} */}

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
                // value={formik.values.company}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
            </div>

            {/* {formik.touched.company && formik.errors.company ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.company}</p>
              </div>
            ) : null} */}

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
                // value={formik.values.email}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
            </div>

            {/* {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null} */}

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
                // value={formik.values.phone}
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditClient;
