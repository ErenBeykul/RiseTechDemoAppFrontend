import React from "react";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";

export function PersonEditForm({ 
  person,
  btnRef,
  savePerson
}) {
  return (
    <Formik 
      enableReinitialize={true}
      initialValues={person}
      onSubmit={(values) => savePerson(values)}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm={2}>
              Adı <span>*</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={values.name} placeholder="Adı" onChange={(e) => handleChange(e)} />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} controlId="surname">
            <Form.Label column sm={2}>
              Soyadı <span>*</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={values.surname} placeholder="Soyadı" onChange={(e) => handleChange(e)} />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} controlId="firm">
            <Form.Label column sm={2}>
              Firma <span>*</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={values.firm} placeholder="Firma" onChange={(e) => handleChange(e)} />
            </Col>
          </Form.Group>

          <button
            type="submit"
            style={{ display: "none" }}
            ref={btnRef}
          ></button>
        </Form>
      )}      
    </Formik>
  );
}