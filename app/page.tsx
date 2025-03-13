"use client";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import  axiosInstance  from "@/helper/api";
import { storeCookie } from "@/helper/client-cookie";
import { useRouter } from "next/navigation";
const LogInPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `/auth`
      const requestData = {
        username, password
      }
      //hit endpoint
      const response: any = await axiosInstance
        .post(url, requestData)

      if (response.data.succes === false) {
        let message = response.data.message
        toast(
          message, {
          type: "warning",
          containerId: `toastLogin`,
        }
        )
      } else {
        const message = response.data.message
        const token = response.data.token
        const role = response.data.role

        /** store token in cookie */
        storeCookie("token", token)

        toast(
          message,
          {
            type: "success",
            containerId: `toastLogin`
          }
        )

        if(role===`ADMIN`){
          // jika role nya admin akan langsung direct ke halaman kereta
          setTimeout (() => router.replace(`karyawan/pelanggan`)),
          1000
        } else if (role === `CUSTOMER`){
          // jika role nya customer akan langsung direct ke halaman jadwal
          setTimeout (() => router.replace(`pelanggan/history`)),
          1000
        }
      }
    } catch (error) {
      console.log(error);
      toast(`something wrong`,
        {
          containerId: `toastLogin`,
          type: "error",
        }
      )
    }
  }
  return (
    <div
      onSubmit={e => handleSubmit(e)}
      className="w-dvw h-dvh flex justify-center items-center">
      <ToastContainer
        containerId={`toastLogin`}/>
      <form className="w-5/6 md:w-1/2 p-3 border rounded-md">
        {/* login header */}
        <div className="w-full bg-blue-600 text-white p-3">
          <h1 className="text-x; font-semibold">Login</h1>
        </div>
        {/* /**login body  */}
        <div className="w-full p-5">
          <div className="mb-3">
            <span className="text-sm font-blue-600">
              Username
              <input
                type="text"
                id={username}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required={true}
                className="w-full p-2 border rounded-md" />
            </span>
          </div>
          <div className="mb-3">
            <span className="text-sm font-blue-600">
              Password
              <input
                type="password"
                id={password}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required={true}
                className="w-full p-2 border rounded-md" />
            </span>
          </div>
          <button type="submit"
            className="bg-green-600 hover:bg-green-500 text-white w-full rounded-md px-4 py-2">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LogInPage;