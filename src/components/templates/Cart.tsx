/**
 * Cart - GENERIC
 * Shopping cart display with items and totals
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface CartItem {
    id: string;
    imageUrl?: string;
    imagePrompt?: string;
    name: string;
    variant?: string;
    price: string;
    quantity: number;
    removePhrase?: string;
}

interface CartProps {
    headline?: string;
    items?: CartItem[];
    subtotalLabel?: string;
    subtotal?: string;
    taxLabel?: string;
    tax?: string;
    shippingLabel?: string;
    shipping?: string;
    totalLabel?: string;
    total?: string;
    emptyMessage?: string;
    continueShoppingLabel?: string;
    continueShoppingPhrase?: string;
    checkoutLabel?: string;
    checkoutPhrase?: string;
}

export const Cart: React.FC<CartProps> = ({
    headline,
    items,
    subtotalLabel,
    subtotal,
    taxLabel,
    tax,
    shippingLabel,
    shipping,
    totalLabel,
    total,
    emptyMessage,
    continueShoppingLabel,
    continueShoppingPhrase,
    checkoutLabel,
    checkoutPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const hasItems = items && items.length > 0;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {hasItems && (
                <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
                    <ShoppingBag className="w-6 h-6 text-sapphire" />
                    <span className="ml-auto text-sm text-mist/50">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                </div>
            )}

            {hasItems ? (
                <div className="grid md:grid-cols-3 gap-6 flex-grow pt-6">
                    {/* Items List */}
                    <div className="md:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-4 p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]"
                            >
                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                    <SmartImage
                                        assetId={item.imageUrl || item.imagePrompt || item.id}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                    {item.variant && <p className="text-sm text-mist/50 mb-2">{item.variant}</p>}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-white/[0.1] rounded-lg">
                                            <button className="w-8 h-8 flex items-center justify-center text-mist/60 hover:text-white transition-colors">
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                                            <button className="w-8 h-8 flex items-center justify-center text-mist/60 hover:text-white transition-colors">
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <span className="text-lg font-bold text-white">{item.price}</span>
                                    </div>
                                </div>
                                {item.removePhrase && (
                                    <button
                                        onClick={() => handleAction(item.removePhrase!)}
                                        className="self-start w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-mist/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] h-fit">
                        <div className="space-y-4 mb-6">
                            {subtotalLabel && subtotal && (
                                <div className="flex justify-between">
                                    <span className="text-mist/60">{subtotalLabel}</span>
                                    <span className="text-white">{subtotal}</span>
                                </div>
                            )}
                            {taxLabel && tax && (
                                <div className="flex justify-between">
                                    <span className="text-mist/60">{taxLabel}</span>
                                    <span className="text-white">{tax}</span>
                                </div>
                            )}
                            {shippingLabel && shipping && (
                                <div className="flex justify-between">
                                    <span className="text-mist/60">{shippingLabel}</span>
                                    <span className="text-white">{shipping}</span>
                                </div>
                            )}
                        </div>

                        {totalLabel && total && (
                            <div className="flex justify-between py-4 border-t border-white/[0.1]">
                                <span className="text-lg font-bold text-white">{totalLabel}</span>
                                <span className="text-2xl font-bold text-white">{total}</span>
                            </div>
                        )}

                        {checkoutLabel && checkoutPhrase && (
                            <button
                                className="w-full mt-4 inline-flex items-center justify-center gap-3 px-6 py-4 
                                    bg-flamingo text-white font-semibold rounded-full 
                                    hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                                onClick={() => handleAction(checkoutPhrase)}
                            >
                                {checkoutLabel}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}

                        {continueShoppingLabel && continueShoppingPhrase && (
                            <button
                                className="w-full mt-3 inline-flex items-center justify-center gap-3 px-6 py-3 
                                    text-mist/60 hover:text-white transition-colors"
                                onClick={() => handleAction(continueShoppingPhrase)}
                            >
                                {continueShoppingLabel}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center py-16">
                    <ShoppingBag className="w-16 h-16 text-mist/20 mb-4" />
                    {emptyMessage && <p className="text-lg text-mist/50 mb-6">{emptyMessage}</p>}
                    {continueShoppingLabel && continueShoppingPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(continueShoppingPhrase)}
                        >
                            {continueShoppingLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;
