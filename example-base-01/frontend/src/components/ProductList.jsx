import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:3000/app`)
            .then(res => {
                const persons = res.data;
                setProducts([...persons]);
            })
            .catch(err => {
                setError(`Failed to load products`);
              });
    }, []);


    return (
        <div>
      {error ? (
        <p>{error}</p>
      ) : (
        products.map((p, index) => (
          <div key={index} style={{ borderStyle: 'solid' }}>
            <p>title: {p.title}</p>
            <p>description: {p.description}</p>
          </div>
        ))
      )}
      ProductList
    </div>
    )
}

export default ProductList