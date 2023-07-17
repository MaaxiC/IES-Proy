import { fetchTransactions } from "../../services/transactions";
import { useQuery } from "@tanstack/react-query";
import { Table, Container } from "react-bootstrap";
import { format } from "date-fns";

export function Transaction() {
  const { data, isLoading } = useQuery(
    ["transactions"],
    fetchTransactions,
    {
      staleTime: 6000,
    }
  );
  const Transacciones = data;

  if (isLoading) return "Cargando...";

  return (
    <>
      <br />
      <Container className="align-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Movimiento</th>
              <th>Usuario</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {Transacciones.map((transaccion, index) => (
              <tr key={transaccion.id}>
                <td>{index + 1}</td>
                <td>{transaccion.tipoMovimiento}</td>
                <td>{transaccion.usuario}</td>
                <td>{format(new Date(transaccion.createdAt), "MM/dd/yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
