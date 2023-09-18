import React from "react";
import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
  const data: ProductInterface[] = [
    {
      title: "Smartphone",
      brand: "Samsung",
      barcode: "123456789",
      category: "Electronics",
      price: 499.99,
      image: {
        url: "https://example.com/images/smartphone.jpg",
        alt: "Samsung Smartphone",
      },
    },
    {
      title: "Laptop",
      brand: "HP",
      barcode: "987654321",
      category: "Electronics",
      price: 799.99,
      image: {
        url: "https://example.com/images/laptop.jpg",
        alt: "HP Laptop",
      },
    },
    {
      title: "Coffee Maker",
      brand: "Keurig",
      barcode: "234567890",
      category: "Appliances",
      price: 89.99,
      image: {
        url: "https://example.com/images/coffee-maker.jpg",
        alt: "Keurig Coffee Maker",
      },
    },
    {
      title: "Running Shoes",
      brand: "Nike",
      barcode: "345678901",
      category: "Sporting Goods",
      price: 129.99,
      image: {
        url: "https://example.com/images/running-shoes.jpg",
        alt: "Nike Running Shoes",
      },
    },
    {
      title: "TV",
      brand: "Sony",
      barcode: "456789012",
      category: "Electronics",
      price: 699.99,
      image: {
        url: "https://example.com/images/tv.jpg",
        alt: "Sony TV",
      },
    },
    {
      title: "Toaster",
      brand: "Cuisinart",
      barcode: "567890123",
      category: "Appliances",
      price: 39.99,
      image: {
        url: "https://example.com/images/toaster.jpg",
        alt: "Cuisinart Toaster",
      },
    },
    {
      title: "Couch",
      brand: "IKEA",
      barcode: "678901234",
      category: "Furniture",
      price: 799.99,
      image: {
        url: "https://example.com/images/couch.jpg",
        alt: "IKEA Couch",
      },
    },
    {
      title: "Tennis Racket",
      brand: "Wilson",
      barcode: "789012345",
      category: "Sporting Goods",
      price: 59.99,
      image: {
        url: "https://example.com/images/tennis-racket.jpg",
        alt: "Wilson Tennis Racket",
      },
    },
    {
      title: "Blender",
      brand: "Vitamix",
      barcode: "890123456",
      category: "Appliances",
      price: 199.99,
      image: {
        url: "https://example.com/images/blender.jpg",
        alt: "Vitamix Blender",
      },
    },
    {
      title: "Desk",
      brand: "IKEA",
      barcode: "901234567",
      category: "Furniture",
      price: 149.99,
      image: {
        url: "https://example.com/images/desk.jpg",
        alt: "IKEA Desk",
      },
    },
  ];

  return (
    <Grid container spacing={2} pb={2}>
      {data.map((product: ProductInterface) => (
        <Grid item key={product.barcode} xs={12} sm={6} md={6} lg={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsPage;
