import React from 'react'
import { useRecoilState } from "recoil";

const Modal = () => {

    const [isOpen, setIsOpen] = useRecoilState(modalState);

    return (
        
        <div>
            Modal
        </div>
    )
}

export default Modal
