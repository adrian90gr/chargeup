import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import FotoNosotros from "../../public/images/SobreNosotros.webp";
import FotoBombilla from "../../public/images/Bombilla.webp";
import FotoContacta from "../../public/images/contacta.webp";
export default function Cards() {
  return (
    <section>
      <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div className="grid w-full grid-cols-1 gap-10 mx-auto md:grid-cols-3">
          <div className="p-6 flex items-center flex-col justify-between bg-slate-700 rounded-xl">
            <img
              className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
              src={FotoNosotros}
              alt="blog"
            />

            <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-white lg:text-3xl">
              Sobre nosotros
            </h1>
            <h2 className="mb-8 text-xs font-semibold tracking-widesttext text-white uppercase">
              Conocenos
            </h2>

            <div className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600">
              <Link to="/sobrenosotros">
                {" "}
                <Button size="md" className="bg-cyan-500">
                  {" "}
                  Saber más
                </Button>{" "}
              </Link>
            </div>
          </div>

          <div className="p-6 flex items-center flex-col justify-between bg-slate-700 rounded-xl">
            <img
              className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
              src={FotoBombilla}
              alt="blog"
            />

            <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-white lg:text-3xl">
              Sostenibilidad
            </h1>
            <h2 className="mb-8 text-xs font-semibold tracking-widest text-white uppercase">
              Cuida el planeta, asegura el futuro
            </h2>

            <div className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600">
              <Link to="/sostenibilidad">
                {" "}
                <Button size="md" className="bg-cyan-500">
                  {" "}
                  Saber más
                </Button>{" "}
              </Link>
            </div>
          </div>

          <div className="p-6 flex items-center flex-col justify-between bg-slate-700 rounded-xl">
            <img
              className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl"
              src={FotoContacta}
              alt="blog"
            />

            <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-white lg:text-3xl">
              Contacta con nosotros
            </h1>
            <h2 className="mb-8 text-xs font-semibold tracking-widest text-white uppercase">
              Estamos cerca de tí
            </h2>

            <div className="flex items-center  mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600">
              <Link to="/contacta">
                {" "}
                <Button size="md" className="bg-cyan-500">
                  {" "}
                  Saber más
                </Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
