import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useReportsUIContext } from "../ReportsUIContext";

const prepareFilter = (queryParams, values) => {
  let { date, lastDate } = values;
  const newQueryParams = { ...queryParams };
  const filter = { date, lastDate };
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ReportsFilter() {
  // Reports UI Context
  const peopleUIContext = useReportsUIContext();
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
        date: "",
        lastDate: "",
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
                type="date"
                className="form-control"
                name="date"
                placeholder="İlk Tarih"
                onBlur={handleBlur}
                value={values.date}
                onChange={(e) => {
                  setFieldValue("date", e.target.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>İlk Tarih</b>
              </small>
            </div>
            <div className="col-lg-2">
              <input
                type="date"
                className="form-control"
                name="lastDate"
                placeholder="Son Tarih"
                onBlur={handleBlur}
                value={values.lastDate}
                onChange={(e) => {
                  setFieldValue("lastDate", e.target.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>Son Tarih</b>
              </small>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}