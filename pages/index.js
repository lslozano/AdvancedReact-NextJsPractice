import Head from "next/head";
import Layout from "../components/Layout";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTAIN__CLIENTS__PER__SELLER = gql`
  query obtainClientsPerSeller {
    obtainClientsPerSeller {
      id
      name
      lastName
      company
      email
      phone
      created
      seller
    }
  }
`;

const Index = () => {
  const router = useRouter();
  // Apollo query for clients.
  // We have access to this three values:
  const { data, loading, error } = useQuery(OBTAIN__CLIENTS__PER__SELLER);

  if (loading) return "Loading...";

  // If there is no data, push to login
  if (!data.obtainClientsPerSeller) return router.push("/login");

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {!data.obtainClientsPerSeller ?
              <tr>
                <td>No clients registered.</td>
                <td>No clients registered.</td>
                <td>No clients registered.</td>
              </tr>
            :
            data.obtainClientsPerSeller.map(client => (
              <tr key={client.id}>
                <td className="border px-4 py-2">{client.name} {client.lastName}</td>
                <td className="border px-4 py-2">{client.company}</td>
                <td className="border px-4 py-2">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Index;
