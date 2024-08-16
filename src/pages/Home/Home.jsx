import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductsCard from "./ProductsCard/ProductsCard";

const Home = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [priceRange, setPriceRange] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const categoriesData = [
    "Jackets",
    "Dresses",
    "Pants",
    "Activewear",
    "Shirts",
    "Sweaters",
    "Accessories",
    "Bags",
    "Jeans",
    "Skirts",
    "Shorts",
  ];
  const brandsData = ["Gucci", "Zara", "Nike", "Adidas", "Uniqlo", "Prada"];

  const {
    data: products = [],
    // isLoading,
    // error,
  } = useQuery({
    queryKey: [
      "products",
      search,
      currentPage,
      priceRange,
      sortBy,
      brand,
      category,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/Products?page=${currentPage}`,
        {
          params: {
            search,
            priceRange,
            sortBy,
            brand,
            category,
          },
        }
      );
      return res.data;
    },
  });
  // console.log(products);

  const { data: totalCount = {} } = useQuery({
    queryKey: ["productCount"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/productCount");
      return res.data;
    },
  });

  const { count } = totalCount;
  const itemsPerPage = 9;

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()] : [];

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

  const handleFilter = () => {
    if (minPrice && maxPrice) {
      setPriceRange(`${minPrice}-${maxPrice}`);
    } else {
      setPriceRange(""); // Reset price range if no min or max
    }
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // if (isLoading) return <div>Loading....</div>;

  return (
    <div>
      <div className="text-center py-4 md:py-8 px-4">
        <h2 className=" text-2xl lg:text-4xl font-extrabold">
          Discover our Latest Fashion
        </h2>
        <p className=" pt-3 md:pt-5 w-full mx-auto lg:w-9/12">
          Explore the latest in Fashion on our platform.{" "}
        </p>
      </div>

      <div className="flex justify-between items-center gap-2 flex-col px-4 md:flex-row ">
        {/* search */}
        <div className="  w-full">
          <input
            className="input input-bordered  w-full"
            type="text"
            placeholder="Search by ProductName or BrandName"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Brand Filter */}
        <div className="  w-full">
          <select
            onChange={(e) => setBrand(e.target.value)}
            value={brandsData}
            className="select select-bordered w-full"
          >
            <option value="">Select Brand</option>
            <option value="">All Brands</option>
            {brandsData.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="  w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="">Default Category</option>
            {categoriesData.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="mb-2 md:my-3   w-full">
          <select
            onChange={handleSortChange}
            value={sortBy}
            className="select select-bordered w-full"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="date-desc">Newest First</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center flex-col md:flex-row ">
        {/* price */}
        <div className="flex flex-col md:flex-row md:justify-center md:space-x-2 px-4 mb-4 md:mb-0 w-full">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input input-bordered rounded-md  mb-2 lg:mb-0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input input-bordered rounded-md  mb-2 lg:mb-0"
          />
          <button
            onClick={handleFilter}
            className="bg-[#0EB1EA] rounded-md text-white btn hover:bg-[#0eafeab3] border-none"
          >
            Filter
          </button>
        </div>
      </div>

      {/* products */}
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
