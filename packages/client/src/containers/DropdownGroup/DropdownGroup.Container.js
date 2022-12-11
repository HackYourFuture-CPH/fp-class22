import React from 'react';
import ViewDropdown from '../../components/ViewDropDown/ViewDropdown.component';
import './DropdownGroup.Style.css';

export const DropdownGroup = (productId) => {
  const Colors = ['Black', 'White', 'Blue', 'Half-white'];
  const Sizes = ['Small', 'Medium', 'Large', 'XL', 'XXL'];
  const Quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const variants = [
    {
      id: 9,
      product_id: 7,
      color: 'merun',
      size: '3XL',
      pictureUrl: 'packages/client/src/assets/jeans&shoes.jpg',
      stock: 18,
    },
  ];

  variants.forEach((variant) => {
    if (!Colors.includes(variant.color)) {
      Colors.push(variant.color);
    }
    if (!Sizes.includes(variant.size)) {
      Sizes.push(variant.size);
    }
    if (!Quantities.includes(variant.stock)) {
      Quantities.push(variant.stock);
    }
  });

  return (
    <div className="dropdown-group-list">
      <div className="dropdown-group">
        <ViewDropdown options={Colors} label="Color" />
      </div>
      <div className="dropdown-group">
        <ViewDropdown options={Sizes} label="Size" />
      </div>
      <div className="dropdown-group">
        <ViewDropdown options={Quantities} label="Quantity" />
      </div>
    </div>
  );
};
