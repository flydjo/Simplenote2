import React, {useContext} from "react";
import {Modal, Button} from "react-bootstrap";
import {SimplenoteContext} from "../contexts/SimplenoteContext";

function VerticallyCenteredModal(props) {
    const {deleteNote, notesData, setNotesData} = useContext(SimplenoteContext);

    const handleClick = id => {
        let arr = notesData.filter(note => note.id !== id);
        setNotesData(arr);
        deleteNote(id);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.text.title}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.text.body}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Annuler</Button>
                <Button onClick={() => handleClick(props.id)} variant="danger">Supprimer</Button>
            </Modal.Footer>
      </Modal>
    );
}

export default VerticallyCenteredModal;