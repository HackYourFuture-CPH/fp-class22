import React, { useEffect, useState } from 'react';
import ViewDropdown from '../../components/ViewDropDown/ViewDropdown.component';
import { apiURL } from '../../apiURL';
import PropTypes from 'prop-types';
import './DropdownGroup.Style.css';

export const DropdownGroup = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [showVariants, setShowVariants] = useState(false);
  const [filteredSize, setFilteredSize] = useState([]);
  const [filteredQuantity, setFilteredQuantity] = useState([]);

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

  const fetchVariantsByColor = async (color) => {
    let filteredSizes = [];
    let filteredQuantities = [];
    const response = await fetch(
      `${apiURL()}/variants?color=${color}&product_id=${productId}`,
    );
    const filteredVariantsData = await response.json();
    filteredVariantsData.forEach((variant) => {
      filteredSizes.push(variant.size);
      filteredQuantities.push(variant.stock);
    });
    filteredSizes = [...new Set(filteredSizes)];
    filteredQuantities = [...new Set(filteredQuantities)];
    const maxQuantity = Math.max(...filteredQuantities);
    if (maxQuantity >= 5) {
      filteredQuantities = [...Array(10).keys()].map((i) => i + 1);
    } else {
      filteredQuantities = [...Array(maxQuantity).keys()].map((i) => i + 1);
    }
    setFilteredSize(filteredSizes);
    setFilteredQuantity(filteredQuantities);
    setShowVariants(true);
  };

  return (
    <div className="dropdown-group-list">
      <div className="dropdown-group">
        <ViewDropdown
          options={colors}
          label="Color"
          onSelect={(color) => fetchVariantsByColor(color)}
        />
      </div>
      <div className="dropdown-group">
        {!showVariants ? (
          <ViewDropdown options={sizes} label="Size" disabled="disabled" />
        ) : (
          <ViewDropdown options={filteredSize} label="Size" />
        )}
      </div>
      <div className="dropdown-group">
        {!showVariants ? (
          <ViewDropdown
            options={quantities}
            label="Quantity"
            disabled="disabled"
          />
        ) : (
          <ViewDropdown options={filteredQuantity} label="Quantity" />
        )}
      </div>
    </div>
  );
};

DropdownGroup.propTypes = {
  productId: PropTypes.number.isRequired,
};
