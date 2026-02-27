import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import "../globals.css";
import { getAuthenticatedUser } from "../admin/lib/getAuthenticatedUser";

export  default async function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  console.log('user from layout wrapper', user)
  return (
    <div className="flex justify-center ">
      <div className="min-h-screen max-w-375  mx-auto flex flex-col  ">
        <Header user={user}/>
        <main className="overflow-x-hidden md:mb-10 mb-6 min-h-screen  bg-white/90 ">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
