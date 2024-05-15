import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Payment() {
  const { price } = useParams();
  const navigate = useNavigate();

  console.log(price);
  return (
    <div className="flex items-center flex-col">
      <RunningLine />
      <div className="infoContainer">
        <header className=" flex flex-row gap-5 mt-10 mb-[200px] items-center">
          <div className="round-button">
            <img src="/images/svg/back.svg" alt="._." />
          </div>
          <p className=" text-mywhite text-2xl">Вернуться назад</p>
        </header>

        <main className="flex flex-col gap-5 mb-[200px]">
          <h1 className="text-mywhite ">Оформление заказа</h1>
          <div className="flex flex-col gap-5">
            <h2 className="text-mywhite">Выберите способ оплаты</h2>

            <div className=" flex flex-row gap-5">
              <div className="flex flex-row gap-5 max-w-[1032px] w-full overflow-x-scroll">
                <div>
                  <p className="mb-5 text-mywhite">Новой картой</p>
                  <div className=" w-80 h-60 min-w-80 min-h-60 bg-mydark-gray rounded-lg flex items-center justify-center">
                    <img src="/images/svg/plus.jpg" alt="._." />
                  </div>
                </div>
                <div>
                  <p className="mb-5 text-mywhite">Альфа-банка</p>
                  <div className=" w-80 h-60 min-w-80 min-h-60 bg-myorange rounded-lg flex flex-col justify-between box-border p-5">
                    <img
                      className=" w-[50px] h-[80px]"
                      src="/images/svg/alfa.svg"
                      alt="._."
                    />
                    <div className=" flex flex-row justify-between">
                      <p className="text-mydark-gray text-2xl font-bold">
                        ** 1234
                      </p>
                      <img src="/images/svg/mir.svg" alt="._." />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-5 text-mywhite">Тинькофф</p>
                  <div className=" w-80 h-60 min-w-80 min-h-60 bg-[#E7BF33] rounded-lg flex flex-col justify-between box-border p-5">
                    <img
                      className=" w-[100px] h-[100px]"
                      src="/images/svg/tinkoff.svg"
                      alt="._."
                    />
                    <div className=" flex flex-row justify-between">
                      <p className="text-mydark-gray text-2xl font-bold">
                        ** 1234
                      </p>
                      <img src="/images/svg/mir.svg" alt="._." />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-5 text-mywhite">СБП</p>
                  <div className=" w-80 h-60 min-w-80 min-h-60 bg-mydark-gray rounded-lg flex items-center justify-center">
                    <img src="/images/svg/sbp.svg" alt="._." />
                  </div>
                </div>
              </div>

              <div className=" grow h-[380px] bg-mydark-gray flex flex-col justify-between rounded-lg py-5">
                <div className=" flex w-full flex-col gap-5">
                  <h2 className="text-mywhite mb-5 px-5 box-border">
                    К оплате
                  </h2>
                  <div className="text-2xl items-center text-mywhite flex flex-row justify-between bg-mylight-gray h-[53px]">
                    <p className="mx-5">Всего</p>
                    <p className="mx-5">{price} ₽</p>
                  </div>
                </div>
                <div className="  flex felx-col gap-5 w-full min-h-[120px] flex-wrap px-5 box-border">
                  <div
                    className="button button__red min-w-full"
                    onClick={() => {
                      alert("Оплата прошла успешно");
                      navigate("/");
                    }}
                  >
                    Оплатить
                  </div>
                  <div 
                  className="button button__red-light min-w-full"
                  onClick={() => {
                    alert("Отмена прошла успешно");
                    navigate("/");
                  }}>
                    Отменить
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
