import React from "react";
import Cabecera from "../components/general/CabeceraComponent";
import Pie from "../components/general/PieComponent";
import { DetailsUser } from "../components/perfilUsuario/DetailsUserComponent";
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";

export const PerfilUsuario = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecera />
      <BreadCrumbsComponent></BreadCrumbsComponent>
      <main className="flex-grow flex flex-col items-center p-4">
        <DetailsUser />
      </main>
      <Pie />
    </div>
  );
};
