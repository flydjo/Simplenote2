import React from "react";
import {Form, Button} from "react-bootstrap";

function Login() {
    return (
        <div>
            <Form>
                <Form.Group controlId="formEmailAdress">
                    <Form.Label>
                        Adresse email
                    </Form.Label>
                    <Form.Control name="email" type="email" placeholder="Entrez votre email" />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>
                        Mot de passe
                    </Form.Label>
                    <Form.Control name="password" type="password" placeholder="Entrez un mot de passe" />
                    <Form.Text>
                        6 caractères minimum
                    </Form.Text>
                </Form.Group>

                <Button type="primary" type="submit">
                    Se connecter
                </Button>
            </Form>
        </div>
    );
}

export default Login;