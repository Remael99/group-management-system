import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Group from "../components/homepage/group";

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
      total_users
      total_contributions
      total_disbursements
      createdAt
      updatedAt
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(GET_GROUP_INFO);

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

  console.log(group);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 px-1">
      <Head>
        <title>Maendelo Chama</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Group group={group} />
    </div>
  );
};

export default Home;
