import React, {useState, useContext} from "react";
import {Form, Button} from "react-bootstrap";
import {SimplenoteContext} from "../contexts/SimplenoteContext";
import {Redirect} from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {redirect, setRedirect} = useContext(SimplenoteContext);

    function regexEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validateEmail() {
        if (regexEmail(email)) {
            return true;
        } else {
            return false;
        }
    }

    function handleChangeEmail(event) {
        const {value} = event.target;
        setEmail(value);
    }

    function handleChangePassword(event) {
        const {value} = event.target;
        setPassword(value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const isValidate = validateEmail();

        if(isValidate === true && password.length > 0) {
            const obj = {
                email,
                password
            }

            const myInit = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }    
            }

            fetch('http://localhost:3000/auth/signup', myInit)
                .then(res => {
                    if(res.status === 201) {
                        setRedirect(true);
                        setRedirect(false);
                    }
                })
                .catch();
        } else {
            console.log('Manque d\'infos');
        }
    }

    return(
        <div>
            {redirect === true && <Redirect to="/" />}
            <Form>
                <Form.Group controlId="formEmailAdress">
                    <Form.Label>
                        Adresse email
                    </Form.Label>
                    <Form.Control onChange={handleChangeEmail} name="email" type="email" placeholder="Entrez votre email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>
                        Mot de passe
                    </Form.Label>
                    <Form.Control onChange={handleChangePassword} name="password" type="password" placeholder="Entrez un mot de passe" />
                    <Form.Text>
                        6 caractères minimum
                    </Form.Text>
                </Form.Group>

                <Button onClick={handleSubmit} type="primary" type="submit">
                    S'inscrire
                </Button>
            </Form>
        </div>
    );
}

export default Signup;