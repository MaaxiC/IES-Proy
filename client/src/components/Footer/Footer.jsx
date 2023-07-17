import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <Container fluid>
        <Row className="align-items-center bg-primary p-4 fixed-bottom">
            <Col></Col>
            <Col>
                <p className="text-center text-white">P11 - Todos los derechos reservados</p>
            </Col>
            <Col>
                <p className="text-center text-white">Social Media:</p>
                <div className="d-flex justify-content-center">
                    <h2><a className="text-white p-2" href="https://instagram.com/p11tecnologia?igshid=YmMyMTA2M2Y="><BsInstagram/></a></h2>
                    <h2><a className="text-white p-2" href="https://www.facebook.com/P11Tecnologia"><BsFacebook/></a></h2>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Footer