import React from "react";
import Cabecera from "../components/general/CabeceraComponent";
import Pie from "../components/general/PieComponent";
import MapaComponent from "../components/mapa/MapaComponent";
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";

export const Mapa = () => {
  return (
    <>
      <Cabecera></Cabecera>
      <BreadCrumbsComponent></BreadCrumbsComponent>
      <MapaComponent></MapaComponent>
      <Pie></Pie>
    </>
  );
};
