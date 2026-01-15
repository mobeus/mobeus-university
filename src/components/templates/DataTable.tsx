/**
 * DataTable
 * Structured data in table format
 * 
 * USE WHEN: Data display, structured information, listings
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each row is clickable → notifyTele
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DataRow {
    cells: string[];
    actionPhrase: string;
}

interface DataTableProps {
    headers: string[];
    rows: DataRow[];
    striped?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
    headers = [],
    rows = [],
    striped = true,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className="overflow-x-auto rounded-xl border border-mist/10">
                <table className="w-full">
                    <thead>
                        <tr className="bg-mist/5">
                            {headers?.map((header, index) => (
                                <th
                                    key={index}
                                    className="text-left p-4 text-template-subtitle text-sm font-medium border-b border-mist/10"
                                >
                                    {header}
                                </th>
                            ))}
                            <th className="w-10 border-b border-mist/10" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`glass-card-clickable hover:bg-mist/5 transition-colors group ${striped && rowIndex % 2 === 1 ? 'bg-mist/3' : ''
                                    }`}
                                onClick={() => handleAction(row.actionPhrase)}
                            >
                                {row.cells?.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="p-4 text-template-content border-b border-mist/5"
                                    >
                                        {cell}
                                    </td>
                                ))}
                                <td className="p-4 border-b border-mist/5">
                                    <ChevronRight className="w-5 h-5 text-mist/40 group-hover:text-sapphire transition-colors" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
