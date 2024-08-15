import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductsCard from "./ProductsCard/ProductsCard";

const Home = () => {
  const [search, setSearch] = useState("");

  console.log(search);
  const {
    data: products = [],
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/Products`, {
        params: {
          search,
        },
      });
      return res.data;
    },
  });
  // console.log(products);

  return (
    <div>
      <div className="text-center py-8 ">
        <h2 className=" text-2xl lg:text-4xl font-extrabold">
          Discover our Latest Fashion
        </h2>
        <p className=" pt-6 w-full mx-auto lg:w-9/12">
          Explore the latest in Fashion on our platform.{" "}
        </p>
      </div>
      <div className="my-3 px-4">
        <input
          className="input input-bordered mb-3 w-full"
          type="text"
          placeholder="Search by ProductName or BrandName"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 px-4">
        {products.map((product) => (
          <ProductsCard key={product._id} product={product}></ProductsCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
