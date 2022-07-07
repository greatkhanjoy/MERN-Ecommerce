import { Link } from 'react-router-dom'
import Rating from './utill/Rating'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">{product.name}</h3>
        <Rating value={product.rating} text={product.numReviwes} />
      </div>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </Link>
  )
}

export default ProductCard
