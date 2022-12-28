import React, { useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/contact-info/ContactInfoAction";
import Swal from "sweetalert2";
import { 
  Card, 
  CardBody, 
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { ContactInfoFilter } from "./contact-info-filter/ContactInfoFilter";
import { ContactInfoTable } from "./contact-info-table/ContactInfoTable";
import { useContactInfoUIContext } from "./ContactInfoUIContext";

export function ContactInfoCard() {
  // Contact Info UI Context
  const contactInfoUIContext = useContactInfoUIContext();
  const contactInfoUIProps = useMemo(() => {
    return {
      ids: contactInfoUIContext.ids,
      setIds: contactInfoUIContext.setIds,
      queryParams: contactInfoUIContext.queryParams,
      setQueryParams: contactInfoUIContext.setQueryParams,
      openPersonListPage: contactInfoUIContext.openPersonListPage,
      openNewContactInfoPage: contactInfoUIContext.openNewContactInfoPage
    };
  }, [contactInfoUIContext]);
    
  // Getting curret state of Contact Info list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.contactInfo }),
    shallowEqual
  );
  const { personName } = currentState;

  // Contact Info Redux state
  const dispatch = useDispatch();

  // Rehberdeki Belli Bir İletişim Bilgisi Listesini Siler
  const deleteContactInfo = (ids) => {
    if (typeof ids === 'string') ids = ids.split(",");
  
    if (ids.length < 1) {
      Swal.fire({
        icon: "warning",
        title: "Lütfen Kayıt Seçiniz!",
        timer: 2500,
        showConfirmButton: false
      });        
      return;
    }
  
    Swal.fire({
      icon: "warning",
      title: "Silmek İstediğinize Emin misiniz?",
      text: "İlgili bilgi(ler) sistemden silinecektir.",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',        
    }).then(result => {
      if(result.isConfirmed) dispatch(actions.deleteContactInfo(ids)).then(result => onResult(result));
    });
  }

  const onResult = ({ isSuccess, type, message }) => {
    Swal.fire({
      icon: type,
      title: message,
      timer: 2500,
      showConfirmButton: false
    });
  
    if (isSuccess) {
      setTimeout(() => {
        // refresh list after deletion
        dispatch(actions.getList(contactInfoUIProps.queryParams));
        // clear selections list
        contactInfoUIProps.setIds([]);
      }, 2500);
    }
  };
  
  const title = <>İletişim Bilgileri (<span style={{color:"red"}}>{personName}</span>)
                  {contactInfoUIProps.ids.length > 0 ?
                  <> [Seçilen Kayıt Sayısı: <span style={{color:"red"}}>{contactInfoUIProps.ids.length}</span>]</> : ""}
                </>;

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-info"
            onClick={contactInfoUIProps.openPersonListPage}
          >
            Kişi Listesi
          </button>
          <button
            type="button"
            className="btn btn-primary ml-2"
            onClick={contactInfoUIProps.openNewContactInfoPage}
          >
            Yeni Bilgi
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={() => deleteContactInfo(contactInfoUIProps.ids)}
          >
            Seçilenleri Sil
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ContactInfoFilter />
        <ContactInfoTable
          deleteContactInfo={deleteContactInfo}
        />
      </CardBody>
    </Card>
  );
}