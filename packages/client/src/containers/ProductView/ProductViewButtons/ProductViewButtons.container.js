import React from 'react';
import PropTypes from 'prop-types';
import { ViewPageButton } from '../../../components/ViewPageButton/ViewPageButton.component';
import './ProductViewButtons.styles.css';

export const ProductViewButtons = ({ buyNowFn }) => {
  const buyNowHandler = () => {
    buyNowFn();
  };

  return (
    <div className="product-view-buttons">
      <ViewPageButton
        label="Buy Now"
        backgroundColor="#F5F5F5"
        onClick={buyNowHandler}
      />
      <ViewPageButton
        label="Add to Cart"
        backgroundColor="#D9D9D9"
        onClick={() => {}}
      />
      <ViewPageButton
        label="Add to Favorites"
        backgroundColor="#D9D9D9"
        onClick={() => {}}
      />
    </div>
  );
};
ProductViewButtons.propTypes = {
  buyNowFn: PropTypes.func.isRequired,
};
