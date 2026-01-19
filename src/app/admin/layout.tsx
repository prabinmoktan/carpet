import AdminHeader from "./AdminLayout/AdminHeader";
import Sidebar from "./AdminLayout/Sidebar";

export default function layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col max-h-screen overflow-hidden w-full min-h-screen">
        <header className="w-full h-16">
          <AdminHeader/>
        </header>
        <section className="flex max-h-screen overflow-hidden">

        <aside className="w-72 h-[calc(100vh-4rem)] shrink-0">
          <Sidebar />
        </aside>
        <main className="flex-1 min-h-screen overflow-scroll max-w-[1600px] bg-color">{children}</main>
        </section>
      </div>
    </>
  );
};
