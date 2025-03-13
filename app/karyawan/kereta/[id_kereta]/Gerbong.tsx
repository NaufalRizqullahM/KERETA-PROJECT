import { GerbongType } from "../../pelanggan/type"
import AddSeat from "./addSeat"
import DropGerbong from "./dropGerbong"
import EditGerbong from "./editGerbong"
import Seat from "./seat"

type props = {
    item: GerbongType
}

const Gerbong = (myProps: props) => {
    return (
        <div className="w-full my-2 bg-slate-50 rounded-md shadow-md flex flex-wrap justify-between">
            <div className="p-3">
                <small className="text-xs text-sky-600">Nama Gerbong</small>
                <br />
                {myProps.item.name}
                <br />
                Jumlah Kursi: {myProps.item.seat_count}

                <div className="w-full my-2">
                    {myProps.item.seats.length == 0 ? (
                        <div>
                            <AddSeat id_kereta={myProps.item.id} />
                            <div className="bg-yellow-100 mt-2 rounded-md p-3">
                                Gerbong ini belum mempunyai kursi
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            <AddSeat id_kereta={myProps.item.id} />
                            {myProps.item.seats.map((seat, index) => (
                                <Seat item={seat} key={`keySeat-${index}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="p-3 flex gap-2">
                <EditGerbong item={myProps.item} />
                <DropGerbong item={myProps.item} />
            </div>
        </div>
    )
}
export default Gerbong