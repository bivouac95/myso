import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { Product } from "../components/product";
import { Header } from "../components/header";
import { useState } from "react";
import { useEffect } from "react";


export function MainPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(data => setProducts(data));
  }, []);

  return (
    <div className=" flex items-center flex-col">
      
      <RunningLine />
      <div className="first_page">
        <img
          className=" w-screen h-screen object-cover"
          src="images/first_page/1.jpg"
          alt="._."
        />
        <div className="gradient w-screen h-screen z-10"></div>
        <img className="first_page__img" src="images/svg/logo_red.svg" alt="._." />
      </div>
      <Header />
      <main>
        <div className="products flex flex-wrap flex-row gap-5 justify-center mt-10 mb-52">
          {products.map((product) => (
            <Product product={product} key={product.id}/>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
