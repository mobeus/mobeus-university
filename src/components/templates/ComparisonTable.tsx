/**
 * ComparisonTable
 * Side-by-side feature/competitor comparison matrix
 * 
 * USE WHEN: "How do we compare", "vs competitor", competitor positioning
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each row is clickable → notifyTele
 */

import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ComparisonRow {
    feature: string;
    values: (string | boolean)[];
    highlight?: boolean;
    actionPhrase: string;
}

interface ComparisonTableProps {
    headers: string[];
    rows: ComparisonRow[];
    highlightColumn?: number;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
    headers = [],
    rows = [],
    highlightColumn,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const renderValue = (value: string | boolean) => {
        if (typeof value === 'boolean') {
            return value ? (
                <Check className="w-5 h-5 text-jade mx-auto" />
            ) : (
                <X className="w-5 h-5 text-flamingo/60 mx-auto" />
            );
        }
        if (value === '—' || value === '-') {
            return <Minus className="w-4 h-4 text-mist/40 mx-auto" />;
        }
        return <span className="text-template-content">{value}</span>;
    };

    return (
        <div className="glass-template-container">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            {headers?.map((header, index) => (
                                <th
                                    key={index}
                                    className={`text-left p-4 text-template-subtitle border-b border-mist/10 ${index === highlightColumn ? 'bg-sapphire/10' : ''
                                        } ${index === 0 ? '' : 'text-center'}`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`glass-card-clickable hover:bg-mist/5 transition-colors ${row.highlight ? 'bg-turmeric/5' : ''
                                    }`}
                                onClick={() => handleAction(row.actionPhrase)}
                            >
                                <td className="p-4 text-template-title border-b border-mist/5">
                                    {row.feature}
                                </td>
                                {row.values?.map((value, valueIndex) => (
                                    <td
                                        key={valueIndex}
                                        className={`p-4 text-center border-b border-mist/5 ${valueIndex + 1 === highlightColumn ? 'bg-sapphire/5' : ''
                                            }`}
                                    >
                                        {renderValue(value)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonTable;
