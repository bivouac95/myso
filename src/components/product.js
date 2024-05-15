// import path from "../images/pic (1).jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./components css/product.css";

function short(number) {
  return Math.trunc(number * 10) / 10;
}

export function Product({ product }) {
  const [id, setId] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/current")
      .then((response) => response.json())
      .then((data) => setId(data.id));
  }, []);

  let [isOpen, setOpen] = useState();

  let reviews = product.reviews;
  let avg_rating = reviews.length > 0 ?
    reviews.reduce(
      (accumulator, review) => accumulator + Number(review.mark),
      0
    ) / reviews.length : 0;

  function favourite() {
    setOpen(!isOpen);
  }

  function buy() {
    setOpen(!isOpen);
  }

  async function cart() {
    const porofiles_data = await fetch("http://localhost:3001/profiles").then((response) => {
      return response.json();});
    const cart = porofiles_data.find((profile) => profile.id == id).cart;
    cart.push(product.id);
    console.log(cart);

    await fetch("http://localhost:3001/profiles/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "cart": cart,
      }),
    })
    alert("Товар добавлен в корзину!");
    setOpen(!isOpen);
  }

  return (
    <div className="product relative">
      <div
        className={`absolute h-min w-min right-0 top-0 bg-myblack ${
          isOpen ? "block" : "hidden"
        }  z-30 py-5 rounded-lg`}
      >
        <div
          className=" flex w-full h-[53px] justify-center items-center cursor-pointer hover:bg-mylight-gray"
          onClick={() => setOpen(!isOpen)}
        >
          <p className=" text-nowrap text-2xl text-center px-5 h-min ">
            Закрыть
          </p>
        </div>

        <div
          className=" flex w-full h-[53px] justify-center items-center cursor-pointer hover:bg-mylight-gray"
          onClick={() => cart()}
        >
          <p className=" text-nowrap text-2xl text-center px-5 h-min ">
            Добавить в корзину
          </p>
        </div>

        <div
          className=" flex w-full h-[53px] justify-center items-center cursor-pointer hover:bg-mylight-gray"
          onClick={() => buy()}
        >
          <p className=" text-nowrap text-2xl text-center px-5 h-min ">
            Купить в один клик
          </p>
        </div>

        <div
          className=" flex w-full h-[53px] justify-center items-center cursor-pointer hover:bg-mylight-gray"
          onClick={() => favourite()}
        >
          <p className=" text-nowrap text-2xl text-center px-5 h-min ">
            Добавить в избранное
          </p>
        </div>
      </div>

      <div
        className="round-button round-button__black absolute right-5 top-5"
        onClick={() => setOpen(!isOpen)}
      >
        <img src="/images/svg/dots.svg" alt="._." />
      </div>
      <Link to={`/product/${product.id}`}>
        <img src={product.img} alt="._." className="product__image" />
      </Link>
      <div className=" w-full flex justify-between mt-5 text-2xl text-nowrap">
        <div className=" flex gap-5">
          <p className=" product__title cursor-pointer overflow-hidden hover:max-w-[none] hover:bg-myblack hover:z-10 hover:absolute hover:px-5 hover:py-1 hover:rounded-lg">
            {product.title}
          </p>
          <p className=" flex gap-1 items-center">
            {" "}
            {short(avg_rating)}{" "}
            <img className=" w-3 h-3" src="/images/svg/star.svg" alt="._." />
          </p>
        </div>
        <p>{product.price} ₽</p>
      </div>
    </div>
  );
}
