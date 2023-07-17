import { Card } from "react-bootstrap";

export function AboutUs() {
  return (
    <Card className=" text-center">
      <Card.Body>
        <Card.Title>Sobre nosotros</Card.Title>
        <Card.Text>
            Este sistema ha sido diseñado y desarrollado por Carnero Maximiliano
            y Demaría Josué como proyecto de tesis de la carrera Analista de
            Sistemas del Colegio Universitario IES Siglo 21
          <br />
            ©2023 Todos los derechos reservados.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
