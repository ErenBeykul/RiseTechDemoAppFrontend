import React, { useEffect, useRef } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/contact-info/ContactInfoAction";
import Swal from "sweetalert2";
import { 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ModalProgressBar
} from "../../../../../../_metronic/_partials/controls";
import { ContactInfoEditForm } from "./ContactInfoEditForm";

export function ContactInfoEdit({
  history,
  match: {
    params: { id, personId }
  }
}) {
  const dispatch = useDispatch();
  const { actionsLoading, contactInfo } = useSelector(
    (state) => ({
      actionsLoading: state.contactInfo.actionsLoading,
      contactInfo: state.contactInfo.contactInfo
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.getContactInfo(id, personId));
  }, [id, personId, dispatch]);
  
  const saveContactInfo = (values) => {
    dispatch(actions.saveContactInfo(values)).then((result) => onResult(result));
  };
  
  const onResult = ({ isSuccess, type, message }) => {
    Swal.fire({
      icon: type,
      title: message,
      timer: 2500,
      showConfirmButton: false
    });

    if (isSuccess) setTimeout(() => history.push(`/iletisim-bilgileri/${personId}`), 2500);
  };

  const btnRef = useRef();  
  const saveContactInfoClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  
  let title = "İletişim Bilgisi";
  let action = id ? "Düzenle" : "Ekle";
  title += " " + action;
  title = <>{title} (<span style={{color:"red"}}>{contactInfo.personName}</span>)</>
        
  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title} />
      <CardBody>
        <div className="mt-5">          
          <ContactInfoEditForm 
            contactInfo={contactInfo}
            btnRef={btnRef} 
            saveContactInfo={saveContactInfo}
          />
        </div>        
      </CardBody>
      <CardFooter>
        <div className="offset-sm-2">          
          <button
            type="submit"
            className="btn btn-primary"
            onClick={saveContactInfoClick}
          >
            Kaydet
          </button>          
        </div>
      </CardFooter>
    </Card>
  );
}