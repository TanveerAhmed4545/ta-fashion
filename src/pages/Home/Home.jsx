import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductsCard from "./ProductsCard/ProductsCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  console.log(search);
  const {
    data: products = [],
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["products", search, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/Products?page=${currentPage}`,
        {
          params: {
            search,
          },
        }
      );
      return res.data;
    },
  });
  // console.log(products);

  const { data: totalCount = {} } = useQuery({
    queryKey: ["userCount"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/productCount");
      return res.data;
    },
  });

  const { count } = totalCount;
  const itemsPerPage = 9;

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];
  // console.log(count,itemsPerPage,numberOfPages,pages);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <div className="text-center py-5 mt-auto ">
        <button onClick={handlePrevPage} className=" btn btn-md mr-1">
          « Prev
        </button>
        {pages.map((page, idx) => (
          <button
            onClick={() => setCurrentPage(page)}
            key={idx}
            className={
              currentPage === page
                ? "btn btn-md btn-active mr-1"
                : "btn  btn-md mr-1"
            }
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage} className=" btn btn-md mr-1">
          Next »
        </button>
      </div>
    </div>
  );
};

export default Home;
