'use client';
import Footer from "./layout/Footer/Footer"
import Header from "./layout/Header/Header"
import '../globals.css';

export default function LayoutWrapper({
    children
}: {
    children: React.ReactNode
}){
    return(
        <div className="flex justify-center ">

        


        <div className="min-h-screen max-w-[1500px]  mx-auto flex flex-col  ">
            <Header/>
            <main className="overflow-x-hidden md:mb-10 mb-6 min-h-screen py-10 mt-10 ">
                {children}
            </main>
            <Footer/>
        </div>
        </div>
    )
}