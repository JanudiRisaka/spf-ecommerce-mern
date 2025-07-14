import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden rounded-t-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
        
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
            {!product.inStock && (
              <Badge variant="secondary" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </CardHeader>
        
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.inStock && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                In Stock
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}