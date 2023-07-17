import React from "react";
import Item from "../Others/card";

const Vcards = [
  {
    id: 1,
    title: "Productos",
    image:
      "https://cdn.pixabay.com/photo/2017/03/20/20/59/cell-2160319_1280.png",
    link: "/e-commerce/consultProduct",
  },
  {
    id: 2,
    title: "Métricas",
    image:
      "https://cdn.pixabay.com/photo/2017/05/09/10/03/equalizer-2297756_1280.png",
    link: "/Others/chartTest",
  },

  {
    id: 3,
    title: "Transacciones",
    image:
      "https://cdn.pixabay.com/photo/2017/03/24/06/03/folder-2170316_1280.png",
    link: "/e-commerce/transaction",
  },
  {
    id: 4,
    title: "Ordenes",
    image:
      "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png",
    link: "/e-commerce/order",
  },
  {
    id: 5,
    title: "Marcas",
    image:
      "https://cdn.pixabay.com/photo/2017/03/21/01/59/business-2160910_1280.png",
    link: "/e-commerce/brands",
  },
  {
    id: 6,
    title: "Categorías",
    image:
      "https://cdn.pixabay.com/photo/2017/03/21/02/00/list-2160914_1280.png",
    link: "/e-commerce/categories",
  },
  {
    id: 7,
    title: "Acerca de...",
    image:
      "https://cdn.pixabay.com/photo/2017/03/21/02/00/information-2160912_1280.png",
    link: "/e-commerce/about",
  },
  {
    id: 8,
    title: "Cerrar sesión",
    image:
      "https://cdn.pixabay.com/photo/2017/04/20/07/07/delete-2244774_1280.png",
    link: "/",
  },
];

export function Dashboard() {
  return (
    <div className="container h-100 align-items-center mt-5">
      <div className="row ">
        {Vcards.map((card) => (
          <div className="col-md-3" key={card.id}>
            <Item title={card.title} image={card.image} link={card.link}></Item>
          </div>
        ))}
      </div>
    </div>
  );
}
