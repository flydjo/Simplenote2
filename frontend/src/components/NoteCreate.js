import React, {useState, useContext} from "react";
import {Redirect} from "react-router-dom";
import {SimplenoteContext} from "../contexts/SimplenoteContext";
import { v4 } from 'uuid'

function NoteCreate() {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [alert, setAlert] = useState(false);
    const [idRedirect, setIdRedirect] = useState("");
    const {setNotesData, notesData, redirect, setRedirect} = useContext(SimplenoteContext);

    function handleChangeTitle(event) {
        const {value} = event.target;
        setTitle(value);
    }

    function handleChangeNote(event) {
        const {value} = event.target;
        setNote(value);
    }

    function handleClick(event) {
        event.preventDefault();

        if (title.length > 0 && note.length > 0) {

            //Notre nouvelle note
            const obj = {
                title,
                text: note,
                date: Date.now(),
                id: v4()
            }

            setAlert(false);
            
            const myInit = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
    
            fetch('http://localhost:3000/create/', myInit)
                .then(res => {
                    if(res.status === 201) {
                        //On ajoute la nouvelle note dans l'array front avant de l'envoyer à la BDD
                        setNotesData([...notesData, obj]);
                        setIdRedirect(obj.id);
                        setRedirect(true);
                        setRedirect(false);
                    }
                });
                
        } else {
            setAlert(true);
        }
    }
    
    return (
        <div>
            {/* Si l'insert c'est bien passé on redirige vers la page d'acceuil */}
            {/* {redirect === true && <Redirect to={`/notes/${idRedirect}`} />} */}
            {redirect === true && <Redirect to="/" />}
            

            {/* Si les champs ne sont pas remplis on affiche le message d'erreur */}
            {alert === true &&
                <div className="alert alert-danger" role="alert">
                    Veuillez remplir les champs obligatoires (*)
                </div>
            }

            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Titre*</label>
                        <input onChange={handleChangeTitle} value={title} type="text" className="form-control" name="title" />
                    </div>                
                </div>    
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label>Note*</label>
                        <textarea onChange={handleChangeNote} value={note} name="note" className="form-control" rows="12" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <button type="submit" onClick={handleClick} className="btn btn-primary">Créer</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NoteCreate;