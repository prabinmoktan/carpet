"use client";
import React from "react";
import Badge from "../../../ui/Badge/Badge";
import { products } from "@/app/constant";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { motion } from "framer-motion";
import TitleHeader from "../../../ui/TitleHeader/TitleHeader";
import AnimateParagraph from "../../../ui/AnimateParagraph/AnimateParagraph";
import { useRouter } from "next/navigation";

const Collection = () => {
  const route = useRouter();
  
  return (
    <>
      <section className="flex flex-col space-y-5 justify-center px-3 md:px-10 ">
        <TitleHeader title="Our Collection" />

        <AnimateParagraph
          paragraph="Each piece in our collection is carefully selected for its exceptional quality and timeless beauty"
        />

        <div className="flex flex-col space-y-5">
          <div className="flex justify-center gap-8 flex-wrap">
            {products?.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Badge title={product.category} variant={"default"} />
              </motion.div>
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
                    isNew={!!product.isNew}
                    onClick={()=>route.push(`/shop/${product.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;
