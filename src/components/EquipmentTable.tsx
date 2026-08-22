import React from 'react';
import type {
  EquipmentItem,
  SortColumn,
  SortOrder,
} from '../types/equipment';
import { EquipmentDetailRow } from './EquipmentDetailRow';
import {
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  XCircle,
} from 'lucide-react';

interface EquipmentTableProps {
  items: EquipmentItem[];
  expandedRowId: string | null;
  onToggleExpand: (id: string) => void;
  sortColumn: SortColumn;
  sortOrder: SortOrder;
  onSortChange: (column: SortColumn) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onUpdateItem: (updatedItem: EquipmentItem) => void;
  onExportSinglePDF: (item: EquipmentItem) => void;
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({
  items,
  expandedRowId,
  onToggleExpand,
  sortColumn,
  sortOrder,
  onSortChange,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onUpdateItem,
  onExportSinglePDF,
}) => {
  const isAllSelected =
    items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  const renderSortIndicator = (column: SortColumn) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60 group-hover:opacity-100" />;
    }
    return (
      <span className="text-blue-600 font-bold text-xs">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const getStatusBadge = (status: EquipmentItem['status']) => {
    switch (status) {
      case 'В работе':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            В работе
          </span>
        );
      case 'Доступно':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Доступно
          </span>
        );
      case 'На выезде':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            На выезде
          </span>
        );
      case 'На ремонте':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Wrench className="w-3.5 h-3.5 text-amber-600" />
            На ремонте
          </span>
        );
      case 'Списано':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Списано
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider select-none">
              <th className="py-3 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                  title="Выбрать все"
                />
              </th>
              <th
                onClick={() => onSortChange('category')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Категория</span>
                  {renderSortIndicator('category')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('name')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Наименование</span>
                  {renderSortIndicator('name')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('model')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Модель</span>
                  {renderSortIndicator('model')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('inventoryNumber')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Инвентарный №</span>
                  {renderSortIndicator('inventoryNumber')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('serialNumber')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Серийный №</span>
                  {renderSortIndicator('serialNumber')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('storageLocation')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Место хранения</span>
                  {renderSortIndicator('storageLocation')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('status')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Статус</span>
                  {renderSortIndicator('status')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('fault')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-1.5">
                  <span>Неисправность</span>
                  {renderSortIndicator('fault')}
                </div>
              </th>
              <th className="py-3 px-4 text-center">Подробнее</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {items.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-400">
                  Оборудование не найдено. Попробуйте изменить параметры поиска или фильтров.
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const isExpanded = expandedRowId === item.id;
                const isSelected = selectedIds.includes(item.id);

                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`transition-colors ${
                        isExpanded
                          ? 'bg-blue-50/70 border-l-4 border-l-blue-600'
                          : isSelected
                          ? 'bg-amber-50/50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelect(item.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800 text-xs">
                        <span className="px-2 py-1 bg-slate-100 rounded text-slate-700">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {item.name}
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-mono text-xs">
                        <span className="font-semibold text-slate-900">{item.brand}</span>{' '}
                        {item.model}
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-700">
                        {item.inventoryNumber}
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-600">
                        {item.serialNumber}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-700 font-medium">
                        {item.storageLocation}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-3 px-3 text-xs">
                        {item.fault !== 'Нет' ? (
                          <span className="text-rose-700 font-medium flex items-center gap-1 max-w-xs truncate" title={item.fault}>
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            {item.fault}
                          </span>
                        ) : (
                          <span className="text-slate-400">Нет</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onToggleExpand(item.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                            isExpanded
                              ? 'bg-blue-600 text-white shadow-blue-200'
                              : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800'
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              Свернуть <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Подробнее <ChevronRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable Row */}
                    {isExpanded && (
                      <EquipmentDetailRow
                        item={item}
                        onUpdateItem={onUpdateItem}
                        onExportPDF={onExportSinglePDF}
                      />
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
