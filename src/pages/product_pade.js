import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { Header } from "../components/header";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function short(number) {
  return Math.trunc(number * 10) / 10;
}

function getLengthOfRewiew(mark, reviews) {
  let amount = reviews.reduce((accumulator, review) => {
    if (review.mark == mark) {
      accumulator++;
    }
    return accumulator;
  }, 0);

  return (amount / reviews.length) * 400;
}

export function ProductPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState([]);
  const [newRewiewParams, setNewRewiewParams] = useState({
    name: "",
    text: ""
  })

  function handleStarring(id) {
    setSelectedStars([...Array(Number(id) + 1).keys()]);
  }

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/current")
      .then((response) => response.json())
      .then((data) => setCurrent(data.id));
  }, []);

  let product =
    products !== [] || products !== undefined
      ? products.find((product) => product.id == id)
      : {
          id: 0,
          title: "",
          description: "",
          price: "",
          img: "",
          "img-other": [],
          reviews: [],
        };

  async function cart() {
    const porofiles_data = await fetch("http://localhost:3001/profiles").then(
      (response) => {
        return response.json();
      }
    );
    const cart = porofiles_data.find((profile) => profile.id == current).cart;
    cart.push(id);
    await fetch("http://localhost:3001/profiles/" + current, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cart,
      }),
    });
    alert("Товар добавлен в корзину!");
  }

  async function postReview() {
    let newRewiews = [...product.reviews];
    newRewiews.push({
      id: product.reviews.length,
      name: newRewiewParams.name,
      text: newRewiewParams.text,
      mark: selectedStars.length,
      photos: [],
    });

    await fetch("http://localhost:3001/products/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviews: newRewiews,
      }),
    });

    alert("Ваш отзыв был успешно оставлен!");
    window.location.reload();
  }

  if (product) {
    let avg_rating = product.reviews.length > 0 ?
      product.reviews
        .map((rewiew) => rewiew.mark)
        .reduce((accumulator, mark) => accumulator + Number(mark), 0) /
      product.reviews.length : 0;
    return (
      <>
        <div
          className={` bg-mytransblack w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-[999] items-center justify-center ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <div className=" w-[900px] h-[600px] bg-myblack rounded-lg box-border p-5 flex flex-col justify-between items-center">
            <h1 className=" text-mywhite">Оставить комментарий</h1>
            <div className="flex flex-col gap-5">
              <div className=" flex flex-col gap-2">
                <span className=" text-2xl text-mywhite">Имя</span>
                <input
                  type="text"
                  className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                  value={newRewiewParams.name}
                  onChange={(e) => setNewRewiewParams({ ...newRewiewParams, name: e.target.value })}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <span className=" text-2xl text-mywhite">
                  Текст комментария
                </span>
                <input
                  type="text"
                  className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                  value={newRewiewParams.text}
                  onChange={(e) => setNewRewiewParams({ ...newRewiewParams, text: e.target.value })}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <span className=" text-2xl text-mywhite">Оценка</span>
                <div className=" flex flex-row gap-2">
                  <img
                    className={`cursor-pointer ${
                      selectedStars.includes(0) ? "" : "opacity-30"
                    }`}
                    id={0}
                    src="/images/svg/star.svg"
                    alt="._."
                    onClick={(e) => handleStarring(e.target.id)}
                  />
                  <img
                    className={`cursor-pointer ${
                      selectedStars.includes(1) ? "" : "opacity-30"
                    }`}
                    id={1}
                    src="/images/svg/star.svg"
                    alt="._."
                    onClick={(e) => handleStarring(e.target.id)}
                  />
                  <img
                    className={`cursor-pointer ${
                      selectedStars.includes(2) ? "" : "opacity-30"
                    }`}
                    id={2}
                    src="/images/svg/star.svg"
                    alt="._."
                    onClick={(e) => handleStarring(e.target.id)}
                  />
                  <img
                    className={`cursor-pointer ${
                      selectedStars.includes(3) ? "" : "opacity-30"
                    }`}
                    id={3}
                    src="/images/svg/star.svg"
                    alt="._."
                    onClick={(e) => handleStarring(e.target.id)}
                  />
                  <img
                    className={`cursor-pointer ${
                      selectedStars.includes(4) ? "" : "opacity-30"
                    }`}
                    id={4}
                    src="/images/svg/star.svg"
                    alt="._."
                    onClick={(e) => handleStarring(e.target.id)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div
                className="button button__red min-w-[600px]"
                onClick={() => postReview()}
              >
                Оставить комментарий
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

        <div className=" flex items-center flex-col text-mywhite">
          <RunningLine />
          <Header />
          <main className="w-full items-center flex flex-col box-border px-5">
            <div className="infoContainer flex flex-col gap-10 mt-44">
              <div className=" flex flex-row items-center gap-10 w-full">
                <h1>{product.title}</h1>
                <div className="stars flex flex-row gap-2 h-min w-max items-center">
                  {[...Array(Math.round(avg_rating)).keys()].map((i) => (
                    <img
                      src="/images/svg/star.svg"
                      className=" w-3 h-3"
                      key={i}
                      alt="._."
                    />
                  ))}
                  <p>{short(avg_rating)}</p>
                </div>
              </div>

              <div className="product-info flex flex-row gap-10">
                <div className="product-info__left w-1/2">
                  <div className="product-info__left__/images"></div>
                  <img src={product.img} alt="._." className="w-full h-auto" />
                </div>
                <div className="product-info__right w-1/2 flex flex-col justify-between">
                  <p>{product.description}</p>
                  <div className={`product-info__buttons ${current == "" ? "hidden" : "flex"} flex-row justify-between`}>
                    <div className="flex flex-row gap-5 w-min">
                      <div className="button button__red" onClick={cart}>
                        В корзину
                      </div>
                      <div className="button button__red like">
                        <img src="/images/svg/like.svg" alt="._." />
                      </div>
                    </div>
                    <div className="button button__red-light">
                      Купить в один клик
                    </div>
                  </div>
                </div>
              </div>

              <div className="rating">
                <header className=" flex flex-row gap-10 items-center mb-5">
                  <h2>Рейтинг</h2>
                  <div className="flex flex-row gap-2 items-center">
                    {[...Array(Math.round(avg_rating)).keys()].map((i) => (
                      <img
                        src="/images/svg/star.svg"
                        className=" w-8 h-8"
                        key={i}
                        alt="._."
                      />
                    ))}
                    <p>
                      {short(avg_rating)} / {product.reviews.length} Отзывов
                    </p>
                  </div>
                  <div
                    className="button button__orange-light"
                    onClick={() => setOpen(true)}
                  >
                    Оставить отзыв
                  </div>
                </header>

                <main>
                  <div className="rating-stats flex flex-col gap-4">
                    <div className=" flex flex-row gap-3">
                      <div className="flex flex-row gap-1 items-center">
                        <p>5</p>
                        <img
                          src="/images/svg/star.svg"
                          alt="._."
                          className=" w-3 h-3"
                        />
                      </div>
                      <div
                        style={{
                          width: getLengthOfRewiew(5, product.reviews) + "px",
                        }}
                        className=" h-3 bg-mylight-gray rounded-full"
                      ></div>
                    </div>
                    <div className=" flex flex-row gap-3">
                      <div className="flex flex-row gap-1 items-center">
                        <p>4</p>
                        <img
                          src="/images/svg/star.svg"
                          alt="._."
                          className=" w-3 h-3"
                        />
                      </div>
                      <div
                        style={{
                          width: getLengthOfRewiew(4, product.reviews) + "px",
                        }}
                        className=" h-3 bg-mylight-gray rounded-full"
                      ></div>
                    </div>
                    <div className=" flex flex-row gap-3">
                      <div className="flex flex-row gap-1 items-center">
                        <p>3</p>
                        <img
                          src="/images/svg/star.svg"
                          alt="._."
                          className=" w-3 h-3"
                        />
                      </div>
                      <div
                        style={{
                          width: getLengthOfRewiew(3, product.reviews) + "px",
                        }}
                        className=" h-3 bg-mylight-gray rounded-full"
                      ></div>
                    </div>
                    <div className=" flex flex-row gap-3">
                      <div className="flex flex-row gap-1 items-center">
                        <p>2</p>
                        <img
                          src="/images/svg/star.svg"
                          alt="._."
                          className=" w-3 h-3"
                        />
                      </div>
                      <div
                        style={{
                          width: getLengthOfRewiew(2, product.reviews) + "px",
                        }}
                        className=" h-3 bg-mylight-gray rounded-full"
                      ></div>
                    </div>
                    <div className=" flex flex-row gap-3">
                      <div className="flex flex-row gap-1 items-center">
                        <p>1</p>
                        <img
                          src="/images/svg/star.svg"
                          alt="._."
                          className=" w-3 h-3"
                        />
                      </div>
                      <div
                        style={{
                          width: getLengthOfRewiew(1, product.reviews) + "px",
                        }}
                        className=" h-3 bg-mylight-gray rounded-full"
                      ></div>
                    </div>
                  </div>
                  <div className="photo-rewiews"></div>
                </main>
              </div>

              <div className="rewiewes flex flex-col gap-5 mb-[200px]">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rewiew bg-mydark-gray box-border p-5 flex flex-col gap-10 max-w-[700px] min-h-[160px]"
                  >
                    <header className=" font-semibold flex flex-row gap-5 items-center">
                      {review.name}
                      <div className=" flex flex-row gap-2">
                        {[...Array(Number(review.mark)).keys()].map((i) => (
                          <img
                            className=" w-3 h-3"
                            src="/images/svg/star.svg"
                            alt="._."
                            key={i}
                          />
                        ))}
                      </div>
                    </header>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
}
