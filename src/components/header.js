import "./components css/header.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [profiles, setProfiles] = useState({});
  const [current, setCurrent] = useState("");

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

  let [isOpen, setOpen] = useState(false);
  let [isOpenLogin, setOpenLogin] = useState(false);
  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");

  let proile_things;

  function handleLogginOut() {
    setOpen(false)
    fetch("http://localhost:3001/current", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"id" : ""}),
    }).then(() => setCurrent(""));
  }
  
  function handleLogginIn() {
    setOpen(false)
    console.log(profiles);
    let logins = profiles
      ? profiles.map((profile) => profile.login)
      : [];
    console.log(logins);
    let passwords = profiles
      ? profiles.map((profile) => profile.password)
      : [];
    console.log(passwords);

    if (logins.includes(login) && passwords.includes(password)) {
      if (profiles) {
        const id = profiles.find(
          (profile) => profile.login === login
        ).id;
        fetch("http://localhost:3001/current ", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"id" : id}),
        })
          .then((response) => response.json())
          .then(() => setCurrent(id));
      }

      setOpenLogin(!isOpenLogin);
    } else {
      alert("Неверный логин или пароль");
      setLogin("");
      setPassword("");
    }
  }

  if (current && current != "") {
    let profile = profiles.find ? profiles.find((profile) => profile.id == current) : {};
    proile_things = (
      <div className=" flex flex-row gap-5 items-center">
        <div
          className={`absolute h-min w-min left-0 top-0 bg-myblack ${
            isOpen ? "block" : "hidden"
          } z-10 py-5 rounded-lg`}
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
            onClick={() => setOpen(!isOpen)}
          >
            <Link
              className=" text-nowrap text-2xl text-center px-5 h-min "
              to={"/cart"}
            >
              Перейти в корзину
            </Link>
          </div>

          <div
            className=" flex w-full h-[53px] justify-center items-center cursor-pointer hover:bg-mylight-gray"
            onClick={() => setOpen(!isOpen)}
          >
            <p className=" text-nowrap text-2xl text-center px-5 h-min ">
              Перейти в избранное
            </p>
          </div>

          <div
            className=" flex w-full h-[53px] justify-center items-center cursor-pointer hover:bg-mylight-gray"
            onClick={() => handleLogginOut()}
          >
            <p className=" text-nowrap text-2xl text-center px-5 h-min ">
              Выйти
            </p>
          </div>
        </div>
        <img
          id="profile-picture"
          className=" w-28 h-12 rounded-full object-cover cursor-pointer"
          src={profile["profile-picture"]}
          alt="._."
          onClick={() => setOpen(!isOpen)}
        />
        <p>{profile["name"]}</p>
      </div>
    );
  } else {
    proile_things = (
      <p
        id="log-in"
        className=" cursor-pointer"
        onClick={() => setOpenLogin(!isOpenLogin)}
      >
        Войти
      </p>
    );
  }

  if (profiles) {
    return (
      <header className="main-page__header h-16 items-center flex flex-row justify-between">
        <div
          className={` bg-mytransblack w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-[999] items-center justify-center ${
            isOpenLogin ? "flex" : "hidden"
          }`}
        >
          <div className=" w-[900px] h-[600px] bg-myblack rounded-lg box-border p-5 flex flex-col justify-between items-center">
            <h1 className=" text-mywhite">Вход</h1>
            <div className="flex flex-col gap-5">
              <div className=" flex flex-col gap-2">
                <span className=" text-2xl text-mywhite">Введите логин</span>
                <input
                  type="text"
                  value={login}
                  className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <span className=" text-2xl text-mywhite">Введите пароль</span>
                <input
                  type="password"
                  value={password}
                  className=" bg-mywhite border-0 rounded-lg text-myblack text-2x w-[600px] m-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div
                className="button button__red min-w-[600px] "
                onClick={handleLogginIn}
              >
                Войти
              </div>
              <div
                className="button button__red-light min-w-[600px]"
                onClick={() => setOpenLogin(!isOpenLogin)}
              >
                Отменить
              </div>
            </div>
          </div>
        </div>
  
        {proile_things}
        <input className=" input bg-mywhite" type="text" />
        <div className="round-button">
          <img src="/images/svg/burger.svg" alt="" />
        </div>
      </header>
    );
  }
  
}
