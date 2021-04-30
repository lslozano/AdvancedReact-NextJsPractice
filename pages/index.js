import Layout from "../components/Layout";
import Client from "../components/Client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Link from "next/link";

import { OBTAIN_CLIENTS_PER_SELLER } from "../services/queries";

const newClientButtonStyles = `
  bg-blue-800 
  py-2 
  px-5 
  mt-5 
  inline-block 
  text-white 
  rounded 
  text-sm 
  hover:bg-gray-800 
  mb-3 
  uppercase 
  font-bold
`;

const Index = () => {
  const router = useRouter();

  // Apollo query for clients.
  // We have access to this three values:
  const { data, loading, error } = useQuery(OBTAIN_CLIENTS_PER_SELLER);

  if (loading) return "Loading...";

  // If there is no data, push to login
  if (data === null || data === undefined) {
    return router.push("/login");
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
        <Link href="/newclient">
          <a className={newClientButtonStyles}>New Client</a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Delete</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.obtainClientsPerSeller.map((client) => (
              <Client key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Index;
