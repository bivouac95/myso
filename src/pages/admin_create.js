import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function AdminCreate() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState({ name: "", description: "", img: "", price: "" });
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function save(product) {
    if (product.name === "" || product.description === "" || product.img === "" || product.price === "") {
        alert("Все поля должны быть заполнены!");
        return;
    }
    let sortedIds = products
      .map((product) => Number(product.id))
      .sort((a, b) => a - b)
  
    let smallestAvailableId;

    for (let i = 0; i <= sortedIds[sortedIds.length - 1] + 1; i++) {
        if (!sortedIds.includes(i)){
            smallestAvailableId = i;
            break;
        }
    }

    const newProduct = {
      id: smallestAvailableId,
      title: product.name,
      description: product.description,
      price: product.price,
      img: product.img,
      img_others: [],
      reviews: [],
    };

    console.log(newProduct);

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => setProducts([...products, data]));
  }

  return (
    <div className=" flex items-center flex-col">
      <RunningLine />

      <div className="w-screen h-screen flex items-center justify-center">
        <div className=" w-[900px] h-min bg-myblack rounded-lg box-border p-5 flex flex-col items-center gap-10 my-28">
          <h1 className=" text-mywhite">Создание карточки товара</h1>
          <div className="flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите название товара
              </span>
              <input
                type="text"
                value={editingProduct.name}
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                onChange={(e) => {setEditingProduct({...editingProduct, name: e.target.value})}}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите описание товара
              </span>
              <input
                type="text"
                value={editingProduct.description }
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0 pb-10 h-[80px]"
                onChange={(e) => {setEditingProduct({...editingProduct, description : e.target.value})}}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите ссылку на изображение товара
              </span>
              <input
                type="text"
                value={editingProduct.img}
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                onChange={(e) => {setEditingProduct({...editingProduct, img: e.target.value})}}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите цену товара
              </span>
              <input
                type="text"
                value={editingProduct.price}
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                onChange={(e) => {setEditingProduct({...editingProduct, price: e.target.value})}}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div
              className="button button__red min-w-[600px] "
              onClick={() => {save(editingProduct);}}
            >
              Сохранить
            </div>
            <Link
              className="button button__red-light min-w-[600px]"
              to={"/admin"}
            >
              Отменить
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
