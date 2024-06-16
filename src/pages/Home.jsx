import Cabecera from "../components/general/CabeceraComponent";
import Pie from "../components/general/PieComponent";
import Cards from "../components/home/CardsComponent";
import { CarruselComponent } from "../components/home/CarruselComponent";
import { BreadCrumbsComponent } from "../components/general/BreadCrumbsComponent";
import WidgetComponent from "../components/home/WidgetComponent";

export default function Home() {
  return (
    <>
      <Cabecera></Cabecera>

      <main className="  w-full">
        <div className="text-center w-full">
          <CarruselComponent></CarruselComponent>
          <BreadCrumbsComponent></BreadCrumbsComponent>
          <Cards></Cards>
          <WidgetComponent></WidgetComponent>
        </div>
      </main>

      <Pie></Pie>
    </>
  );
}
