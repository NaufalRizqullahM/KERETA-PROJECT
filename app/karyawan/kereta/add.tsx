"use client"

import Modal from "@/components/Modal"
import { Modak } from "next/font/google"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ToastContainer } from "react-toastify"

const AddKereta = () => {
    const [name, setName] = useState<string>("")
    const [descriptions, setDescriptions] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    return (
        <div>
            <AddKereta />
            <ToastContainer containerId={`toastAdd`} />
            <button type="button"
                // onClick={() => openModal()}
                className="px-4 py-2 rounded-md bg-lime-600 hover:bg-lime-500 text-white">
                Tamba Data Kereta
            </button>
            <Modal isShow={show}>
                <form>
                    {/*  */}
                    <div className="w-full p-3 rounded-t-lg">
                        <h1 className="font-semibold text-lg">
                            Tambah Data Kereta
                        </h1>
                        <span className="text-sm text-slate-500">
                            Pastikan data yang diisi sudah benar
                        </span>
                    </div>

                    {/* Modal Body */}
                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Nama Kereta
                            </small>
                            <input type="text" id={name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>

                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Descriptions Kereta
                            </small>
                            <input type="text" id={descriptions}
                                value={descriptions}
                                onChange={(e) => setDescriptions(e.target.value)}
                                required={true}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>

                    <div className="w-full p-3">
                        <div className="my-2 border rounded-md p-3">
                            <small className="text-sm font-semibold text-sky-600">
                                Type Kereta
                            </small>
                            <input type="text" id={type}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required={true}
                                className="p-1 outline-none focus:border-b-sky-600 focus:border-b"
                            />
                        </div>
                    </div>
                    {/* modal footer */}
                    <div className="w-full p-3 rounded-b-lg flex items-center justify-end gap-2">
                        <button type="button"
                            // onClick={() => closeModal()}
                            className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white">
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
export default AddKereta