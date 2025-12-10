'use client';
import Footer from "./layout/Footer/Footer"
import Header from "./layout/Header/Header"

export default function LayoutWrapper({
    children
}: {
    children: React.ReactNode
}){
    return(
        <div className="flex justify-center">

        


        <div className="min-h-screen max-w-[1500px] w-full mx-auto flex flex-col bg-green-400">
            <Header/>
            <main >
                {children}
            </main>
            <Footer/>
        </div>
        </div>
    )
}