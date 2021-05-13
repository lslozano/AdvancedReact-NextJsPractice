import React from "react";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import { OBTAIN_CLIENTS_PER_SELLER } from "../services/queries";
import { DELETE_CLIENT } from "../services/mutations";

const Client = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      const { obtainClientsPerSeller } = cache.readQuery({
        query: OBTAIN_CLIENTS_PER_SELLER,
      });

      cache.writeQuery({
        query: OBTAIN_CLIENTS_PER_SELLER,
        data: {
          obtainClientsPerSeller: obtainClientsPerSeller.filter(
            (client) => client.id !== id
          ),
        },
      });
    },
  });

  const { id, name, lastName, company, email } = client;

  const fireDeleteClientModal = () => {
    Swal.fire({
      title: "Do you want to delete this client?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Delete by id
          const { data } = await deleteClient({
            variables: {
              id,
            },
          });

          // Show an alert
          Swal.fire("Deleted!", data.deleteClient, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const pushToEditClientPage = () => {
    Router.push({
      pathname: "/editclient/[id]",
      query: { id },
    });
  };

  const deleteButtonStyles = `
    flex
    justify-center
    items-center
    bg-red-800
    py-2
    px-4
    w-full
    text-white
    rounded
    text-xs
    uppercase
    font-bold
  `;

  const editButtonStyles = `
    flex
    justify-center
    items-center
    bg-green-600
    py-2
    px-4
    w-full
    text-white
    rounded
    text-xs
    uppercase
    font-bold
  `;

  return (
    <tr key={id}>
      <td className="border px-4 py-2">
        {name} {lastName}
      </td>
      <td className="border px-4 py-2">{company}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className={deleteButtonStyles}
          onClick={fireDeleteClientModal}
        >
          Delete
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className={editButtonStyles}
          onClick={pushToEditClientPage}
        >
          Edit
          <svg
            className="w-6 h-6 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;
