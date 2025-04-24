import React from "react";
import { Form, FormControl, Button, Dropdown, InputGroup } from "react-bootstrap";

export default function SearchBar() {

    return (
        <Form>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Rechercher..."
                />

                <Button variant="danger" type="submit">
                    <i className="fa fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
}