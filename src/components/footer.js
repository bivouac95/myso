import { RunningLine } from './/runningLine';
import { Link } from 'react-router-dom';

export function Footer(){
    return(
        <div className="footer flex flex-col items-center">
            <RunningLine />
            <img className=" mt-10" src="/images/svg/logo_white.svg" alt="._." />
            <div className='footer__wrapper flex flex-row mt-24 justify-between'>
                <div className="flex mx-5 flex-col gap-5 items-center w-80">
                    <h2 className=' mb-10'>About us</h2>
                    <a href="">Our company</a>
                    <a href="">Our principals</a>
                    <a href="">Work with us</a>
                </div>
                <div className="flex mx-5 flex-col gap-5 items-center w-80">
                    <h2 className=' mb-10'>For user</h2>
                    <Link to={"/privacy-policy"}>Privacy policy</Link>
                    <a href="">FAQ</a>
                    <a href="">Tech support</a>
                    <a href="">Give feedback</a>
                </div>
                <div className="flex mx-5 flex-col gap-5 items-center w-80">
                    <h2 className=' mb-10'>Social media</h2>
                    <a href="">Subcription to mailing list</a>
                    <a href="">What's new?</a>
                    <div className='flex flex-row gap-5'>
                        <img src="/images/svg/vk.svg" alt="._." />
                        <img src="/images/svg/tg.svg" alt="._." />
                        <img src="/images/svg/youtube.svg" alt="._." />
                        <img src="/images/svg/ok.svg" alt="._." />
                    </div>
                </div>
            </div>
        </div>
    );
}