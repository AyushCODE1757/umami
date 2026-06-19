import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

export default function Modal({children, open, className}){
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }
        return () => modal.close();
    }, [open])
    return createPortal(
    <dialog ref={dialog} className={`
        fixed inset-0 m-auto
        w-11/12 max-w-md
        bg-linear-to-br from-stone-900 via-stone-950 to-stone-900
        border border-teal-500/20 rounded-3xl p-6
        shadow-2xl text-stone-100
        backdrop:bg-stone-950/80 backdrop:backdrop-blur-xs
        ${className}
      `}>
      {children}  
    </dialog>, document.getElementById('modal'));
}