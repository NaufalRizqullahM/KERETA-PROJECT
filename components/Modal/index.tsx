import { ReactNode } from "react";

type props = {
    children: ReactNode;
    isShow: boolean;
}

const Modal = (myProps: props) => {
    return (
        <div className={`w-dvw z-[1020] h-dvh bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center ${myProps.isShow ? 'block' : 'hidden'}`}>
            <div className="w-5/6 md:4/6 lg:w-3/6 bg-white rounded-md p-3">
                {myProps.children}
            </div>
        </div>
    )
}
export default Modal