"use client";
import Button from "@/app/(public)/ui/Button/Button";
import { on } from "events";
import React  from "react";

interface AppModalTypes {
  title: string;
  description: string;
  onClose: ()=>void;
  onConfirm: ()=> void;
}

const AppModal: React.FC<AppModalTypes> = ({ title, description,onClose, onConfirm }) => {
  if (!open) return null;
  return (
    <>
      
        <div className="w-1/4 h-auto bg-black/30 border backdrop-blur-3xl ">
          {title}
          <p>{description}</p>
          <Button title={"Delete"} variant={"destruction"} onClick={onConfirm}/>
          <Button title={"Cancel"} variant={"default"} onClick={onClose}/>
        </div>
   
    </>
  );
};

export default AppModal;
