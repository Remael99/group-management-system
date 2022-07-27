import { formatRelative, subDays } from "date-fns";
import React from "react";
import { numberWithCommas } from "../../utils/comma_number";

type GroupInfo = {
  createdAt: String;
  group_account_no: number;
  group_id: String;
  group_mpesa_account: String;
  group_mpesa_paybill: String;
  group_name: String;
  group_total_balance: String;
  id: number;
  total_contributions: number;
  total_disbursements: number;
  total_users: number;
  updatedAt: String;
};

type Group = {
  group: GroupInfo;
};

export default function Group({ group }: Group) {
  return (
    <div className="w-[80%] h-full grid grid-row-3  ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="block px-4 py-1 h-36 w-52 bg-white sm:rounded-md border border-gray-200  hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700 dark:text-white">
            Contributions
          </h5>
          <div className="flex items-center">
            <p className="font-bold text-xl text-gray-800 dark:text-gray-400 mt-2 ">
              {numberWithCommas(group.total_contributions)} Ksh
            </p>
            <span className="font-bold text-sm text-green-500 px-2 pt-3">
              +4.2%
            </span>
          </div>
          <p className="text-slate-600">
            as at {""}
            {formatRelative(new Date(Number(group.createdAt)), new Date())}
          </p>
        </div>
        <div className="block p-6 max-w-sm bg-white sm:rounded-md border border-gray-200  hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Disbursements
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {numberWithCommas(group.total_disbursements)} Ksh
          </p>
        </div>
        <div className="block p-6 max-w-sm bg-white sm:rounded-md border border-gray-200  hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            members
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {group.total_users}
          </p>
        </div>
      </div>
    </div>
  );
}
