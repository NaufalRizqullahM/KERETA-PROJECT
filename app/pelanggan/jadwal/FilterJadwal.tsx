"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    departured_location: string;
    arrived_location: string;
}

const FilterJadwal = (myProp: Props) => {
    const [departured_location, setDepartured_location] = 
    useState<string>("");
    const [arrived_location, setArrived_location] = 
    useState<string>("");

    const router = useRouter()
    const handleSearch = () => {
        if(departured_location !== "" && 
            arrived_location !== "") {
            router.push(`/pelanggan/jadwal?departured_location=${departured_location}&arrived_location=${arrived_location}`)
        }
    }

    // useEffect digunakan untuk
    // update data saat komponen ini
    // dimuat ulang

    useEffect(() => {
        setDepartured_location(myProp.departured_location);
        setArrived_location(myProp.arrived_location);
    },[myProp])
    return (
        <div className="my-5 w-full flex flex-wrap items-center">
                    <div className="w-full md:w-1/2 p-3">
                        <strong className="font-semibold text-white">
                            Stasiun Asal
                        </strong>
                        <input type="text" id={`departured_location`}
                            className="w-full border p-2 rounded-sm"
                            value={departured_location}
                            onChange={e => setDepartured_location(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-3">
                        <strong className="font-semibold text-white">
                            Stasiun Tujuan
                        </strong>
                        <input type="text" id={`arrived_location`}
                            className="w-full border p-2 rounded-sm"
                            value={arrived_location}
                            onChange={e => setArrived_location(e.target.value)}
                        />
                    </div>

                    <button type="button" 
                    onClick={() => handleSearch()}
                    className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white">
                        Cari Kereta
                    </button>
                </div>
    )
}
export default FilterJadwal;