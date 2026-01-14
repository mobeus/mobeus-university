/**
 * ProductCatalog
 * Display products grouped by category with details
 */

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Package, CreditCard, Building, Smartphone } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface Product {
    id: string;
    name: string;
    description: string;
    price?: string;
    features?: string[];
    actionPhrase?: string;
}

interface ProductCategory {
    id: string;
    name: string;
    icon?: string;
    description?: string;
    products: Product[];
}

interface ProductCatalogProps {
    categories: ProductCategory[];
    expandFirst?: boolean;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    package: Package,
    card: CreditCard,
    building: Building,
    phone: Smartphone,
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
    categories = [],
    expandFirst = true,
    animationClass = "",
    isExiting = false,
}) => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>(
        expandFirst && categories.length > 0 ? [categories[0].id] : []
    );
    const { playClick } = useSound();

    const toggleCategory = (categoryId: string) => {
        playClick();
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleProductClick = (product: Product) => {
        playClick();
        if (product.actionPhrase) {
            sendToTele(product.actionPhrase);
        }
    };

    return (
        <div className={`w-full space-y-4 ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {categories.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const IconComponent = iconMap[category.icon || "package"] || Package;

                return (
                    <div key={category.id} className="rounded-xl border border-gray-200 overflow-hidden">
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-cyan-100 rounded-lg">
                                    <IconComponent className="w-6 h-6 text-cyan-600" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                    {category.description && (
                                        <p className="text-sm text-gray-500">{category.description}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">{category.products.length} products</span>
                                {isExpanded ? (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                )}
                            </div>
                        </button>

                        {/* Products */}
                        {isExpanded && (
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="grid gap-3">
                                    {category.products.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleProductClick(product)}
                                            className={`p-4 rounded-lg border border-gray-100 hover:border-cyan-300 hover:shadow-md transition-all ${product.actionPhrase ? "cursor-pointer" : ""}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                                                    <p className="text-sm text-gray-600 mt-0.5">{product.description}</p>
                                                    {product.features && product.features.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {product.features.slice(0, 3).map((feature, idx) => (
                                                                <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                                                                    {feature}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                {product.price && (
                                                    <span className="text-lg font-bold text-cyan-600 ml-4">{product.price}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductCatalog;
