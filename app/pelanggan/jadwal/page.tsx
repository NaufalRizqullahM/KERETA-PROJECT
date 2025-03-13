import FilterJadwal from "./FilterJadwal";
import { getServerCookie } from "@/helper/server-cookies";
import axiosInstance from "@/helper/api";
import { ScheduleType } from "@/app/karyawan/pelanggan/type";
import Schedule from "./Schedule";

// get data jadwal
const getJadwal = async (
    departured_location: string,
    arrived_location: string
): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule?departured_location=${departured_location}&arrived_location=${arrived_location}`
        const TOKEN = await getServerCookie(`token`)

        const response: any = await axiosInstance.get(url, {
            headers: {
                authorization: `Bearer ${TOKEN}`
            }
        })
        if (response.data.success == true) {
            return response.data.data
        }
        return []
    } catch (error) {
        console.log(error);
        return []

    }
}

type Props = {
    searchParams:{
        departured_location: string,
        arrived_location: string
    }
}

const JadwalPage = async (myProp: Props) => {
    const departured_location= 
    (await myProp.searchParams).departured_location?.toString() || ""
    const arrived_location= 
    (await myProp.searchParams).arrived_location?.toString() || ""

    const dataJadwal = await getJadwal(departured_location, arrived_location)
    return (
        <div className="w-full p-3">
            <div className="bg-blue-600 w-full p-3 rounded-md shadow-md">
                <h1 className="text-white text-xl font-bold">
                    Pemesanan Tiket Kereta Api
                </h1>

                <FilterJadwal
                 departured_location={departured_location}
                 arrived_location={arrived_location}/>
            </div>

            {
                departured_location !== "" && 
                arrived_location !== "" &&
                // div ini akan tampil jika departured location dan arrived location ada
                <div className="my-3">
                    {
                        dataJadwal.length == 0?
                        <div className="w-full p-3 rounded-md bg-orange-100">
                            Maaf, Jadwal tidak tersedia
                        </div>:
                        <div>
                            {
                                dataJadwal.map((jadwal, index) => (
                                    <Schedule
                                    item={jadwal}
                                    key={`keyJadwal-${index}`}
                                    />
                                ))
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default JadwalPage