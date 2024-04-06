import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface Props {
  items: Product[];
  onDelete: (productId: number) => void;
}

function ShoppingCart({ items, onDelete }: Props) {
  return (
    <div>
      <h2 className="text-center">Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="centered-text">
          <p>No items in the cart</p>
        </div>
      ) : (
        <div>
          <div className="d-flex flex-wrap justify-content-center">
            {items.map((product) => (
              <Card key={product.id} style={{ width: "18rem", margin: "10px" }}>
                <Card.Img variant="top" src={product.thumbnail} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    Description: {product.description}
                    <br />
                    Price: ${product.price}
                    <br />
                    Discount: {product.discountPercentage}%<br />
                    Rating: {product.rating}
                    <br />
                    Stock: {product.stock}
                    <br />
                    Brand: {product.brand}
                    <br />
                    Category: {product.category}
                    <br />
                  </Card.Text>
                  <Button variant="danger" onClick={() => onDelete(product.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <p>
              Total Quantity:{items.length}
            </p>
            <p>
              Total: $
              {items.reduce((total, product) => total + product.price, 0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
