import React from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";

function Header() {
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>
                    <Link to="/">
                        Simplenote
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to="/create" className="link light">Créer une nouvelle note</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/signup" className="link light">Inscription</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/login" className="link light">Connection</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;