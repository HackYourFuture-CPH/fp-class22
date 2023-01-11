import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductView.styles.css';
import * as view from './index'; // Using "barrel exports" to organize React components
import { apiURL } from './index';
import { useUserContext } from '../../userContext';

export const ProductView = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchSingleProduct = async (productId) => {
      const response = await fetch(`${view.apiURL()}/products/${productId}`);
      const productData = await response.json();

      if (typeof productData === 'string') {
        navigate('/not-found');
      } else {
        setProduct(productData);
      }
    };

    fetchSingleProduct(id);
  }, [id, navigate]);

  const navigateBack = () => {
    navigate(-1);
  };
  const [orderValue, setOrderValue] = useState({
    size: '',
    color: '',
    quantity: '',
  });
  const showSelectedValue = (variantType, variantValue) => {
    if (variantType === 'color') {
      setOrderValue((preValue) => {
        return { ...preValue, color: variantValue };
      });
    }
    if (variantType === 'size') {
      setOrderValue((preValue) => {
        return { ...preValue, size: variantValue };
      });
    }
    if (variantType === 'quantity') {
      setOrderValue((preValue) => {
        return { ...preValue, quantity: variantValue };
      });
    }
  };
  const buyNowHandler = () => {
    const postOrder = Object.assign(orderValue, ...product);
    fetch(`${apiURL()}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.uid}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: postOrder.id,
        color: postOrder.color,
        size: postOrder.size,
        quantity: postOrder.quantity,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (data.successful) {
            navigate('/shopping-cart');
          }
        });
      }
    });

    //
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
            <view.DropdownGroup
              showSelectedValue={showSelectedValue}
              productId={Number(id)}
            />
            <view.ProductViewButtons buyNowFn={buyNowHandler} />
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
