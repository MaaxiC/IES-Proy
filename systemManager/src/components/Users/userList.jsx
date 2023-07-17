import React, { useState } from "react";
import { Table, Container } from "react-bootstrap";

const initialData = [
  {
    id: 1,
    legajo: "11",
    clave: "8456",
    nombre: "Gustavo Ponce",
    rol: "Admin",
  },
  {
    id: 2,
    legajo: "12",
    clave: "5445",
    nombre: "Maximiliano Carnero",
    rol: "Developer",
  },
  {
    id: 3,
    legajo: "13",
    clave: "5658",
    nombre: "Juan Pablo Arguello",
    rol: "Tester",
  },
  {
    id: 4,
    legajo: "14",
    clave: "8858",
    nombre: "Josué Demaría",
    rol: "Full Stack Engineer",
  },
];

export function UserTable() {
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);
  const [editClave, setEditClave] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [editRol, setEditRol] = useState("");

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditClave(data[index].clave);
    setEditNombre(data[index].nombre);
    setEditRol(data[index].rol);
  };

  const handleSave = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? {
              ...item,
              clave: editClave,
              nombre: editNombre,
              rol: editRol,
            }
          : item
      )
    );
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((item, i) => i !== index));
  };

  return (
    <>
      <br />
      <Container className="align-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Legajo</th>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.legajo}</td>
                <td>
                  {index === editIndex ? (
                    <input
                      type="text"
                      value={editClave}
                      onChange={(e) => setEditClave(e.target.value)}
                    />
                  ) : (
                    item.clave
                  )}
                </td>
                <td>
                  {index === editIndex ? (
                    <input
                      type="text"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                    />
                  ) : (
                    item.nombre
                  )}
                </td>
                <td>
                  {index === editIndex ? (
                    <input
                      type="text"
                      value={editRol}
                      onChange={(e) => setEditRol(e.target.value)}
                    />
                  ) : (
                    item.rol
                  )}
                </td>
                <td>
                  {index === editIndex ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                    style={{ marginLeft: "10px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
