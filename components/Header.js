import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTAIN__USER = gql`
  query obtainUser {
    obtainUser {
      id
      name
      lastName
    }
  }
`;

const Header = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(OBTAIN__USER);

  // While loading, prevent access to data.
  if (loading) return "Loading...";

  // If there is no data, push to login
  if (!data) return router.push("/login");

  const { name, lastName } = data.obtainUser;

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  }

  const logoutButtonStyles = `
    bg-blue-800 
    w-full 
    sm:w-auto 
    font-bold 
    uppercase 
    text-xs 
    rounded 
    py-1 
    px-2 
    text-white 
    shadow-md
  `;

  return (
    <div className=" flex justify-between mb-6">
      <p className="mr-2">
        Hi {name} {lastName}.
      </p>

      <button type="button" className={logoutButtonStyles} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
