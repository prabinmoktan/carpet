"use client";
import Button from "@/app/(public)/ui/Button/Button";
import { on } from "events";
import React  from "react";

interface AppModalTypes {
  title: string;
  open: boolean;
  description: string;
  onCancel: ()=>void;
  onConfirm: ()=> void;
}

const AppModal: React.FC<AppModalTypes> = ({ title, open, description,onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <>
      
        <div className="w-1/4 h-auto bg-black/20  backdrop-blur-2xl rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-5 text-center space-y-3" >
         <h1> {title}</h1>
          <p>{description}</p>
          <div className="flex justify-evenly w-full mt-5">

          <Button title={"Delete"} variant={"destruction"} onClick={onConfirm}/>
          <Button title={"Cancel"} variant={"default"} onClick={onCancel}/>
          </div>
        </div>
   
    </>
  );
};

export default AppModal;
