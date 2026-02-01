/**
 * Checkout - GENERIC
 * Checkout form with shipping, payment, and order summary
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, Lock, CreditCard, Truck, LucideIcon, Zap, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select';
    placeholder?: string;
    options?: string[];
    required?: boolean;
    halfWidth?: boolean;
}

interface ShippingOption {
    id: string;
    label: string;
    description?: string;
    price: string;
    eta?: string;
}

interface OrderItem {
    name: string;
    quantity: number;
    price: string;
}

interface CheckoutProps {
    shippingTitle?: string;
    shippingFields?: FormField[];
    shippingOptionsLabel?: string;
    shippingOptions?: ShippingOption[];
    paymentTitle?: string;
    paymentFields?: FormField[];
    orderSummaryTitle?: string;
    items?: OrderItem[];
    subtotalLabel?: string;
    subtotal?: string;
    shippingLabel?: string;
    shippingCost?: string;
    taxLabel?: string;
    tax?: string;
    totalLabel?: string;
    total?: string;
    secureNote?: string;
    submitLabel?: string;
    submitPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Checkout: React.FC<CheckoutProps> = ({
    shippingTitle,
    shippingFields,
    shippingOptionsLabel,
    shippingOptions,
    paymentTitle,
    paymentFields,
    orderSummaryTitle,
    items,
    subtotalLabel,
    subtotal,
    shippingLabel,
    shippingCost,
    taxLabel,
    tax,
    totalLabel,
    total,
    secureNote,
    submitLabel,
    submitPhrase,
}) => {
    const { playClick } = useSound();
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [selectedShipping, setSelectedShipping] = useState(shippingOptions?.[0]?.id || '');

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleChange = (name: string, value: string) => {
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const renderField = (field: FormField) => (
        <div key={field.name} className={field.halfWidth ? 'col-span-1' : 'col-span-2'}>
            <label className="block text-sm text-mist/60 mb-2">{field.label}</label>
            {field.type === 'select' ? (
                <select
                    name={field.name}
                    value={formValues[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl text-white
                        focus:outline-none focus:border-sapphire/50 transition-colors"
                >
                    {field.placeholder && <option value="">{field.placeholder}</option>}
                    {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formValues[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.1] rounded-xl text-white
                        placeholder:text-mist/30 focus:outline-none focus:border-sapphire/50 transition-colors"
                />
            )}
        </div>
    );

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="md:col-span-2 space-y-8">
                    {/* Shipping Info */}
                    {shippingTitle && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="w-5 h-5 text-sapphire" />
                                <h3 className="text-lg font-bold text-white">{shippingTitle}</h3>
                            </div>
                            {shippingFields && (
                                <div className="grid grid-cols-2 gap-4">
                                    {shippingFields.map(renderField)}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Shipping Options */}
                    {shippingOptions && shippingOptions.length > 0 && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                            {shippingOptionsLabel && <h3 className="text-lg font-bold text-white mb-4">{shippingOptionsLabel}</h3>}
                            <div className="space-y-3">
                                {shippingOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => { playClick(); setSelectedShipping(option.id); }}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                                            ${selectedShipping === option.id
                                                ? 'bg-sapphire/10 border-sapphire/30'
                                                : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.1]'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                            ${selectedShipping === option.id ? 'border-sapphire bg-sapphire' : 'border-white/20'}`}>
                                            {selectedShipping === option.id && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-medium text-white">{option.label}</div>
                                            {option.eta && <div className="text-sm text-mist/50">{option.eta}</div>}
                                        </div>
                                        <div className="text-lg font-bold text-white">{option.price}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Payment Info */}
                    {paymentTitle && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="w-5 h-5 text-sapphire" />
                                <h3 className="text-lg font-bold text-white">{paymentTitle}</h3>
                            </div>
                            {paymentFields && (
                                <div className="grid grid-cols-2 gap-4">
                                    {paymentFields.map(renderField)}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] h-fit">
                    {orderSummaryTitle && <h3 className="text-lg font-bold text-white mb-6">{orderSummaryTitle}</h3>}

                    {items && items.length > 0 && (
                        <div className="space-y-3 mb-6 pb-6 border-b border-white/[0.06]">
                            {items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-mist/60">{item.name} × {item.quantity}</span>
                                    <span className="text-white">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-3 mb-6">
                        {subtotalLabel && subtotal && (
                            <div className="flex justify-between">
                                <span className="text-mist/60">{subtotalLabel}</span>
                                <span className="text-white">{subtotal}</span>
                            </div>
                        )}
                        {shippingLabel && shippingCost && (
                            <div className="flex justify-between">
                                <span className="text-mist/60">{shippingLabel}</span>
                                <span className="text-white">{shippingCost}</span>
                            </div>
                        )}
                        {taxLabel && tax && (
                            <div className="flex justify-between">
                                <span className="text-mist/60">{taxLabel}</span>
                                <span className="text-white">{tax}</span>
                            </div>
                        )}
                    </div>

                    {totalLabel && total && (
                        <div className="flex justify-between py-4 border-t border-white/[0.1] mb-6">
                            <span className="text-lg font-bold text-white">{totalLabel}</span>
                            <span className="text-2xl font-bold text-white">{total}</span>
                        </div>
                    )}

                    {submitLabel && submitPhrase && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 
                                bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(submitPhrase)}
                        >
                            {submitLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}

                    {secureNote && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-mist/40">
                            <Lock className="w-3 h-3" />
                            {secureNote}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
