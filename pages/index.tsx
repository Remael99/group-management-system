import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Group from "../components/homepage/group";
// import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Login from "./login";

const GET_GROUP_INFO = gql`
  query groupInformation {
    groupInformation {
      id
      group_id
      group_account_no
      group_mpesa_account
      group_mpesa_paybill
      group_name
      group_total_balance
      disbursement_percentage_increase
      total_contribution
      total_disbursement
      total_user
      contribution_percentage_increase
      contribution_as_at
      disbursement_as_at
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(GET_GROUP_INFO);
  const [active, setActive] = useState(false);

  if (loading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2 px-1">
        <Head>
          <title>Maendelo Chama </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full md:w-[90%] lg:w-3/4  ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              loading....
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              group information
            </p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2 px-1">
        <Head>
          <title>Maendelo Chama </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full md:w-[90%] lg:w-3/4 ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Oops!! We run into an error..
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-red-500 font-semibold">
              {error.message}
            </p>
          </div>
        </div>
      </div>
    );

  const group = data.groupInformation;

  // const { user } = useUser();
  const user = false;

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Head>
          <title>Maendelo Chama | login</title>
          <link rel="icon" href="/maendeleo.ico" />
        </Head>
        <Login />
      </div>
    );

  return (
    <div>
      <Head>
        <title>Maendelo Chama</title>
        <link rel="icon" href="/maendeleo.ico" />
      </Head>
      <div className="flex flex-col ">
        <div className="bg-white border-b border-gray-200 h-14 grid grid-cols-2 max-w-full px-2 ">
          <div className="flex items-center justify-start overflow-hidden col-span-1">
            <img
              className="w-36 h-full object-cover "
              src="/image/maendeleo-logo.png"
              alt="logo"
            />
          </div>
          <div className="flex items-center justify-end gap-4 col-span-1">
            {user ? (
              <Link href="/api/auth/logout">
                <a>
                  <button className="py-1 px-4  w-32 inline-flex items-center justify-center bg-orange-600 rounded-md shadow text-white  hover:bg-orange-500  hover:shadow-lg  ">
                    logout
                  </button>
                </a>
              </Link>
            ) : (
              <Link href="/api/auth/login">
                <a>
                  <button className="py-1 px-4 w-32 inline-flex items-center justify-center bg-green-600 rounded shadow text-white hover:bg-green-500 hover:shadow-lg  ">
                    login
                  </button>
                </a>
              </Link>
            )}

            <img
              className="w-10 h-10 rounded-full object-cover "
              src="https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              alt="profile"
            />
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-10 ">
        <div className="max-h-screen h-[700px]  col-span-2 bg-white border-r border-gray-200 px-1 py-2">
          <ul className="w-full h-full flex flex-col gap-y-2">
            <li
              onClick={() => setActive(!active)}
              className={
                active
                  ? "border-l-4  border-l-green-400 py-2 bg-green-100 bg-opacity-20 "
                  : ""
              }
            >
              Home
            </li>
          </ul>
        </div>
        <div className=" w-full flex flex-col  col-span-8 ">
          {/*group info*/}
          <Group group={group} />
        </div>
      </div>
    </div>
  );
};

export default Home;
