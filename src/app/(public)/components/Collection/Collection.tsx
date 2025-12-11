import React from "react";
import Badge from "../../ui/Badge/Badge";
import { products } from "@/app/constant";
import ProductCard from "../ProductCard/ProductCard";

const Collection = () => {
  return (
    <>
      <div>
        <div className="flex justify-center gap-8 flex-wrap">

        {products?.map((product) => (
            <Badge
            key={product.id}
            title={product.category}
            variant={"default"}
            />
        ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => {
            return (
              <div key={product.id} className="px-6">
                <ProductCard
                  image={product.image}
                  price={product.price}
                  id={""}
                  name={product.name}
                  category={product.category}
                  isNew={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Collection;
