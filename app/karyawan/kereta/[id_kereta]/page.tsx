import { getServerCookie } from "@/helper/server-cookies";
import { KeretaType } from "../../pelanggan/type";
import axiosInstance from "@/helper/api";
import Gerbong from "./Gerbong";
import AddGerbong from "./addGerbong";

/** function to call detail kereta
 * that include gerbong dan kursi
 */

const getDetailKereta = async (
    id_kereta: string
): Promise<KeretaType | null> => {
    try {
        /**get token from cookie */
        const TOKEN = await getServerCookie(`token`)
        const url = `/train/${id_kereta}`
        /**hit endpoint */
        const response: any = await axiosInstance
            .get(url, {
                headers: {
                    authorization: `Bearer ${TOKEN}`
                }
            })
        if (response.data.success == true) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.log(error);
        return null

    }
}

type Props = {
    params: {
        id_kereta: string
    }
}

const DetailKeretaPage = async (
    myProps: Props
) => {
    // get value of selected "id_kereta"
    const id_kereta = myProps.params.id_kereta
    /** get data from backend */
    const dataKereta =
        await getDetailKereta(id_kereta)
    return (
        <div className="w-full p-3">
            {
                dataKereta == null ?
                    <div className="bg-yellow-100 rounded-md p-3">
                        <h1 className="text-lg font-semibold">
                            Informasi
                        </h1>
                        <p className="text-sm text-slate-500">
                            Data kereta tidak ditemukan
                        </p>
                    </div> :
                    <div>
                        <h1 className="text-lg font-semibold">
                            {dataKereta.name}
                        </h1>
                        <p className="text-sm">
                            {dataKereta.descriptions}
                        </p>
                        <h2 className="text-base font-medium">
                            Daftar Gerbong

                        </h2>

                        <AddGerbong  id_kereta={Number(id_kereta)} />

                        <div className="my-5">
                            {
                                dataKereta.wagons.map((gerbong, index) => (
                                    <Gerbong item={gerbong}
                                        key={`gerbong-${index}`}
                                    />
                                ))
                            }
                        </div>

                    </div>
            }
        </div>
    )

}

export default DetailKeretaPage