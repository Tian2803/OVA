// /frontend/src/components/AddModules.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { addModulesToCourse } from "../services/courseService";

const AddModules = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([
    {
      title: "",
      level: "basico",
      subSections: [{ title: "", points: [{ title: "", content: "" }] }],
    },
  ]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleModuleChange = (index, e) => {
    const newModules = [...modules];
    newModules[index][e.target.name] = e.target.value;
    setModules(newModules);
  };

  const handleSubSectionChange = (moduleIndex, subSectionIndex, e) => {
    const newModules = [...modules];
    newModules[moduleIndex].subSections[subSectionIndex][e.target.name] =
      e.target.value;
    setModules(newModules);
  };

  const handlePointChange = (moduleIndex, subSectionIndex, pointIndex, e) => {
    const newModules = [...modules];
    newModules[moduleIndex].subSections[subSectionIndex].points[pointIndex][
      e.target.name
    ] = e.target.value;
    setModules(newModules);
  };

  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        title: "",
        level: "basico",
        subSections: [{ title: "", points: [{ title: "", content: "" }] }],
      },
    ]);
  };

  const handleAddSubSection = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subSections.push({
      title: "",
      points: [{ title: "", content: "" }],
    });
    setModules(newModules);
  };

  const handleAddPoint = (moduleIndex, subSectionIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subSections[subSectionIndex].points.push({
      title: "",
      content: "",
    });
    setModules(newModules);
  };

  const handleRemoveModule = (index) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  const handleRemoveSubSection = (moduleIndex, subSectionIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subSections.splice(subSectionIndex, 1);
    setModules(newModules);
  };

  const handleRemovePoint = (moduleIndex, subSectionIndex, pointIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].subSections[subSectionIndex].points.splice(
      pointIndex,
      1
    );
    setModules(newModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await addModulesToCourse(id, modules[0], user.token); // You may need to handle multiple modules as well
      setSuccess("Módulos agregados exitosamente");
      navigate(`/professor/course/${id}`);
    } catch (err) {
      setError(
        "Error al agregar módulos. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <Container>
      <h2>Agregar Módulos</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-3">
            <Form.Group
              controlId={`formModuleName${moduleIndex}`}
              className="mb-2"
            >
              <Form.Label>Nombre del Módulo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del módulo"
                name="title"
                value={module.title}
                onChange={(e) => handleModuleChange(moduleIndex, e)}
                required
              />
            </Form.Group>
            <Form.Group
              controlId={`formModuleLevel${moduleIndex}`}
              className="mb-2"
            >
              <Form.Label>Nivel de Dificultad</Form.Label>
              <Form.Control
                as="select"
                name="level"
                value={module.level}
                onChange={(e) => handleModuleChange(moduleIndex, e)}
              >
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </Form.Control>
            </Form.Group>
            {module.subSections.map((subSection, subSectionIndex) => (
              <div key={subSectionIndex} className="mb-3">
                <Form.Group
                  controlId={`formSubSectionName${moduleIndex}-${subSectionIndex}`}
                  className="mb-2"
                >
                  <Form.Label>Título de la Sub-Sección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el título de la sub-sección"
                    name="title"
                    value={subSection.title}
                    onChange={(e) =>
                      handleSubSectionChange(moduleIndex, subSectionIndex, e)
                    }
                    required
                  />
                </Form.Group>
                {subSection.points.map((point, pointIndex) => (
                  <div key={pointIndex} className="mb-2">
                    <Form.Group
                      controlId={`formPointTitle${moduleIndex}-${subSectionIndex}-${pointIndex}`}
                      className="mb-2"
                    >
                      <Form.Label>Título del Punto</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el título del punto"
                        name="title"
                        value={point.title}
                        onChange={(e) =>
                          handlePointChange(
                            moduleIndex,
                            subSectionIndex,
                            pointIndex,
                            e
                          )
                        }
                        required
                      />
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Ingrese el contenido del punto"
                        name="content"
                        value={point.content}
                        onChange={(e) =>
                          handlePointChange(
                            moduleIndex,
                            subSectionIndex,
                            pointIndex,
                            e
                          )
                        }
                        required
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleRemovePoint(
                            moduleIndex,
                            subSectionIndex,
                            pointIndex
                          )
                        }
                        className="mt-2"
                      >
                        Eliminar Punto
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between mt-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleAddPoint(moduleIndex, subSectionIndex)}
                  >
                    Agregar Punto
                  </Button>
                  {module.subSections.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleRemoveSubSection(moduleIndex, subSectionIndex)
                      }
                    >
                      Eliminar Sub-Sección
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-2">
              <Button
                variant="secondary"
                onClick={() => handleAddSubSection(moduleIndex)}
              >
                Agregar Sub-Sección
              </Button>
              {modules.length > 1 && (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveModule(moduleIndex)}
                >
                  Eliminar Módulo
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={handleAddModule}>
            Agregar Otro Módulo
          </Button>
          <Button variant="primary" type="submit">
            Agregar Módulos
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddModules;