import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Button, Alert } from "react-bootstrap";

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
  query: string;
  addToCart: (product: Product) => void;
}

function CategorySearch({ query, addToCart }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string | null>(null); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/" + query
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const responseData = await response.json();
        setProducts(responseData.products);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (query !== "") {
      fetchProducts();
    }
  }, [query]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart(product.title);
    setTimeout(() => {
      setAddedToCart(null);
    }, 3000);
  };

  return (
    <div>
      <h2 className="text-center">{query} Results</h2>
      {addedToCart && (
        <Alert
          variant="success"
          onClose={() => setAddedToCart(null)}
          dismissible
          className="text-center"
        >
          {addedToCart} has been added to the cart successfully!
        </Alert>
      )}
      <div className="d-flex flex-wrap justify-content-center">
        {isLoading ? (
          <div className="centered-text">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="centered-text">
            <p>Error: {error}</p>
          </div>
        ) : (
          products.map((product) => (
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
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default CategorySearch;
