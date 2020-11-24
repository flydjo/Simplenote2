import React, {useContext} from "react";
import {Link} from "react-router-dom";
import { SimplenoteContext } from "../contexts/SimplenoteContext";

function Notes() {
    const {notesData, formatDate} = useContext(SimplenoteContext);

    const notes = notesData.map(note => (
        <Link to={`/notes/${note.id}`} key={note.id}>
            <div>
                <h4>
                    {note.title}
                </h4>
                <p className="text-truncate">
                    {note.text}
                </p>
                <h6>{formatDate(note.date)}</h6>
                <hr />
            </div>
        </Link>
    ));

    return (
        <div>
            {notes}
        </div>
    );
}

export default Notes;