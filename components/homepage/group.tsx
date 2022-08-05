import { formatRelative, subDays } from "date-fns";
import React from "react";
import { numberWithCommas } from "../../utils/comma_number";
import LineChart from "./linechart";

type GroupInfo = {
  createdAt: String;
  group_account_no: number;
  group_id: String;
  group_mpesa_account: String;
  group_mpesa_paybill: String;
  group_name: String;
  group_total_balance: String;
  id: number;
  total_contribution: number;
  total_disbursement: number;
  total_user: number;
  updatedAt: String;
  contribution_as_at: String;
  disbursement_as_at: String;
  disbursement_percentage_increase: number;
  contribution_percentage_increase: number;
};

type Group = {
  group: GroupInfo;
};

export default function Group({ group }: Group) {
  return (
    <div className="w-full h-full flex flex-col px-2 gap-3 py-2 ">
      <div className="grid row-span-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="block px-4 py-1 h-36 max-w-full w-64 bg-white sm:rounded-md shadow   hover:bg-gray-50  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700 dark:text-white">
            Total balance
          </h5>
          <div className="flex items-center">
            <p className="font-bold text-xl text-gray-800 dark:text-gray-400 mt-2 ">
              {numberWithCommas(
                group.total_contribution + group.total_disbursement
              )}{" "}
              Ksh
            </p>
            <span className="font-bold text-sm text-green-500 px-2 pt-3">
              +50%
            </span>
          </div>
          <p className="text-slate-600">
            as at {""}
            {formatRelative(
              new Date(Number(group.disbursement_as_at)),
              new Date()
            )}
          </p>
        </div>
        <div className="block px-4 py-1 h-36 max-w-full w-64 bg-white sm:rounded-md shadow   hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700 dark:text-white">
            Contributions
          </h5>
          <div className="flex items-center">
            <p className="font-bold text-xl text-gray-800 dark:text-gray-400 mt-2 ">
              {numberWithCommas(group.total_contribution)} Ksh
            </p>
            <span className="font-bold text-sm text-green-500 px-2 pt-3">
              +{group.contribution_percentage_increase}%
            </span>
          </div>
          <p className="text-slate-600">
            as at {""}
            {formatRelative(
              new Date(Number(group.contribution_as_at)),
              new Date()
            )}
          </p>
        </div>
        <div className="block px-4 py-1 h-36 max-w-full w-64 bg-white sm:rounded-md shadow   hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700 dark:text-white">
            Disbursements
          </h5>
          <div className="flex items-center">
            <p className="font-bold text-xl text-gray-800 dark:text-gray-400 mt-2 ">
              {numberWithCommas(group.total_disbursement)} Ksh
            </p>
            <span className="font-bold text-sm text-green-500 px-2 pt-3">
              +{group.disbursement_percentage_increase}%
            </span>
          </div>
          <p className="text-slate-600">
            as at {""}
            {formatRelative(
              new Date(Number(group.disbursement_as_at)),
              new Date()
            )}
          </p>
        </div>
        <div className="block px-4 py-1 h-36 max-w-full w-64 bg-white sm:rounded-md shadow   hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-700 dark:text-white">
            Members
          </h5>
          <div className="flex items-center">
            <p className="font-bold text-xl text-gray-800 dark:text-gray-400 mt-2 ">
              {numberWithCommas(group.total_user)}
            </p>
          </div>
          <p className="text-slate-600">
            as at {""}
            {formatRelative(
              new Date(Number(group.contribution_as_at)),
              new Date()
            )}
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-2">
        {/*chart*/}
        <LineChart />
        <div className=" col-span-1 w-full h-[400px] bg-white   block px-4 py-1  max-w-full   sm:rounded-md shadow  hover:bg-gray-50  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          users
        </div>
      </div>
    </div>
  );
}
