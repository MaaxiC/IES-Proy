import Modal from 'react-bootstrap/Modal';

const ModalForm = ({handleClose, show, children}) => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Datos del comprador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    );
}

export default ModalForm