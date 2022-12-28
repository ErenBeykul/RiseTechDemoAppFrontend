import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { CustomSelect } from "../../../../../../components/CustomSelect";
import * as actions from "../../../_redux/contact-info/ContactInfoAction";
import { useContactInfoUIContext } from "../ContactInfoUIContext";
import { FilterOptions } from "../ContactInfoUIHelpers";

const prepareFilter = (queryParams, values) => {
  const { infoType, info } = values;
  const personId = queryParams.filter.personId;
  const newQueryParams = { ...queryParams };
  const filter = { personId, infoType, info };
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ContactInfoFilter() {
  // Contact Info UI Context
  const contactInfoUIContext = useContactInfoUIContext();
  const contactInfoUIProps = useMemo(() => {
    return {
      setQueryParams: contactInfoUIContext.setQueryParams,
      queryParams: contactInfoUIContext.queryParams,
    };
  }, [contactInfoUIContext]);
  
  const dispatch = useDispatch();
  const { infoTypes } = useSelector(
    (state) => ({
      infoTypes: state.contactInfo.infoTypes
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.GetInfoTypes());
  }, [dispatch]);
  
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(contactInfoUIProps.queryParams, values);
    if (!isEqual(newQueryParams, contactInfoUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      contactInfoUIProps.setQueryParams(newQueryParams);
    }
  };

  const infoTypeOptions = FilterOptions.concat(infoTypes);
  
  return (
    <Formik
      initialValues={{
        infoType: null,
        info: ""
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
              <CustomSelect 
                options={infoTypeOptions}
                value={values.infoType}
                placeholder="Bilgi Türü"
                onBlur={handleBlur}
                onChange={e => {
                  setFieldValue("infoType", e.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>Bilgi Türü</b>
              </small>
            </div>
            <div className="col-lg-2">
              <input
                type="text"
                className="form-control"
                name="code"
                placeholder="Bilgi"
                onBlur={handleBlur}
                value={values.info}
                onChange={(e) => {
                  setFieldValue("info", e.target.value);
                  handleSubmit();
                }}
              />
              <small className="form-text text-muted">
                <b>Bilgi</b>
              </small>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}