import React from "react";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";
import { CustomSelect } from "../../../../../../components/CustomSelect";

export function ContactInfoEditForm({ 
  contactInfo,
  btnRef,
  saveContactInfo
}) {
  return (
    <Formik 
      enableReinitialize={true}
      initialValues={contactInfo}
      onSubmit={(values) => saveContactInfo(values)}
    >
      {({ handleSubmit, handleChange, setFieldValue, values }) => (
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <Form.Group as={Row} controlId="infoType">
            <Form.Label column sm={2}>
              Bilgi Türü<span> *</span>
            </Form.Label>
            <Col sm={10}>
              <CustomSelect 
                options={contactInfo.infoTypes}
                value={values.infoType}
                onChange={option => setFieldValue("infoType", option.value)}
              />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} controlId="info">
            <Form.Label column sm={2}>
              Bilgi<span> *</span>
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={values.info} placeholder="Bilgi" onChange={handleChange} />
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