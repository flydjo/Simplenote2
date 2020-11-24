import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {SimplenoteContext} from "../contexts/SimplenoteContext";

function NoteEdit() {

    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [noteId, setNoteId] = useState("");
    const {notesData, setNotesData} = useContext(SimplenoteContext);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [textAlert, setTextAlert] = useState("");
    const [alertLevel, setAlertLevel] = useState("");

    useEffect(() => {
        let isMounted = true;
        fetch("http://localhost:3000/notes/" + id)
            .then(res => res.json())
            .then(res => {
                if (isMounted) {
                    setTitle(res.title);
                    setNote(res.text);
                    setNoteId(res.id);
                }
            })
        return () => { isMounted = false };
    }, [id]);

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
            setLoading(true);

            var obj = {                
                title: title,
                text: note,
                date: Date.now(),
                id: noteId
            };

            const myInit = {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            fetch('http://localhost:3000/edit/' + id, myInit)
                .then(res => {
                    if (res.status === 201) {
                        //On met à jour seulement l'entrée de l'array nécessaire
                        const elementIndex = notesData.findIndex((obj => obj.id === id));
                        const updatedArray = [...notesData];
                        updatedArray[elementIndex] = {...updatedArray[elementIndex], title: obj.title, text: obj.text}

                        setNotesData(updatedArray);
                        setLoading(false);
                        setAlert(true);
                        setAlertLevel("alert alert-success");
                        setTextAlert("Modification bien effectué");
                    }
                })
                .catch(err => console.log(err));
        } else {
            setAlert(true);
            setAlertLevel("alert alert-danger");
            setTextAlert("Veuillez remplir tout les champs obligatoire (*)")
        }
        
    }

    return (
        <div>
            {alert === true &&
                <div className={alertLevel} role="alert">
                    {textAlert}
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
                        <button type="submit" onClick={handleClick} className="btn btn-primary" disabled={loading}>
                            {loading ? "Modification en cours" : "Edit"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NoteEdit;