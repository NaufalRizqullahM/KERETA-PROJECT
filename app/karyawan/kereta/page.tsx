// function to get all data kereta
import { KeretaType } from "../pelanggan/type";
import axiosInstance from "@/helper/api";
import { getServerCookie } from "@/helper/server-cookies";
import Train from "./Train";
import AddKereta from "./addKereta";

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
const KeretaPage = async () => {
  /** call function to load "data kereta
   * from backend
   * */
  const DataKereta = await getKereta()
  return (
    <div className="w-full p-5 bg-white">
      <h1 className="text-xl font-semibold">
        Data Kereta
      </h1>
      <span className="text-sm">
        Halaman ini memuat data kereta api yang tersedia
      </span>
      <AddKereta />
      <div className="my-3"></div>
      {/* mapping data kereta */}
      {
        DataKereta.map((kereta, index) => (
          <Train
            item={kereta}
            key={`kereta-${index}`}
          />


        ))
      }
    </div>
  )
}


export default KeretaPage