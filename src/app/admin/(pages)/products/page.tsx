import Button from "@/app/(public)/ui/Button/Button";
import ProductForm from "./components/ProductForm";
import { Plus } from "lucide-react";
import ProductData from "./components/ProductData";



const Page = () => {
 

  return (
    <>
    <Button title={"Add Products"} variant={"primary"} firstIcon={<Plus/>} />
      <section className="flex flex-col px-5">

      {/* <ProductForm/> */}
      <ProductData/>
      </section>
    </>
  );
};

export default Page;
