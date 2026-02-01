/**
 * Product - GENERIC
 * Product display with images, pricing, and add to cart
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, Plus, Minus, Check, LucideIcon, Zap, Heart, Share2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ProductImage {
    imageUrl?: string;
    imagePrompt?: string;
}

interface ProductFeature {
    icon?: string;
    text: string;
}

interface ProductSpec {
    label: string;
    value: string;
}

interface ProductProps {
    images?: ProductImage[];
    name?: string;
    brand?: string;
    rating?: number;
    reviewCount?: number;
    price?: string;
    originalPrice?: string;
    description?: string;
    features?: ProductFeature[];
    specs?: ProductSpec[];
    inStock?: boolean;
    stockLabel?: string;
    addToCartLabel?: string;
    addToCartPhrase?: string;
    buyNowLabel?: string;
    buyNowPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Product: React.FC<ProductProps> = ({
    images,
    name,
    brand,
    rating,
    reviewCount,
    price,
    originalPrice,
    description,
    features,
    specs,
    inStock = true,
    stockLabel,
    addToCartLabel,
    addToCartPhrase,
    buyNowLabel,
    buyNowPhrase,
}) => {
    const { playClick } = useSound();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-2 gap-8 h-full">
                {/* Images Section */}
                <div className="flex flex-col gap-4">
                    <div className="aspect-square rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent">
                        {images && images[selectedImage] && (
                            <SmartImage
                                assetId={images[selectedImage].imageUrl || images[selectedImage].imagePrompt || 'product'}
                                alt={name || 'Product'}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    {images && images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => { playClick(); setSelectedImage(i); }}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                                        ${i === selectedImage ? 'border-sapphire' : 'border-white/[0.1] hover:border-white/[0.3]'}`}
                                >
                                    <SmartImage
                                        assetId={img.imageUrl || img.imagePrompt || `thumb-${i}`}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            {brand && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-1">{brand}</div>}
                            {name && <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{name}</h1>}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => { playClick(); setIsFavorite(!isFavorite); }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all
                                    ${isFavorite ? 'bg-flamingo/20 border-flamingo text-flamingo' : 'bg-white/[0.05] border-white/[0.1] text-mist/60 hover:text-white'}`}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-flamingo' : ''}`} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-mist/60 hover:text-white transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {rating !== undefined && (
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-mist/20'}`}>★</span>
                                ))}
                            </div>
                            {reviewCount && <span className="text-sm text-mist/50">({reviewCount})</span>}
                        </div>
                    )}

                    {(price || originalPrice) && (
                        <div className="flex items-baseline gap-3 mb-6">
                            {price && <span className="text-3xl font-bold text-white">{price}</span>}
                            {originalPrice && <span className="text-lg text-mist/40 line-through">{originalPrice}</span>}
                        </div>
                    )}

                    {description && <p className="text-mist/60 mb-6 leading-relaxed">{description}</p>}

                    {features && features.length > 0 && (
                        <div className="space-y-2 mb-6">
                            {features.map((feat, i) => {
                                const IconComp = getIcon(feat.icon);
                                return (
                                    <div key={i} className="flex items-center gap-3">
                                        <IconComp className="w-4 h-4 text-jade" />
                                        <span className="text-sm text-mist/70">{feat.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {specs && specs.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                            {specs.map((spec, i) => (
                                <div key={i}>
                                    <div className="text-xs text-mist/40">{spec.label}</div>
                                    <div className="text-sm text-white font-medium">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stock Status */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-jade' : 'bg-red-400'}`} />
                        <span className={`text-sm ${inStock ? 'text-jade' : 'text-red-400'}`}>{stockLabel}</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border border-white/[0.1] rounded-lg">
                            <button
                                onClick={() => { playClick(); setQuantity(Math.max(1, quantity - 1)); }}
                                className="w-10 h-10 flex items-center justify-center text-mist/60 hover:text-white transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-white font-medium">{quantity}</span>
                            <button
                                onClick={() => { playClick(); setQuantity(quantity + 1); }}
                                className="w-10 h-10 flex items-center justify-center text-mist/60 hover:text-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                        {addToCartLabel && addToCartPhrase && (
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 
                                    bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                    hover:bg-white/[0.1] transition-all"
                                onClick={() => handleAction(addToCartPhrase)}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {addToCartLabel}
                            </button>
                        )}
                        {buyNowLabel && buyNowPhrase && (
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 
                                    bg-flamingo text-white font-semibold rounded-full 
                                    hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                                onClick={() => handleAction(buyNowPhrase)}
                            >
                                {buyNowLabel}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
