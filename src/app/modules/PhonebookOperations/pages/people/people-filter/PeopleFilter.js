import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { usePeopleUIContext } from "../PeopleUIContext";

const prepareFilter = (queryParams, values) => {
  let { name, surname, firm } = values;
  const newQueryParams = { ...queryParams };
  const filter = { name, surname, firm };
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function PeopleFilter() {
  // People UI Context
  const peopleUIContext = usePeopleUIContext();
  const peopleUIProps = useMemo(() => {
    return {
      setQueryParams: peopleUIContext.setQueryParams,
      queryParams: peopleUIContext.queryParams,
    };
  }, [peopleUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(peopleUIProps.queryParams, values);
    if (!isEqual(newQueryParams, peopleUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      peopleUIProps.setQueryParams(newQueryParams);
    }
  };
  
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        firm: ""
      }}
      onSubmit={(values) => {
        applyFilter(values);
      }}
    >
      {({
        values,
        handleSubmit,
        handleBlur,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className="form form-label-right">
          <div className="form-group row">
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Adı"
                onBlur={handleBlur}
                value={values.name}
                onChange={(e) => {
                  setFieldValue("name", e.target.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>Adı</b>
              </small>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                name="surname"
                placeholder="Soyadı"
                onBlur={handleBlur}
                value={values.surname}
                onChange={(e) => {
                  setFieldValue("surname", e.target.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>Soyadı</b>
              </small>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                name="firm"
                placeholder="Firma"
                onBlur={handleBlur}
                value={values.firm}
                onChange={(e) => {
                  setFieldValue("firm", e.target.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>Firma</b>
              </small>
            </div>    
          </div>
        </form>
      )}
    </Formik>
  );
}