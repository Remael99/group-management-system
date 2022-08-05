import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="max-w-lg w-[400px] shadow rounded-md h-[400px] bg-white flex flex-col gap-2">
      <div className="flex items-center justify-center h-[100px]  ">
        <img
          className="w-44  object-cover hover:animate-bounce hover:transition-all "
          src="/image/maendeleo-logo.png"
          alt="logo"
        />
      </div>
      <form className="w-full h-[200px] flex flex-col justify-between px-2 py-1 gap-y-6 ">
        <input
          type="email"
          placeholder="email"
          className="w-full p-2 placeholder:text-sm placeholder:font-bold  shadow  border border-gray-200 rounded  focus:border-green-400 focus:outline-none  focus:ring-2 focus:ring-green-400 focus:ring-opacity-30 "
        />
        <input
          type="password"
          placeholder="password"
          className="w-full p-2 placeholder:text-sm placeholder:font-bold shadow border border-gray-200 rounded  focus:border-green-400 focus:outline-none  focus:ring-2 focus:ring-green-400 focus:ring-opacity-30 "
        />
        <button className="w-full bg-green-600 text-white rounded  py-2 hover:bg-green-500 shadow">
          Login
        </button>
      </form>
      <div className="w-full  flex flex-col  px-2 py-1 gap-y-6 items-end">
        <Link href="/forgot-password">
          <a className="font-bold text-sm text-blue-500">forgot password ? </a>
        </Link>
      </div>
    </div>
  );
}
