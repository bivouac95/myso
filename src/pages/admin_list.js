import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { Product } from "../components/product";
import { Header } from "../components/header";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

async function updateProfilesWithFilteredCarts(id) {
  const response = await fetch("http://localhost:3001/profiles");
  const profiles = await response.json();

  const filteredProfiles = profiles.map((profile) => {
    const filteredCart = profile.cart.filter((product) => product.id !== id);
    return {
      ...profile,
      cart: filteredCart,
    };
  });

  const stringifiedProfiles = JSON.stringify(filteredProfiles);

  const responsePut = await fetch("http://localhost:3001/profiles", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringifiedProfiles,
  });
}

export function AdminList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState({});
  const [editingProductNew, setEditingProductNew] = useState({});
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function deleteProduct(id) {
    const confirm = window.confirm(
      "Вы уверены, что хотите удалить этот продукт?"
    );
    if (!confirm) return;
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newProducts = products.filter((product) => {
        return product.id !== id;
      });
      setProducts(newProducts);
    });
    updateProfilesWithFilteredCarts(id);
  }

  function editProduct(id) {
    let product = products.find((product) => product.id == id);
    console.log(product);
    setEditingProduct({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
    });
    setOpen(!isOpen);
  }

  function handleEdit(id) {
    if (
      editingProductNew.name === "" ||
      editingProductNew.description === "" ||
      editingProductNew.img === "" ||
      editingProductNew.price === ""
    ) {
      alert("Все поля должны быть заполнены!");
      return;
    }
    const confirm = window.confirm(
      "Вы уверены, что хотите изменить этот продукт?"
    );
    if (!confirm) return;
    let newData = products.find((product) => product.id == id);
    newData.title = editingProductNew.name;
    newData.description = editingProductNew.description;
    newData.price = editingProductNew.price;
    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then(() => {
      const newProducts = products.map((product) => {
        if (product.id == id) {
          return newData;
        }
        return product;
      });
      setProducts(newProducts);
      setOpen(!isOpen);
    });
  }

  return (
    <div className=" flex items-center flex-col">
      <RunningLine />

      <div
        className={` bg-mytransblack w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-[999] items-center justify-center ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className=" w-[900px] h-min bg-myblack rounded-lg box-border p-5 flex flex-col items-center gap-10">
          <h1 className=" text-mywhite">Изменение данных</h1>
          <div className="flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите новое название товара
              </span>
              <span className=" text-wrap w-[600px] text-base text-mywhite opacity-30">{`Текущее название: ${editingProduct.name}`}</span>
              <input
                type="text"
                placeholder={editingProduct.name}
                value={editingProductNew.name}
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                onChange={(e) => {
                  setEditingProductNew({
                    ...editingProductNew,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите новое описание товара
              </span>
              <span className=" text-wrap w-[600px] text-base text-mywhite opacity-30">{`Текущее описание: ${editingProduct.description}`}</span>
              <input
                type="text"
                placeholder={editingProduct.description}
                value={editingProductNew.description}
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0 pb-10 h-[80px]"
                onChange={(e) => {
                  setEditingProductNew({
                    ...editingProductNew,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <span className=" text-wrap w-[600px] text-2xl text-mywhite">
                Введите новую цену товара
              </span>
              <span className=" text-wrap w-[600px] text-base text-mywhite opacity-30">{`Текущая цена: ${editingProduct.price} ₽`}</span>
              <input
                type="text"
                placeholder={editingProduct.price}
                value={editingProductNew.price}
                className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                onChange={(e) => {
                  setEditingProductNew({
                    ...editingProductNew,
                    price: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div
              className="button button__red min-w-[600px] "
              onClick={() => {
                handleEdit(editingProduct.id);
              }}
            >
              Применить изменения
            </div>
            <div
              className="button button__red-light min-w-[600px]"
              onClick={() => setOpen(!isOpen)}
            >
              Отменить
            </div>
          </div>
        </div>
      </div>

      <div className="infoContainer">
        <Link
          to={"/admin"}
          className=" flex flex-row gap-5 mt-10 mb-[100px] items-center"
        >
          <div className="round-button">
            <img src="/images/svg/back.svg" alt="._." />
          </div>
          <p className=" text-mywhite text-2xl">Вернуться назад</p>
        </Link>

        <main>
          <div className="products flex flex-wrap flex-row gap-5 justify-center mt-10 mb-52">
            {products.map((product) => (
              <div className="relative" key={product.id}>
                <div className="absolute top-0 w-full h-28 z-10 box-border flex p-2">
                  <div className=" w-full h-full flex flex-row box-border p-2 rounded-lg bg-myblack justify-center">
                    <img
                      className=" cursor-pointer h-full w-auto mr-5"
                      src="/images/svg/trash.svg"
                      alt="._."
                      onClick={() => deleteProduct(product.id)}
                    />
                    <img
                      className=" cursor-pointer h-full w-auto"
                      src="/images/svg/change.svg"
                      alt="._."
                      onClick={() => editProduct(product.id)}
                    />
                  </div>
                </div>
                <Product product={product} />
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
