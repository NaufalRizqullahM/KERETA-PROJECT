import { ScheduleType } from "@/app/karyawan/pelanggan/type"
import Link from "next/link"

type Props = {
    item: ScheduleType
}

export const showTime = (date: string) => {
    const currentDate = new Date(date)
    return currentDate
        .toLocaleTimeString(`id-ID`, {
            year: "numeric",
            month: "long",
            day: "2-digit"
        })
}

const Schedule = async (myProps: Props) => {
    return (
        <div className="flex flex-wrap w-full border rounded-md shadow-md my-2">
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Berangkat Dari
                </small>
                <strong>{myProps.item.departured_location}</strong>
                <small className="text-xs font-semibold text-sky-700">
                    Waktu Keberangkatan
                </small>
                <strong>{showTime(myProps.item.departured_time)}</strong>
            </div>
            <div className="w-full md:w-3/12 p-3 flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Tiba Di
                </small>
                <strong>{myProps.item.arrived_location}</strong>
                <small className="text-xs font-semibold text-sky-700">
                    Waktu Kedatangan
                </small>
                <strong>{showTime(myProps.item.arrived_time)}</strong>
            </div>
            <div className="w-full md:w-4/12 p-3  flex flex-col">
                <small className="text-xs font-semibold text-sky-700">
                    Unit Kereta
                </small>
                <strong>{myProps.item.train_details.name}</strong>
                <small className="text-xs font-semibold text-sky-700">
                    Price
                </small>
                <strong>{myProps.item.price.toLocaleString(`en-US`, { style: `currency`, currency: `IDR` })}</strong>
            </div>
            <div className="w-full md:w-2/12 p-3 flex flex-col">
                <small className="text-sm font-semibold text-sky-600">
                    Opsi
                </small>
                <Link href={`/pelanggan/jadwal/${myProps.item.id}`}>
                    <button className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white">
                        Pesan
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Schedule