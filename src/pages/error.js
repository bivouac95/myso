import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";

export function Error() {
    return (
        <div className="flex flex-col items-center">
        <RunningLine />
        <div className="infoContainer h-screen text-mywhite flex flex-col items-center justify-center">
            <h1>404</h1>
            <p className=" text-2xl">Такой страницы не существует</p>
            
        </div>
        <Footer />
        </div>
    );
}