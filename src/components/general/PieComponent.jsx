import IconoFacebook from "../../src/assets/icons/facebook.svg";
import IconoInstagram from "../../src/assets/icons/icons8-instagram.svg"
import IconoTwitter from "../../src/assets/icons/icons8-twitterx.svg"

export default function Pie() {
  return (
    <footer className=" bg-white" aria-labelledby="footer-heading ">
     
      <div className="px-5 py-12 mx-auto bg-slate-200 sm:px-6 md:flex md:justify-between lg:px-20">
        <div className="flex justify-center  items-center  mt-2 mb-4">
          <span className="mt-2  text-black">Terminos Legales</span>
        </div>

        <div className="flex justify-center items-center my-4">
          <span className="mt-2  text-black">Copyright © 2023 - 2024</span>
        </div>

        <div className="flex justify-center  items-center md:my-6">
          <a href="https://facebook.com">
            <span className="sr-only">Facebook</span>
            <img
              className=" w-6 h-6 text-gray-400 hover:text-gray-500 mx-1"
              fill="currentColor"
              src={IconoFacebook}
              alt=""
            />
          </a>

          <a href="https://instagram.com">
            <span className="sr-only">Instagram</span>
            <img
              className=" w-6 h-6 text-gray-400 hover:text-gray-500 mx-1"
              fill="currentColor"
              src={IconoInstagram}
              alt=""
            />
          </a>

          <a href="https://twitter.com">
            <span className="sr-only">Twitter</span>
            <img
              className=" w-6 h-6 text-gray-400 hover:text-gray-500 mx-1"
              fill="currentColor"
              src={IconoTwitter}
              alt=""
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
