import React from "react";
import { Users } from "lucide-react";
import { Product, FunnelStage, DeviceType } from "../../types";
import "./ProductRanking.css";

interface ProductRankingProps {
  products: Product[];
  selectedStage: FunnelStage;
  selectedDevice: DeviceType | "all";
}

const ProductRanking: React.FC<ProductRankingProps> = ({
  products,
  selectedDevice,
}) => {
  // Sort products by views
  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) => {
      const viewsA =
        selectedDevice === "all" ? a.views.total : a.views[selectedDevice];

      const viewsB =
        selectedDevice === "all" ? b.views.total : b.views[selectedDevice];

      return viewsB - viewsA;
    });
  }, [products, selectedDevice]);

  // Get the correct value based on selected device
  const getViews = (product: Product) => {
    return selectedDevice === "all"
      ? product.views.total
      : product.views[selectedDevice];
  };

  return (
    <div className="product-ranking-container">
      <h2 className="product-ranking-title">Top Products</h2>

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                loading="lazy"
              />
              {/* Sessions overlay */}
              <div className="product-sessions-overlay">
                <Users size={14} className="sessions-icon" />
                <span className="sessions-count">
                  {getViews(product).toLocaleString()}
                </span>
              </div>
              {/* Product name overlay */}
              <div className="product-name-overlay">{product.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRanking;
