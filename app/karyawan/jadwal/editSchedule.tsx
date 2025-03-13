"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/Modal";
import { toast, ToastContainer } from "react-toastify"
import { getCookie } from "@/helper/client-cookie";
import axiosInstance from "@/helper/api";
import { ScheduleType } from "../pelanggan/type";
import DatePicker from "react-datepicker";

type props = {
    Schedule: ScheduleType
}
const editJadwal = (myProp: props) => {  
    const router = useRouter()
    const [show, setShow] = useState<boolean>(false)
    const [departured_location, setDeparturedLocation] = useState<string>("")
    const [arrived_location, setArrivedLocation] = useState<string>("")
    const [departured_time, setDeparturedTime] = useState<Date>(new Date())
    const [arrived_time, setArrivedTime] = useState<Date>(new Date())
    const [price, setPrice] = useState<number>(0)


    const openModal = () => {
        setShow(true)
        setDeparturedLocation("")
        setArrivedLocation("")
        setDeparturedTime(new Date())
        setArrivedTime(new Date())
        setPrice(0)
    }

    const closeModal = () => {
        setShow(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const TOKEN = getCookie(`token`);
            const url = `/schedule/${myProp.Schedule.id}`;
            const requestData = {
                departured_location,
                arrived_location,
                departured_time,
                arrived_time,
                price
            }
            // hit endpoint to add kereta
            const response: any = await axiosInstance.put(url, requestData, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
            console.log(response)
            const message = response.data.message
            if(response.data.success === true) {
                toast(message, {
                    containerId: `toastEdit-${myProp.Schedule.id}`, 
                    type: `success`
                })
                setShow(false)
                // reload page
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(message, {
                    containerId: `toastEdit-${myProp.Schedule.id}`, 
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something went wrong`, {containerId: `toastEdit-${myProp.Schedule.id}`, type: `success`})
        }
    }
    return (
        <div className="">
            <ToastContainer containerId={`toastEdit-${myProp.Schedule.id}`} />
            <button type="button" className="px-2 py-2 rounded-md bg-sky-600 hover:bg-sky-500 text-white" onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <Modal isShow={show}>
                <form onSubmit={handleSubmit}>
                    {/*  modal header */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Jadwal Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/*  modal body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md">
                            <small className="text-xs font-semibold test-sky-500">
                                Berangkat dari
                            </small>
                            <input type="text" id={departured_location}
                                value={departured_location}
                                onChange={e => setDeparturedLocation(e.target.value)}
                                className="p-1 outline-none w-full hover:border-b hover:border-b-sky-500"
                                required={true}
                            />
                        </div>

                        <div className="w-full p-3">
                            <div className="my-2 border rounded-md">
                                <small className="text-xs font-semibold test-sky-500">
                                    Waktu Keberangkatan
                                </small> <br/>
                                <DatePicker
                                showTimeInput={true}
                                    id={`departured_time`}
                                    className="p-1 outline-none w-full hover:border-b hover:border-b-sky-500"
                                    selected={new Date(departured_time)}
                                    dateFormat={`dd MMM yyy HH:mm`}
                                    onChange={date => setDeparturedTime(date || new Date())}
                                />
                            </div>

                            <div className="my-2 border rounded-md">
                                <small className="text-xs font-semibold test-sky-500">
                                    Tiba di
                                </small>
                                <input type="text" id={arrived_location}
                                    value={arrived_location}
                                    onChange={e => setArrivedLocation(e.target.value)}
                                    className="p-1 outline-none w-full hover:border-b hover:border-b-sky-500"
                                    required={true}
                                />
                            </div>

                            <div className="w-full p-3">
                                <div className="my-2 border rounded-md">
                                    <small className="text-xs font-semibold test-sky-500">
                                        Waktu Kedatangan
                                    </small> <br/>
                                    <DatePicker
                                    showTimeInput={true}
                                        id={`arrived_time`}
                                        className="p-1 outline-none w-full hover:border-b hover:border-b-sky-500"
                                        selected={new Date(arrived_time)}
                                        dateFormat={`dd MMM yyy HH:mm`}
                                        onChange={date => setArrivedTime(date || new Date())}
                                    />
                                </div>

                                <div className="my-2 border rounded-md">
                                    <small className="text-xs font-semibold test-sky-500">
                                        Harga
                                    </small>
                                    <input type="number" id={`price`}
                                        value={price.toString()}
                                        onChange={e => setPrice(Number(e.target.value))}
                                        className="p-1 outline-none w-full hover:border-b hover:border-b-sky-500"
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
                            onClick={() => closeModal()}>
                            Close
                        </button>
                        <button type="submit"
                            className="px-4 py-2 rounded-md bg-sky-700 hover:bg-sky-600 text-white">
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default editJadwal;