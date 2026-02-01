/**
 * Wallet - GENERIC
 * Payment/wallet display with balance and transactions
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, ArrowUpRight, ArrowDownLeft, CreditCard, Plus, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PaymentMethod {
    icon?: string;
    label: string;
    last4?: string;
    expiry?: string;
    isDefault?: boolean;
}

interface Transaction {
    id: string;
    type: 'credit' | 'debit';
    description: string;
    amount: string;
    date: string;
    icon?: string;
}

interface WalletProps {
    headline?: string;
    balanceLabel?: string;
    balance?: string;
    currency?: string;
    paymentMethods?: PaymentMethod[];
    addPaymentLabel?: string;
    addPaymentPhrase?: string;
    transactionsLabel?: string;
    transactions?: Transaction[];
    addFundsLabel?: string;
    addFundsPhrase?: string;
    withdrawLabel?: string;
    withdrawPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return CreditCard;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || CreditCard;
};

export const Wallet: React.FC<WalletProps> = ({
    headline,
    balanceLabel,
    balance,
    currency,
    paymentMethods,
    addPaymentLabel,
    addPaymentPhrase,
    transactionsLabel,
    transactions,
    addFundsLabel,
    addFundsPhrase,
    withdrawLabel,
    withdrawPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            <div className="grid md:grid-cols-3 gap-6 flex-grow">
                {/* Balance Card */}
                <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-sapphire/20 via-transparent to-flamingo/10 border border-white/[0.06]">
                    {balanceLabel && <div className="text-sm text-mist/50 mb-2">{balanceLabel}</div>}
                    <div className="flex items-baseline gap-2 mb-8">
                        {currency && <span className="text-2xl text-mist/60">{currency}</span>}
                        {balance && <span className="text-5xl font-bold text-white">{balance}</span>}
                    </div>

                    <div className="flex gap-3">
                        {addFundsLabel && addFundsPhrase && (
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 
                                    bg-jade text-white font-semibold rounded-full 
                                    hover:bg-jade/90 transition-all"
                                onClick={() => handleAction(addFundsPhrase)}
                            >
                                <Plus className="w-4 h-4" />
                                {addFundsLabel}
                            </button>
                        )}
                        {withdrawLabel && withdrawPhrase && (
                            <button
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 
                                    bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                    hover:bg-white/[0.1] transition-all"
                                onClick={() => handleAction(withdrawPhrase)}
                            >
                                <ArrowUpRight className="w-4 h-4" />
                                {withdrawLabel}
                            </button>
                        )}
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                    <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>

                    {paymentMethods && paymentMethods.length > 0 && (
                        <div className="space-y-3 mb-4">
                            {paymentMethods.map((method, i) => {
                                const IconComp = getIcon(method.icon);
                                return (
                                    <div
                                        key={i}
                                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all
                                            ${method.isDefault ? 'bg-sapphire/10 border-sapphire/30' : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.1]'}`}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                                            <IconComp className="w-5 h-5 text-mist/60" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="text-sm font-medium text-white">{method.label}</div>
                                            {method.last4 && <div className="text-xs text-mist/40">•••• {method.last4}</div>}
                                        </div>
                                        {method.isDefault && (
                                            <span className="text-xs text-sapphire bg-sapphire/10 px-2 py-1 rounded">Default</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {addPaymentLabel && addPaymentPhrase && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 
                                border border-dashed border-white/[0.1] text-mist/50 rounded-xl
                                hover:border-white/[0.2] hover:text-white transition-all"
                            onClick={() => handleAction(addPaymentPhrase)}
                        >
                            <Plus className="w-4 h-4" />
                            {addPaymentLabel}
                        </button>
                    )}
                </div>
            </div>

            {/* Transactions */}
            {transactions && transactions.length > 0 && (
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                    {transactionsLabel && <h3 className="text-lg font-bold text-white mb-4">{transactionsLabel}</h3>}
                    <div className="space-y-3">
                        {transactions.map((tx) => {
                            const IconComp = getIcon(tx.icon);
                            return (
                                <div key={tx.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02]">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                        ${tx.type === 'credit' ? 'bg-jade/10 text-jade' : 'bg-red-400/10 text-red-400'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="text-sm font-medium text-white">{tx.description}</div>
                                        <div className="text-xs text-mist/40">{tx.date}</div>
                                    </div>
                                    <div className={`text-lg font-bold ${tx.type === 'credit' ? 'text-jade' : 'text-white'}`}>
                                        {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
