import { navigate } from 'gatsby';
import Img from 'gatsby-image';
import propTypes from 'prop-types';
import React from 'react';

import CloseIcon from '../../assets/svg/CloseIcon';
import { useBag } from '../../context/BagContext';
import { useBagController } from '../../context/BagDisplayContext';
import { currencyMask } from '../../services/maskService';
import NumberSelect from '../NumberSelect';

const BagItem = ({ product }) => {
  const { closeBag } = useBagController();
  const { removeProduct, increaseProductQuantity, decreaseProductQuantity } = useBag();

  const goToProductPage = () => {
    closeBag();
    navigate(`/products/${product.slug}`);
  };

  return (
    <div className="flex flex-row pb-10">
      <button onClick={goToProductPage} className="relative w-24 flex-shrink-0">
        {product.image?.childImageSharp ? (
          <Img fluid={product.image.childImageSharp.fluid} alt={product.name} />
        ) : (
          <img
            className="absolute w-full h-full object-cover"
            src={product.image}
            alt={product.name}
          />
        )}
      </button>
      <div className="w-full flex flex-col justify-between ml-4">
        <div className="w-full flex flex-row justify-between items-start">
          <div className="w-full flex flex-col">
            <span>{product.name}</span>
            <span className="text-xs text-gray-600 mb-2">{currencyMask(product.price)}</span>
          </div>
          <button
            aria-label="Remove from bag"
            onClick={() => removeProduct(product.id)}
            className="h-6 w-6 ml-4"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="self-start">
          <NumberSelect
            quantity={product.quantity}
            increaseQuantity={() => increaseProductQuantity(product.id)}
            decreaseQuantity={() => decreaseProductQuantity(product.id)}
          />
        </div>
        <div className="w-full flex flex-row justify-between pt-3">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-sm font-semibold">
            {currencyMask(product.quantity * product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

BagItem.propTypes = {
  product: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    image: propTypes.oneOfType([propTypes.shape(), propTypes.string]).isRequired,
    seller: propTypes.shape().isRequired,
    slug: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
};

export default BagItem;
