/**
 * Table - GENERIC
 * Data table with sortable columns
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useMemo } from 'react';
import { ArrowRight, ChevronUp, ChevronDown, Search } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface TableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
}

interface TableRow {
    id: string;
    cells: Record<string, string | number>;
    actionPhrase?: string;
}

interface TableProps {
    title?: string;
    subtitle?: string;
    searchPlaceholder?: string;
    columns?: TableColumn[];
    rows?: TableRow[];
    emptyMessage?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const Table: React.FC<TableProps> = ({
    title,
    subtitle,
    searchPlaceholder,
    columns,
    rows,
    emptyMessage,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleSort = (key: string) => {
        playClick();
        if (sortKey === key) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const filteredAndSortedRows = useMemo(() => {
        let result = rows || [];

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(row =>
                Object.values(row.cells).some(val =>
                    String(val).toLowerCase().includes(query)
                )
            );
        }

        // Sort
        if (sortKey) {
            result = [...result].sort((a, b) => {
                const aVal = a.cells[sortKey];
                const bVal = b.cells[sortKey];
                if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [rows, sortKey, sortDir, searchQuery]);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
                <div>
                    {title && <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-mist/60 mt-1">{subtitle}</p>}
                </div>

                {searchPlaceholder && (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mist/40" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.1] rounded-xl text-white text-sm
                                placeholder:text-mist/30 focus:outline-none focus:border-sapphire/50 transition-colors w-64"
                        />
                    </div>
                )}
            </div>

            <div className="flex-grow overflow-x-auto rounded-2xl border border-white/[0.06]">
                {columns && columns.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                        className={`px-6 py-4 text-left text-sm font-semibold text-mist/70
                                            ${col.sortable ? 'cursor-pointer hover:text-white select-none' : ''}
                                            ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {col.label}
                                            {col.sortable && sortKey === col.key && (
                                                sortDir === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedRows.length > 0 ? (
                                filteredAndSortedRows.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() => row.actionPhrase && handleAction(row.actionPhrase)}
                                        className={`border-b border-white/[0.04] bg-transparent
                                            ${row.actionPhrase ? 'cursor-pointer hover:bg-white/[0.02]' : ''}
                                            transition-colors`}
                                    >
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className={`px-6 py-4 text-sm text-white
                                                    ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : ''}`}
                                            >
                                                {row.cells[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-mist/40">
                                        {emptyMessage || 'No data'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex items-center justify-center py-12 text-mist/40">
                        {emptyMessage || 'No columns defined'}
                    </div>
                )}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Table;
