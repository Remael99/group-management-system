import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import Head from "next/head";
import { numberWithCommas } from "../utils/comma_number";

const GET_USER = gql`
  query findProfileByUserId($userId: Int) {
    findProfileByUserId(user_id: $userId) {
      id
      profile_id
      first_name
      second_name
      phone_number
      id_number
      createdAt
      user {
        id
        email
        title
        profile_id
        contribution {
          id
          contribuiton_id
          amount
          createdAt
        }
        disbursement {
          id
          disbursement_id
          amount
          createdAt
        }
        group_id
        createdAt
        updatedAt
      }
    }
  }
`;

export default function Profile() {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: 1,
    },
  });

  if (loading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2 px-1">
        <Head>
          <title>Maendelo Chama | Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-white shadow overflow-hidden sm:rounded-md w-full md:w-[90%] lg:w-3/4  ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              loading....
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal user details.
            </p>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2 px-1">
        <Head>
          <title>Maendelo Chama | Profile</title>
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

  const user = data.findProfileByUserId;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 px-1">
      <Head>
        <title>Maendelo Chama | Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full md:w-[90%] lg:w-3/4  ">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            user Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal user details.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.first_name} {user.second_name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Persons ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.id_number}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.user.email}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Member title
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.user.title}
              </dd>
            </div>

            <div className="bg-gray-50  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                contributions
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200 bg-white "
                >
                  {user.user.contribution.length > 0 ? (
                    user.user.contribution.map(
                      (contribution: any, index: number) => {
                        return (
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <ArrowUpIcon
                                className="flex-shrink-0 h-5 w-5 text-green-400  rotate-45"
                                aria-hidden="true"
                              />
                              <span className="ml-4 flex-1 w-0 truncate leading-3 font-medium">
                                {numberWithCommas(contribution.amount)} Ksh
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600  hover:text-indigo-500"
                              >
                                {format(
                                  new Date(Number(user.createdAt)),
                                  "MM/dd/yyyy"
                                )}
                              </a>
                            </div>
                          </li>
                        );
                      }
                    )
                  ) : (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm text-gray-600 font-bold">
                      <span>no current contributions</span>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                disbursements
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul
                  role="list"
                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                >
                  {user.user.disbursement.length > 0 ? (
                    user.user.disbursement.map(
                      (disbursement: any, index: number) => {
                        return (
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <ArrowDownIcon
                                className="flex-shrink-0 h-5 w-5 text-orange-300 -rotate-45"
                                aria-hidden="true"
                              />
                              <span className="ml-4 flex-1 w-0 truncate leading-3 font-medium">
                                {numberWithCommas(disbursement.amount)} Ksh
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600  hover:text-indigo-500"
                              >
                                {format(
                                  new Date(Number(disbursement.createdAt)),
                                  "MM/dd/yyyy"
                                )}
                              </a>
                            </div>
                          </li>
                        );
                      }
                    )
                  ) : (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm text-gray-600 font-bold">
                      <span>no current disbursements</span>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Mpesa number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.phone_number}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
