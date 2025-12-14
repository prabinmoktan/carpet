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
        <div className="flex justify-center p">

        


        <div className="min-h-screen max-w-[1500px] w-full mx-auto flex flex-col  ">
            <Header/>
            <main >
                {children}
            </main>
            <Footer/>
        </div>
        </div>
    )
}