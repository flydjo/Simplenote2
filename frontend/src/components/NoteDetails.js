import React, {useEffect, useState, useContext} from "react";
import {useParams, Redirect, Link} from "react-router-dom";
import {SimplenoteContext} from "../contexts/SimplenoteContext";
import {Spinner} from "react-bootstrap";
import VerticallyCenteredModal from "./VerticallyCenteredModal";
import useHover from "../hooks/useHover";

function NoteDetails(props) {
    const {id} = useParams();
    const [noteData, setNoteData] = useState([]);
    const {formatDate, redirect, setRedirect} = useContext(SimplenoteContext);
    const [modalShow, setModalShow] = React.useState(false);
    const [hovered, ref] = useHover();
    const [hovered1, ref1] = useHover();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        fetch("http://localhost:3000/notes/" + id)
            .then(res => res.json())
            .then(res => {
                if (isMounted) {
                    setNoteData(res);
                    setLoading(false);
                }
            })
        return () => { 
            isMounted = false;
        };
    }, [id]);

    function handleClick() {
        setModalShow(true);
    }

    function trashIcon() {
        if (hovered) {
            return "bi bi-trash-fill icon-action";
        } else {
            return "bi bi-trash icon-action";
        }
    }

    function pencilIcon() {
        if (hovered1) {
            return "bi bi-pencil-fill icon-action";
        } else {
            return "bi bi-pencil icon-action";
        }
    }

    return (
        <div>
            {redirect === true && <Redirect to="/" />}
            {
                loading === true 
                ?
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> 
                :
                <div>
                    <h4>{noteData.title}</h4>
                    <h6>Fait le : {formatDate(noteData.date)}</h6>
                    <p className="mt-4">{noteData.text}</p>
                    <svg
                        onClick={() => handleClick()}
                        width="1.5em" 
                        height="1.5em" 
                        viewBox="0 0 16 16"                 
                        className={trashIcon()}
                        ref={ref}
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
        
                    <Link to={`/edit/${noteData.id}`}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" ref={ref1} className={pencilIcon()} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </Link>
                </div>
            }

            <VerticallyCenteredModal
                show={modalShow} 
                onHide={() => setModalShow(false)} 
                onClick={() => setModalShow(!modalShow)}
                text={{title: "Suppression", body: "Êtes vous sur de vouloir supprimer cette note ?"}}
                id={id}
            />
        </div>
    );
}

export default NoteDetails;