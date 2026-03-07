import React, { Suspense } from "react";
import ShopPage from "./ShopPage";

const page = () => {
  return(

  <Suspense fallback={<div>Loading...</div>}>
    <ShopPage />
  </Suspense>
  )
};

export default page;
