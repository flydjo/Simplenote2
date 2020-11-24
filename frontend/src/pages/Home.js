import React from "react";
import Notes from "../components/Notes";
import NoteDetails from "../components/NoteDetails";
import NoteCreate from "../components/NoteCreate";
import NoteEdit from "../components/NoteEdit";
import Welcome from "../components/Welcome";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import {Switch, Route} from "react-router-dom";

function Home() {

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-3 border-right mt-3 notes-liste" style={{"maxHeight": "100vh", "minHeight": "100vh","overflowY": "scroll"}}>
                    <Notes />
                </div>
                <div className="col-9 mt-3">
                    <Switch>
                        <Route exact path="/">
                            <Welcome />
                        </Route>
                        <Route path="/notes/:id">
                            <NoteDetails />
                        </Route>
                        <Route path="/create">
                            <NoteCreate />
                        </Route>
                        <Route path="/edit/:id">
                            <NoteEdit />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Home;