import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductView.styles.css';
import * as view from './index'; // Using "barrel exports" to organize React components

export const ProductView = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProduct = async (productId) => {
      const response = await fetch(`${view.apiURL()}/products/${productId}`);
      const productData = await response.json();

      setProduct(productData);
    };

    fetchSingleProduct(id);
  }, [id]);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-view-page">
      <view.ProductContainer>
        <view.ProductViewBreadcrumbs category="jeans" />
        <view.GoBackButton
          text="Back to search results"
          onClick={navigateBack}
        />
        <view.ProductViewWrapper>
          <view.ProductViewImageWrapper>
            <view.ProductImage
              topSide={view.topSide}
              middleSide={view.middleSide}
              bottomSide={view.bottomSide}
              bigImage={view.bigImage}
            />
          </view.ProductViewImageWrapper>
          <view.ProductViewDescription>
            {product.map((prod) => (
              <view.ProductDescription
                key={prod.id}
                product={prod}
                rating={5}
              />
            ))}
            <view.DropdownGroup productId={product.id} />
            <view.ProductViewButtons />
          </view.ProductViewDescription>
          <view.ProductViewReviewsWrapper>
            <view.ProductReviewsContainer id={id} />
          </view.ProductViewReviewsWrapper>
        </view.ProductViewWrapper>

        <view.RelatedItems category="shoes" />
      </view.ProductContainer>
      <div className="product-view-blank">&nbsp;</div>
    </div>
  );
};
