/**
 * DataTable
 * Sortable table for structured data display.
 * Perfect for fees, features, merchant data, comparisons.
 */

import React, { useState, useMemo } from "react";
import {
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    ChevronRight,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";

interface TableColumn {
    key: string;
    header: string;
    sortable?: boolean;
    align?: "left" | "center" | "right";
    width?: string;
}

interface TableRow {
    id: string;
    cells: Record<string, string | number>;
    highlight?: boolean;
    actionPhrase?: string;
}

interface DataTableProps {
    columns: TableColumn[];
    rows: TableRow[];
    sortable?: boolean;
    defaultSortKey?: string;
    defaultSortDir?: "asc" | "desc";
    showRowNumbers?: boolean;
    emptyMessage?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
    columns = [],
    rows = [],
    sortable = true,
    defaultSortKey,
    defaultSortDir = "asc",
    showRowNumbers = false,
    emptyMessage = "No data to display.",
}) => {
    const { playClick } = useSound();
    const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">(defaultSortDir);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const handleSort = (key: string) => {
        if (!sortable) return;
        playClick();
        if (sortKey === key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const sortedRows = useMemo(() => {
        if (!sortKey) return rows;
        return [...rows].sort((a, b) => {
            const aVal = a.cells[sortKey];
            const bVal = b.cells[sortKey];
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortDir === "asc" ? aVal - bVal : bVal - aVal;
            }
            const aStr = String(aVal || "");
            const bStr = String(bVal || "");
            return sortDir === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
        });
    }, [rows, sortKey, sortDir]);

    if (rows.length === 0) {
        return (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
                <p className="text-lg text-white/60 font-medium">{emptyMessage}</p>
            </div>
        );
    }

    const alignClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    return (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Header */}
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            {showRowNumbers && (
                                <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wide w-12">
                                    #
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wide ${alignClasses[col.align || "left"]
                                        } ${col.width || ""}`}
                                >
                                    {sortable && col.sortable !== false ? (
                                        <button
                                            onClick={() => handleSort(col.key)}
                                            className="flex items-center gap-1 hover:text-white/80 transition-colors"
                                        >
                                            {col.header}
                                            {sortKey === col.key ? (
                                                sortDir === "asc" ? (
                                                    <ArrowUp className="w-3 h-3" />
                                                ) : (
                                                    <ArrowDown className="w-3 h-3" />
                                                )
                                            ) : (
                                                <ArrowUpDown className="w-3 h-3 opacity-50" />
                                            )}
                                        </button>
                                    ) : (
                                        col.header
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {sortedRows.map((row, idx) => (
                            <tr
                                key={row.id}
                                onClick={() => row.actionPhrase && handleAction(row.actionPhrase)}
                                className={`border-b border-white/5 transition-colors ${row.highlight ? "bg-emerald-500/10" : ""
                                    } ${row.actionPhrase ? "cursor-pointer hover:bg-white/5" : ""}`}
                            >
                                {showRowNumbers && (
                                    <td className="px-4 py-3 text-sm text-white/40">{idx + 1}</td>
                                )}
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`px-4 py-3 text-sm text-white/80 ${alignClasses[col.align || "left"]}`}
                                    >
                                        {row.cells[col.key]}
                                    </td>
                                ))}
                                {row.actionPhrase && (
                                    <td className="px-2 py-3">
                                        <ChevronRight className="w-4 h-4 text-white/30" />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
