import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { getCategories } from "../services";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-white py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              ColomboToDo
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          <Link href={"/contact/form"}>
            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
              Contact
            </span>
          </Link>
          <Link href={"/addevent/new"}>
            <span className="md:float-right mt-2 align-middle text-red-600 ml-4 font-semibold cursor-pointer">
              Add Event
            </span>
          </Link>
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
