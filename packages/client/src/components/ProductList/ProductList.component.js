import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { apiURL } from '../../apiURL';
import { ProductPropType } from '../../ProductPropType';
import './ProductList.component.css';
import { useUserContext } from '../../userContext';
import ProductCard from '../ProductCard/ProductCard.component';
import Modal from '../Modal/Modal.component';

export default function ProductList({ isLoading, products, filteredProducts }) {
  const [openModal, setOpenModal] = useState();
  const toggleModal = () => {
    setOpenModal(false);
  };
  const { user } = useUserContext();

  const addFavorite = (key) => {
    fetch(`${apiURL()}/favorites`, {
      method: 'POST',
      headers: {
        token: `token ${user?.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: key,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {});
      }
    });
  };
  const ListOfProducts = filteredProducts.map((product) => {
    return (
      <div className="product" key={product.id}>
        <ProductCard
          key={product.id}
          title={product.name}
          price={product.price}
          id={product.id}
          favoritesID={product.favoritesID}
          isFavorite={product.favoritesID !== null}
          addFavorite={addFavorite}
          setOpenModal={setOpenModal}
        />
      </div>
    );
  });

  return (
    <div className="product-list-container">
      {isLoading && <p>Loading...</p>}
      {products.length === 0 || filteredProducts.length === 0 ? (
        <p>There is no product available</p>
      ) : (
        <div className="rendered-product">{ListOfProducts}</div>
      )}
      <Modal
        title="Please Login to save your Favorites.."
        open={!user ? openModal : null}
        toggle={toggleModal}
      >
        .
      </Modal>
    </div>
  );
}
ProductList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(ProductPropType).isRequired,
  filteredProducts: PropTypes.arrayOf(ProductPropType).isRequired,
};
