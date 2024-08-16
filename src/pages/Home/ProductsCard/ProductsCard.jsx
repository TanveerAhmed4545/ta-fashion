/* eslint-disable react/prop-types */
import moment from "moment";
import { BiCategory } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { IoMdStar } from "react-icons/io";

const ProductsCard = ({ product }) => {
  const {
    CreationDateTime,
    Description,
    ProductImage,
    ProductName,
    Price,
    Ratings,
    Category,
    BrandName,
  } = product;

  // Format the CreationDateTime using Moment.js
  const formattedDateTime = moment(CreationDateTime).format(
    "MMMM Do YYYY, h:mm A"
  );
  return (
    <div>
      <div className="card  h-full p-4 bg-base-100 border-[#e7f6fd] border-2 hover:border-none hover:shadow-xl hover:shadow-[#e7f6fd] transition duration-300 ease-in-out">
        <div className="relative">
          <figure>
            <img
              className="h-80 md:h-96 lg:h-96 w-full rounded-xl"
              src={ProductImage}
            />
          </figure>
          <button className="absolute top-3 right-3 flex justify-center gap-1 items-center  px-2 py-1 text-white rounded-xl bg-[#0EB1EA]">
            {Ratings}
            <IoMdStar />
          </button>
        </div>
        <div className="mt-3">
          <h2 className="card-title hover:text-[#0EB1EA]">{ProductName}</h2>
          <p className="flex items-center my-3">
            <span className="text-[#0EB1EA] mr-2 text-lg ">
              <BiCategory />
            </span>{" "}
            <span className="font-semibold">{Category}</span>
          </p>
          <p className="flex items-center my-3">
            <span className="font-semibold mr-2 text-lg ">Brand :</span>{" "}
            <span className="font-semibold">{BrandName}</span>
          </p>

          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-xs md:text-base font-semibold">
              <span>
                <FaClock className="text-[#0EB1EA] " />
              </span>
              {formattedDateTime}
            </p>
            <p className="flex justify-center items-center text-xs md:text-base  gap-2 font-semibold">
              <HiCurrencyDollar className="text-[#0EB1EA] text-base md:text-lg" />
              {Price}
            </p>
          </div>
          <p className="my-3 font-semibold hover:text-[#0EB1EA]">
            {Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
