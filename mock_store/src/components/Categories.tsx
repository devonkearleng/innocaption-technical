import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

interface CategoriesProps {
  onCategoriesSearchClick: (query: string) => void;
}

function CategoriesList({ onCategoriesSearchClick }: CategoriesProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const responseData = await response.json();
        setCategories(responseData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleCategorySearch = (categoryName: string) => {
    onCategoriesSearchClick(categoryName);
  };

  return (
    <div>
      <h2 className="text-center">Categories</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListGroup>
          {categories.map((category) => (
            <ListGroup.Item
              key={category}
              action
              onClick={() => handleCategorySearch(category)}
            >
              {category}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
export default CategoriesList;
