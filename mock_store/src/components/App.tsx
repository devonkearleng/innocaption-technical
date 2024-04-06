import React, { useState } from "react";
import NavbarComp from "./Navbar";
import ProductList from "./ProductList";
import SearchList from "./Search";
import CategoriesList from "./Categories";
import CategorySearch from "./CategoriesSearch"; 
import ShoppingCart from "./ShoppingCart";
import "bootstrap/dist/css/bootstrap.min.css";

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

function App() {
  const [showProductList, setShowProductList] = useState(true);
  const [showSearchList, setShowSearchList] = useState(false);
  const [showCategoriesList, setShowCategoriesList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]); 

  const handleProductListClick = () => {
    setShowProductList(true);
    setShowSearchList(false);
    setShowCategoriesList(false);
    setShowCategorySearch(false);
    setShowShoppingCart(false);
  };

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
    setShowSearchList(true);
    setShowProductList(false);
    setShowCategoriesList(false);
    setShowCategorySearch(false);
    setShowShoppingCart(false);
  };

  const handleCategoriesClick = () => {
    setShowCategoriesList(true);
    setShowSearchList(false);
    setShowProductList(false);
    setShowCategorySearch(false);
    setShowShoppingCart(false);
  };

  const handleCategorySearchClick = (query: string) => {
    setCategoryQuery(query);
    setShowCategorySearch(true);
    setShowCategoriesList(false);
    setShowSearchList(false);
    setShowProductList(false);
    setShowShoppingCart(false);
  };

  const handleShoppingCartClick = () => {
    setShowShoppingCart(true);
    setShowCategorySearch(false);
    setShowCategoriesList(false);
    setShowSearchList(false);
    setShowProductList(false);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]); 
  };

 const handleDeleteFromCart = (productId: number) => {
   const index = cartItems.findIndex((product) => product.id === productId);
   if (index !== -1) {
     const updatedCartItems = [...cartItems];
     updatedCartItems.splice(index, 1);
     setCartItems(updatedCartItems);
   }
 };


  return (
    <div>
      <NavbarComp
        onProductListClick={handleProductListClick}
        onSearchClick={handleSearchClick}
        onCategoriesClick={handleCategoriesClick}
        onShoppingCartClick={handleShoppingCartClick}
      />
      {showProductList && <ProductList addToCart={handleAddToCart}/>}
      {showSearchList && <SearchList query={searchQuery} addToCart={handleAddToCart}/>}
      {showCategoriesList && (
        <CategoriesList onCategoriesSearchClick={handleCategorySearchClick} />
      )}
      {showCategorySearch && (
        <CategorySearch query={categoryQuery} addToCart={handleAddToCart} />
      )}{" "}
      {showShoppingCart && <ShoppingCart items={cartItems} onDelete={handleDeleteFromCart} />}{" "}
    </div>
  );
}

export default App;
