import { Chart } from "react-google-charts";
import { fetchQuantitySales, fetchAmountSales } from "../../services/Data";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Charts = () => {
  const [qtySales, setQtySales] = useState();
  const [amountSales, setAmountSales] = useState();

  useEffect(() => {
    getQuantitySales();
    getAmountSales();
  }, []);

  const getQuantitySales = async () => {
    const data = await fetchQuantitySales();
    let quantityMonth = [];
    data?.quantitySales.forEach((item) => {
      switch (item._id) {
        case 1:
          quantityMonth = [...quantityMonth, [1, "Enero", item.totalVendido]];
          break;
        case 2:
          quantityMonth = [...quantityMonth, [2, "Febrero", item.totalVendido]];
          break;
        case 3:
          quantityMonth = [...quantityMonth, [3, "Marzo", item.totalVendido]];
          break;
        case 4:
          quantityMonth = [...quantityMonth, [4, "Abril", item.totalVendido]];
          break;
        case 5:
          quantityMonth = [...quantityMonth, [5, "Mayo", item.totalVendido]];
          break;
        case 6:
          quantityMonth = [...quantityMonth, [6, "Junio", item.totalVendido]];
          break;
        case 7:
          quantityMonth = [...quantityMonth, [7, "Julio", item.totalVendido]];
          break;
        case 8:
          quantityMonth = [...quantityMonth, [8, "Agosto", item.totalVendido]];
          break;
        case 9:
          quantityMonth = [...quantityMonth, [9, "Septiembre", item.totalVendido]];
          break;
        case 10:
          quantityMonth = [...quantityMonth, [10, "Octubre", item.totalVendido]];
          break;
        case 11:
          quantityMonth = [...quantityMonth, [11, "Noviembre", item.totalVendido]];
          break;
        case 12:
          quantityMonth = [...quantityMonth, [12, "Diciembre", item.totalVendido]];
          break;
        default:
          //no se utiliza
      }
    });
    const sortedTable = quantityMonth.sort((a, b) => a[0] - b[0]);
    const quantityTable = sortedTable.map((month) => [month[1], month[2]]);
    quantityTable.unshift(["Mes", "Cantidad"]);
    setQtySales(quantityTable);
  };

  const optionsQuantityChart = {
    chart: {
      title: "Cantidad de Ventas por Mes",
      subtitle: "Año 2023",
    },
  };

  const getAmountSales = async () => {
    const data = await fetchAmountSales();
    let amountMonth = [];
    data?.amountSales.forEach((item) => {
      switch (item._id) {
        case 1:
          amountMonth = [...amountMonth, [1, "Enero", item.montoVendido]];
          break;
        case 2:
          amountMonth = [...amountMonth, [2, "Febrero", item.montoVendido]];
          break;
        case 3:
          amountMonth = [...amountMonth, [3, "Marzo", item.montoVendido]];
          break;
        case 4:
          amountMonth = [...amountMonth, [4, "Abril", item.montoVendido]];
          break;
        case 5:
          amountMonth = [...amountMonth, [5, "Mayo", item.montoVendido]];
          break;
        case 6:
          amountMonth = [...amountMonth, [6, "Junio", item.montoVendido]];
          break;
        case 7:
          amountMonth = [...amountMonth, [7, "Julio", item.montoVendido]];
          break;
        case 8:
          amountMonth = [...amountMonth, [8, "Agosto", item.montoVendido]];
          break;
        case 9:
          amountMonth = [...amountMonth, [9, "Septiembre", item.montoVendido]];
          break;
        case 10:
          amountMonth = [...amountMonth, [10, "Octubre", item.montoVendido]];
          break;
        case 11:
          amountMonth = [...amountMonth, [11, "Noviembre", item.montoVendido]];
          break;
        case 12:
          amountMonth = [...amountMonth, [12, "Diciembre", item.montoVendido]];
          break;
        default:
          //no se utiliza
      }
    });
    const sortedTable = amountMonth.sort((a, b) => a[0] - b[0]);
    const quantityTable = sortedTable.map((month) => [month[1], month[2]]);
    quantityTable.unshift(["Mes", "Monto"]);
    setAmountSales(quantityTable);
  };

  const optionsSalesChart = {
  chart: {
      title: "Montos de Ventas por Mes",
      subtitle: "Año 2023",
      },
  };

  return (
    qtySales && amountSales ? (
    <Container >
      <br />
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={qtySales}
        options={optionsQuantityChart}
      />
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={amountSales}
        options={optionsSalesChart}
    />
    </Container>
  ) : (
    <div>Cargando...</div>
  ));
};

export default Charts;