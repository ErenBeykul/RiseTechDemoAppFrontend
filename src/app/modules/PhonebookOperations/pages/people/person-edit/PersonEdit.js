import React, { useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import * as actions from "../../../_redux/people/PeopleAction";
import { 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ModalProgressBar
} from "../../../../../../_metronic/_partials/controls";
import { PersonEditForm } from "./PersonEditForm";

export function PersonEdit({
  history,
  match: {
    params: { id }
  }
}) {
  const dispatch = useDispatch();
  const { actionsLoading, person } = useSelector(
    (state) => ({
      actionsLoading: state.people.actionsLoading,
      person: state.people.person
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.getPerson(id));
  }, [id, dispatch]);

  // Rehbere Belli Bir Kişiyi Kaydeder
  const savePerson = (values) => {
    dispatch(actions.savePerson(values)).then((result) => onResult(result));
  };  
  
  const onResult = ({ isSuccess, type, message }) => {
    Swal.fire({
      icon: type,
      title: message,
      timer: 2500,
      showConfirmButton: false
    });

    if (isSuccess) setTimeout(() => history.push(`/kisiler`), 2500);
  };

  const btnRef = useRef();  
  const savePersonClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };
  
  let title = "Kişi";
  let action = id ? "Düzenle" : "Ekle";
  title = title + " " + action;

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title} />
      <CardBody>
        <div className="mt-5">          
          <PersonEditForm 
            person={person}
            btnRef={btnRef} 
            savePerson={savePerson}
          />
        </div>        
      </CardBody>
      <CardFooter>
        <div className="offset-sm-2">          
          <button
            type="submit"
            className="btn btn-primary"
            onClick={savePersonClick}
          >
            Kaydet
          </button>          
        </div>
      </CardFooter>
    </Card>
  );
}