"use client"
import { removeCookie } from "@/helper/client-cookie"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"

type props = {
    children: ReactNode
}

const EmployeeTemplate = (myProp: props) => {
    const [show, setShow] = useState<boolean>(false)
    useState<boolean>(false)

    const router = useRouter()

    const handleLogout = () => {
        //
        removeCookie(`token`)
        router.replace(`/`) //direct to login page
    }
    return (
        <div className="w-dvw">
            {/* header section */}
            <header className="flex item bg-center gap-3 w-full p-5 bg-red-700">
                <button type="button" onClick={() => setShow(true)} className="size-8 rounded-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-400 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-white">
                    Sekoplink Yoman
                </h1>
            </header>
            {/* sidebar section */}
            <div className={`w-1/2 md:w-1/3 lg:1/4 bg-green-600 h-dvh fixed top-0 transform transition-transform ${show ? "left-0" : "right-full"}`}>
                <div className="w-full relative">
                    {/* brand section */}
                    <div className="w-full my-5 flex justify-center text-white font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                        </svg>
                    </div>
                    <div className="absolute right-3 top-3 cursor-pointer text-xl font-bold " onClick={() => setShow(false)}>
                        &times;
                    </div>
                </div>
                {/* menu section */}
                <div className="w-full flex flex-col">
                    <Link href={`/karyawan/kereta`} className="w-full rounded-md text-white p-3 font-semibold hover:bg-yellow-500">
                        Data Sepor
                    </Link>
                    <Link href={`/karyawan/admin`} className="w-full rounded-md text-white p-3 font-semibold hover:bg-yellow-500">
                        Data admin
                    </Link>
                    <Link href={`/karyawan/pelanggan`} className="w-full rounded-md text-white p-3 font-semibold hover:bg-yellow-500">
                        Data pelanggan
                    </Link>
                    <Link href={`/karyawan/jadwal`} className="w-full rounded-md text-white p-3 font-semibold hover:bg-yellow-500">
                        Data Jadwal
                    </Link>
                    <div className="w-full rounded-md text-white p-3 font-semibold bg-rose-600 hover:bg-rose-500 cursor-pointer"
                    onClick={() => handleLogout()}>
                        Keluar
                    </div>
                </div>
            </div>
            {myProp.children}
        </div>
    )


}
export default EmployeeTemplate