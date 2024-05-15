import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { Product } from "../components/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const [profiles, setProfiles] = useState([]);
  const [current, setCurrent] = useState("");
  const [products, setProducts] = useState([]);
  const [money, setMoney] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:3001/profiles")
      .then((response) => response.json())
      .then((data) => setProfiles(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/current")
      .then((response) => response.json())
      .then((data) => setCurrent(data.id));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  let [selected, setSelected] = useState([]);
  let profile =
    profiles && current
      ? profiles.find((profile) => profile.id == current)
      : {};

  console.log(
    `cart: ${profile.cart}, current: ${current}, products: ${
      products.length
    }, check: ${profile && current && products.length ? true : false}`
  );

  function manageSelection(element, id) {
    console.log(element.checked, id);
    let selected_array = [...selected];
    if (element.checked) {
      selected_array.push(id);
    } else {
      selected_array.splice(selected_array.indexOf(id), 1);
    }

    console.log(selected_array);
    setSelected(selected_array);
  }

  async function deleteSelected() {
    let selectedCopy = [...selected];
    selectedCopy.forEach((id) => {
      profile.cart.splice(profile.cart.indexOf(id), 1);
    });
    await fetch("http://localhost:3001/profiles/" + current, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "cart": profile.cart,
      }),
    });
    window.location.reload();
  }

  async function goToPayment() {
    await fetch("http://localhost:3001/profiles/" + current, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "cart": profile.cart.filter((id) => !selected.includes(id)),
      }),
    });
    navigate("/payment/" + money);
  }

  useEffect(() => {
    let amount = selected.reduce((acc, id) => {
      return acc + Number(products.find((product) => product.id == id).price);
    }, 0);
    setMoney(amount);
  }, [selected]);

  if (profile && current && products.length) {
    console.log(products);
    return (
      <div className="flex items-center flex-col">
        <RunningLine />
        <div className="infoContainer">
          <Link
            to={"/"}
            className=" flex flex-row gap-5 mt-10 mb-[200px] items-center"
          >
            <div className="round-button">
              <img src="images/svg/back.svg" alt="._." />
            </div>
            <p className=" text-mywhite text-2xl">Вернуться назад</p>
          </Link>
          <main className="flex flex-col gap-5 mb-[200px]">
            <h1 className="text-mywhite ">Корзина</h1>
            <div className="flex flex-row gap-5">
              <div className="cart__products max-w-[1052px] flex flex-row flex-wrap gap-5">
                {profile.cart.map((id) => {
                  const product = products.find((product) => product.id == id);
                  return product ? (
                    <div className="relative" key={id}>
                      <input
                        type="checkbox"
                        className="absolute w-[40px] h-[40px] z-40 right-5 top-5 rounded-lg"
                        onChange={(e) => manageSelection(e.target, id)}
                      />
                      <Product product={product} />
                    </div>
                  ) : null;
                })}
              </div>
              <div className="cart-card grow h-[471px] bg-mydark-gray flex flex-col justify-between rounded-lg py-5">
                <div className=" flex w-full flex-col gap-5">
                  <h2 className="text-mywhite mb-5 px-5 box-border">
                    Ваша корзина
                  </h2>
                  <div className="px-5 box-border text-2xl text-mywhite flex flex-row justify-between">
                    <p>{`Товары (${selected.length})`}</p>
                    <p>{money} ₽</p>
                  </div>
                  <div className="px-5 box-border text-2xl flex flex-row justify-between">
                    <p className="text-mywhite">Скидка</p>
                    <p className="text-myorange">-0 ₽</p>
                  </div>
                  <div className="text-2xl items-center text-mywhite flex flex-row justify-between bg-mylight-gray h-[53px]">
                    <p className="mx-5">Итого</p>
                    <p className="mx-5">{money} ₽</p>
                  </div>
                </div>
                <div className="  flex felx-col gap-5 w-full min-h-[120px] flex-wrap px-5 box-border">
                  <Link className="button button__red min-w-full"
                  onClick={() => goToPayment()}>
                    Перейти к оформлению
                  </Link>
                  <div className="button button__red-light min-w-full"
                  onClick={() => deleteSelected()}>
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <></>;
  }
}
