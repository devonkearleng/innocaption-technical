import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

interface NavbarProps {
  onProductListClick: () => void;
  onSearchClick: (query: string) => void;
  onCategoriesClick: () => void;
  onShoppingCartClick: () => void;
}

function NavbarComp({ onProductListClick, onSearchClick, onCategoriesClick, onShoppingCartClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    onSearchClick(searchQuery); 
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Mock Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          <Nav.Link href="#" onClick={onProductListClick}>
            Product List
          </Nav.Link>
          <Nav.Link href="#" onClick={onShoppingCartClick}>
            Shopping Cart
          </Nav.Link>
          <Nav.Link href="#" onClick={onCategoriesClick}>
            Categories
          </Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>{" "}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
