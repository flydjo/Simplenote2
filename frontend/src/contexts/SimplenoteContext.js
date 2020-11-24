import React, {useState, useEffect} from "react";
const SimplenoteContext = React.createContext();

function SimplenoteContextProvider(props) {
    const [notesData, setNotesData] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [dataOneNote, setDataOneNote] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch('http://localhost:3000/notes/')
            .then(res => res.json())
            .then(data => {
                if(isMounted) {
                    setNotesData(data);
                }
            });
        
        return () => { isMounted = false };
    }, []);

    function getOneNote(id) {
        fetch("http://localhost:3000/notes/" + id)
            .then(res => res.json())
            .then(res => setDataOneNote(res));

        return dataOneNote;
    }

    function formatDate(date) {
        const d = new Date(date);
        const dateWithFormat = d.toLocaleDateString();
    
        return dateWithFormat;
    }

    function deleteNote(id) {
        const myInit = {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        fetch('http://localhost:3000/delete/' + id, myInit)
            .then(res => {
                if(res.status === 201) {
                    setRedirect(true);
                }
                setRedirect(false);
            })
            .catch(err => console.log(err))
    }

    return (
        <SimplenoteContext.Provider 
            value={{notesData, formatDate, deleteNote, setNotesData, redirect, setRedirect, getOneNote}}
        >
            {props.children}
        </SimplenoteContext.Provider>
    );
}

export {SimplenoteContextProvider, SimplenoteContext};