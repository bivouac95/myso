import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { Product } from "../components/product";
import { Header } from "../components/header";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export function AdminPage() {
  return (
    <div className=" flex items-center flex-col">
      <RunningLine />

      <div className=" h-screen w-screen justify-center items-center flex">
        <div className=" w-[650px] h-min bg-myblack flex flex-col items-center box-border p-5 rounded-lg justify-between">
          <header className=" flex items-center flex-col gpa-5">
            <h1 className=" text-mywhite">Админ панель</h1>
            <p className=" text-mywhite text-2xl">Добро пожаловать</p>
          </header>
          <div className=" flex flex-col items-center h-min gap-5 w-full mt-[100px]">
            <Link 
            className=" button__red w-full w-min-full h-10 rounded-lg text-2xl flex items-center justify-center cursor-pointer"
            to={"/admin/list"}>
              Открыть список товаров
            </Link>
            <Link
            to={"/admin/create"} 
            className=" button__red-light w-full w-min-full h-10 rounded-lg text-2xl flex items-center justify-center cursor-pointer">
              Создать новый товар
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
