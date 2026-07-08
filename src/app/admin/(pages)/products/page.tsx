"use client";
import Button from "@/app/(public)/ui/Button/Button";
import { Plus } from "lucide-react";
import ProductData from "./components/ProductData";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <section className="flex flex-col px-5 py-2 gap-y-4">
        <Button
          title={"Add Products"}
          variant={"primary"}
          firstIcon={<Plus />}
          onClick={() => router.push("/admin/products/AddProducts")}
          className="w-46"
        />
        <ProductData/>
      </section>
    </>
  );
};

export default Page;
