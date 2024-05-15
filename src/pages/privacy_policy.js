import { Footer } from "../components/footer";
import { RunningLine } from "../components/runningLine";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <div className=" flex items-center flex-col">
      <RunningLine />
      <div className="infoContainer text-mywhite flex flex-col gap-5  mb-28">
        <Link
          to={"/"}
          className=" flex flex-row gap-5 mt-10 mb-[200px] items-center"
        >
          <div className="round-button">
            <img src="images/svg/back.svg" alt="._." />
          </div>
          <p className=" text-mywhite text-2xl">Вернуться назад</p>
        </Link>
        <h1 className="mb-5">Privacy Policy</h1>
        <img src="/images/svg/logo_white.svg" alt="._." className=" w-52 m-0" />
        <p>
          At <span className="font-bold">MySo</span>, accessible from
          <a className="text-mywhite" href="https://myso.xyz/">
            https://myso.xyz/
          </a>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by <span className="font-bold">MySo</span>
          and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us through email at
          <a className="text-mywhite" href="mailto:contact@myso.xyz">
            contact@myso.xyz
          </a>
        </p>

        <p className="mt-5">Log and Automatic Information Collection</p>

        <p>
          When you visit our website, <span className="font-bold">MySo</span>
          will collect information about you automatically through a process
          known as Log file. This Log file may include information such as your
          computer’s Internet Protocol (“IP”) address, browser type, browser
          version, the pages of our website that you visit, the time and date of
          your visit, the time spent on those pages, and other statistics.
        </p>

        <p className="mt-5">Use of Information</p>

        <p>
          <span className="font-bold">MySo</span> may use the information we
          collect from you when you visit our website, including information
          from Log files, for the following purposes:
        </p>

        <ul className="list-disc ml-8">
          <li>To improve our website</li>
          <li>To improve customer service</li>
          <li>To monitor the usage of our website</li>
        </ul>

        <p className="mt-5">Security</p>

        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the internet, or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your data, we cannot guarantee its absolute security.
        </p>

        <p className="mt-5">Changes To This Privacy Policy</p>

        <p>
          This Privacy Policy is effective as of 2022-03-20 and will remain in
          effect except with respect to any changes in its provisions in the
          future, which will be in effect immediately after being posted on this
          page.
        </p>

        <p className="mt-5">Contact Us</p>

        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>

        <p>
          <span className="font-bold">MySo</span>
          <br />
          contact@myso.xyz
        </p>
      </div>

      <Footer />
    </div>
  );
}
