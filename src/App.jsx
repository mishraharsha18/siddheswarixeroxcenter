import React from 'react';
import { useState } from 'react'
import ProductPage from './pages/product/ProductPage';
import AddProductForm from './pages/product/AddProductForm ';
import AppRoutes from './router/index';
import AppLayout from './Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <>
      {/* <h1 className="text-3xl font-bold  underline">
      Hello world!
    </h1>
    <ProductPage />
    <AddProductForm /> */}
        {/* <AppLayout
        content={AppRoutes}
        /> */}
        <AppRoutes/>

    
    </>
  )
}

export default App
