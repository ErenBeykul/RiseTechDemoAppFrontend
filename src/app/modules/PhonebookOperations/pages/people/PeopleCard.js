import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../_redux/people/PeopleAction";
import Swal from "sweetalert2";
import { 
  Card, 
  CardBody, 
  CardHeader,
  CardHeaderToolbar
} from "../../../../../_metronic/_partials/controls";
import { PeopleFilter } from "./people-filter/PeopleFilter";
import { PeopleTable } from "./people-table/PeopleTable";
import { usePeopleUIContext } from "./PeopleUIContext";

export function PeopleCard() {
  // People UI Context
  const peopleUIContext = usePeopleUIContext();
  const peopleUIProps = useMemo(() => {
    return {
      ids: peopleUIContext.ids,
      setIds: peopleUIContext.setIds,
      queryParams: peopleUIContext.queryParams,
      openNewPersonPage: peopleUIContext.openNewPersonPage,
    };
  }, [peopleUIContext]);
    
  // People Redux state
  const dispatch = useDispatch();
    
  // Rehberdeki Belli Bir Kişi Listesini Siler
  const deletePeople = (ids) => {
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
      text: "İlgili kişi(ler) sistemden silinecektir.",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',        
    }).then(result => {
      if(result.isConfirmed) dispatch(actions.deletePeople(ids)).then(result => onResult(result));
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
        dispatch(actions.getPeople(peopleUIProps.queryParams));
        // clear selections list
        peopleUIProps.setIds([]);
      }, 2500);
    }
  };
  
  const title = <>Kişi Listesi{peopleUIProps.ids.length > 0 ?
                  <> [Seçilen Kayıt Sayısı: <span style={{color:"red"}}>{peopleUIProps.ids.length}</span>]</> :
                  ""}
                </>;

  return (
    <Card>
      <CardHeader title={title}>
        <CardHeaderToolbar>            
          <button
            type="button"
            className="btn btn-primary"
            onClick={peopleUIProps.openNewPersonPage}
          >
            Yeni Kişi
          </button>          
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={() => deletePeople(peopleUIProps.ids)}
          >
            Seçilenleri Sil
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PeopleFilter />
        <PeopleTable
          deletePeople={deletePeople}
        />
      </CardBody>
    </Card>
  );
}