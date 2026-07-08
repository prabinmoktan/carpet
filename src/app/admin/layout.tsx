import AdminHeader from "./AdminLayout/AdminHeader";
import Sidebar from "./AdminLayout/Sidebar";
import { requireAdmin } from "./lib/requireAdmin";

export default async function layout({ children }: { children: React.ReactNode }) {
 
  return (
    <>
      <div className="flex flex-col  overflow-hidden w-full min-h-screen h-screen">
        <section className="flex  overflow-hidden">
        <aside className="w-72  shrink-0">
            <Sidebar />
          </aside>
        <header className="w-full h-16">
          <AdminHeader />
          <main className="flex-1  overflow-scroll max-w-400 bg-color relative ">
            {children}
          </main>
        </header>
         
        </section>
      </div>
    </>
  );
}
