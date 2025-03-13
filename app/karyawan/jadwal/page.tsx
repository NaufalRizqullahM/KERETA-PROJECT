import Schedule from "./Schedule"
import { ScheduleType } from "../pelanggan/type"
import { getServerCookie } from "@/helper/server-cookies"
import axiosInstance from "@/helper/api"
import { KeretaType } from "../pelanggan/type"
import AddSchedule from "./addSchedule"

// get data jadwal
const getJadwal = async (): Promise<ScheduleType[]> => {
    try {
        const url = `/schedule`
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
const getKereta = async (): Promise<KeretaType[]> => {
    try {
        /**get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/train`

        /** hit endpoint */
        const response: any =
            await axiosInstance
                .get(url, {
                    headers: {
                        authorization: `Bearer ${TOKEN}`,
                    },
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

const jadwalPage = async () => {
    const dataJadwal = await getJadwal()
    const dataKereta = await getKereta()
    return (
        <div className="w-full p-5 bg-white">
            <h1 className="text-xl font-semibold">
                Data Jadwal
            </h1>
            <span className="text-sm text-slate-500">
                Halaman ini memuat data jadwal kereta api yang tersedia
            </span>

            <AddSchedule trains={dataKereta}/>
            <div className="my-3">
                {
                    dataJadwal.map((jadwal, index) => (
                        <Schedule key={index} item={jadwal} />
                    ))
                }
            </div>
        </div>
    )
}
export default jadwalPage
