import React from 'react';
import type {
  EquipmentCategory,
  EquipmentStatus,
  FilterState,
  StorageLocation,
} from '../types/equipment';
import { Search, Filter, RotateCcw, Tag } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  categories: (EquipmentCategory | 'Все')[];
  locations: (StorageLocation | 'Все')[];
  statuses: (EquipmentStatus | 'Все')[];
  totalCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  categories,
  locations,
  statuses,
  totalCount,
  filteredCount,
}) => {
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleSearchFieldChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilterChange({
      ...filters,
      searchField: e.target.value as FilterState['searchField'],
    });
  };

  const handleCategorySelect = (category: EquipmentCategory | 'Все') => {
    onFilterChange({ ...filters, selectedCategory: category });
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilterChange({
      ...filters,
      selectedLocation: e.target.value as StorageLocation | 'Все',
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      selectedStatus: e.target.value as EquipmentStatus | 'Все',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedCategory !== 'Все' ||
    filters.selectedLocation !== 'Все' ||
    filters.selectedStatus !== 'Все';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
      {/* Search and Dropdown Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input Box */}
        <div className="flex-1 flex items-center bg-slate-50 rounded-lg border border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <div className="pl-3 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleSearchTextChange}
            placeholder="Поиск оборудования (наименование, модель, инв. №, серийный №)..."
            className="w-full px-3 py-2 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
          />
          <select
            value={filters.searchField}
            onChange={handleSearchFieldChange}
            className="border-l border-slate-300 bg-slate-100 text-slate-700 text-xs px-2 py-2 rounded-r-lg focus:outline-none cursor-pointer hover:bg-slate-200 font-medium"
          >
            <option value="all">По всем полям</option>
            <option value="name">По наименованию</option>
            <option value="model">По модели</option>
            <option value="inventoryNumber">По инв. номеру</option>
            <option value="serialNumber">По серийному номеру</option>
          </select>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Location Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500">Место:</span>
            <select
              value={filters.selectedLocation}
              onChange={handleLocationChange}
              className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-500">Статус:</span>
            <select
              value={filters.selectedStatus}
              onChange={handleStatusChange}
              className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
              title="Сбросить все фильтры"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Сброс
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar for Rapid Filtering */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Быстрый фильтр по категориям:
          </span>
          <span className="text-xs font-medium text-slate-500">
            Показано: <strong className="text-slate-900">{filteredCount}</strong> из {totalCount}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = filters.selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
