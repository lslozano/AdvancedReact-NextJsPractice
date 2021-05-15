import React from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import Layout from "../../components/Layout";
import Error from '../../components/Error';

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
  
  const validationSchemaForValueFields = Yup.object({
    name: Yup.string().required("The name of the client is required."),
    lastName: Yup.string().required("The last name of the client is required."),
    company: Yup.string().required("The company is required."),
    email: Yup.string()
    .email("Not a valid email.")
    .required("The email of the client is required."),
  });

  if (loading) return "Loading...";

  const { obtainClient } = data;

  // Modify client in DB
  const updateClientInfoWith = async values => {
    const { name, lastName, company, email, phone } = values;

    try {
      const { data } = await updateClient({
        variables: { 
          id,
          input: { 
            name,
            lastName,
            company,
            email,
            phone,
          },
        },
      });

      Swal.fire('Edit successful!', 'The client information was updated.', 'success')

      router.push('/');
    } catch (error) {
      console.log(error);

      // To do: Set message on input if something went wrong.
    }
  };

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
              updateClientInfoWith(values)
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </div>

                  <Error touched={props.touched.name} error={props.errors.name} />

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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.lastName}
                    />
                  </div>

                  <Error touched={props.touched.lastName} error={props.errors.lastName} />

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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.company}
                    />
                  </div>

                  <Error touched={props.touched.company} error={props.errors.company} />

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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />
                  </div>

                  <Error touched={props.touched.email} error={props.errors.email} />

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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
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
