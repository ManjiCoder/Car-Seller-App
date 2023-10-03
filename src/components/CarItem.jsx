import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import PaginationInfo from "./PaginationInfo";

import { MdPeople } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";

function CarItem() {
  const { cars, totalCars } = useSelector((state) => state.cars);
  const { q } = useSelector((state) => state.search);

  return (
    <section className="flex flex-col gap-y-7 pb-7">
      <SearchBar />
      {/* Cars Container */}
      <div
        className={`grid ${
          cars.length !== 0 && "grid-cols-3"
        } text-gray-600 justify-center gap-7`}
      >
        {cars.length === 0 && (
          <h2 className="text-xl font-bold">No Cars found related to {q}</h2>
        )}

        {cars.map((car) => {
          const {
            id,
            imgUrl,
            title,
            modelYear,
            seatingCapacity,
            fuelType,
            transmission,
            distancePerLiter,
            price,
          } = car;
          return (
            <div
              key={id}
              className="shadow-lg pt-3 px-3 max-w-lg mx-auto rounded-3xl bg-gray-100"
            >
              <Image
                height={200}
                width={200}
                className="hover:scale-[1.029] transition-transform ease-in-out duration-300 h-72 w-full bg-blue-50 rounded-3xl object-cover bg-center bg-no-repeat"
                src={imgUrl}
                alt={title}
                loading="lazy"
              />

              <div className="p-5 flex flex-col gap-y-4">
                <div className="flex justify-between space-x-2  items-center font-semibold">
                  <h1 className="text-2xl  ">{title}</h1>
                  <h3 className="text-base border-4 border-blue-400 border-dotted rounded-3xl px-4">
                    {modelYear}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <IconWithName
                    icon={<MdPeople />}
                    name={`${seatingCapacity} people`}
                  />
                  <IconWithName icon={<LuFuel />} name={fuelType} />
                  <IconWithName
                    icon={<BsSpeedometer />}
                    name={`${distancePerLiter}Km/1-liter`}
                  />
                  <IconWithName
                    icon={<GiSteeringWheel />}
                    name={transmission}
                  />
                </div>

                <hr className="h-[1.5px] bg-gray-300 border-0" />

                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-extrabold flex items-center justify-center">
                    ${price}
                    <sub className="font-semibold mx-2">/ month</sub>
                  </h1>
                  <button className="bg-blue-100 p-1.5 rounded-lg shadow-sm hover:bg-blue-200">
                    <AiOutlineHeart className="text-blue-500 text-xl" />
                  </button>

                  <button
                    type="button"
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full px-5 py-2 text-center text-sm"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {totalCars && cars.length !== 0 && <PaginationInfo />}
    </section>
  );
}

export default CarItem;

function IconWithName({ icon, name }) {
  return (
    <div className="flex space-x-2 items-center">
      <span className="text-xl text-blue-500">{icon}</span>
      <span>{name}</span>
    </div>
  );
}
