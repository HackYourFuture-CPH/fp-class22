import React, { useEffect, useState } from 'react';
import ViewDropdown from '../../components/ViewDropDown/ViewDropdown.component';
import { apiURL } from '../../apiURL';
import PropTypes from 'prop-types';
import './DropdownGroup.Style.css';

export const DropdownGroup = ({ productId, showSelectedValue }) => {
  const [variants, setVariants] = useState([]);

  let colors = [];
  let sizes = [];
  let quantities = [];

  useEffect(() => {
    const fetchVariantsByProductId = async () => {
      const response = await fetch(
        `${apiURL()}/variants?product_id=${productId}`,
      );
      const variantsProductData = await response.json();
      if (typeof variantsProductData !== 'string') {
        setVariants(variantsProductData);
      }
    };

    fetchVariantsByProductId();
  }, [productId]);

  variants.forEach((variant) => {
    colors.push(variant.color);
    sizes.push(variant.size);
    quantities.push(variant.stock);
  });

  colors = [...new Set(colors)];
  sizes = [...new Set(sizes)];
  quantities = [...new Set(quantities)];

  const variantQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedVariantType = (variantType, variantValue) => {
    showSelectedValue(variantType, variantValue);
  };

  return (
    <div className="dropdown-group-list">
      <div className="dropdown-group">
        <ViewDropdown
          options={colors}
          label="Color"
          onSelect={(color) => selectedVariantType('color', color)}
        />
      </div>
      <div className="dropdown-group">
        <ViewDropdown
          options={sizes}
          label="Size"
          onSelect={(size) => selectedVariantType('size', size)}
        />
      </div>
      {/*  <div className="dropdown-group">
        <ViewDropdown
          options={quantities}
          label="Quantity"
          onSelect={() => {}}
        />
      </div> */}

      <div className="dropdown-group">
        <ViewDropdown
          options={variantQuantity}
          label="Quantity"
          onSelect={(quantity) => selectedVariantType('quantity', quantity)}
        />
      </div>
    </div>
  );
};

DropdownGroup.propTypes = {
  productId: PropTypes.number.isRequired,
  showSelectedValue: PropTypes.func.isRequired,
};
