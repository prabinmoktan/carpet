import AdminHeader from "./AdminLayout/AdminHeader";
import Sidebar from "./AdminLayout/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col  overflow-hidden w-full min-h-screen h-screen">
        <header className="w-full h-16">
          <AdminHeader />
        </header>
        <section className="flex h-[calc(100vh-4rem)] overflow-hidden">
          <aside className="w-72  shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1  overflow-scroll max-w-400 bg-color ">
            {children}
          </main>
        </section>
      </div>
    </>
  );
}
