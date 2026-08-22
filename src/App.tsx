import { useState, useMemo } from 'react';
import type { OBVan, CrewMember, Trip } from './types/obvan';
import { INITIAL_OB_VANS, INITIAL_CREW, INITIAL_TRIPS } from './data/mockOBVans';
import type {
  EquipmentCategory,
  EquipmentItem,
  EquipmentStatus,
  FilterState,
  SortColumn,
  SortOrder,
  StorageLocation,
} from './types/equipment';
import { INITIAL_EQUIPMENT_DATA } from './data/mockEquipment';
import { filterAndSortEquipment } from './utils/filterAndSort';
import { FilterBar } from './components/FilterBar';
import { EquipmentTable } from './components/EquipmentTable';
import { EquipmentModal } from './components/EquipmentModal';
import { CrewModal } from './components/obvan/CrewModal';
import { OBVanDashboard } from './components/obvan/OBVanDashboard';
import {
  exportSingleEquipmentPDF,
  exportEquipmentListPDF,
} from './utils/pdfExport';
import {
  Boxes,
  Plus,
  FileText,
  Radio,
  CheckCircle2,
  Wrench,
  Clock,
  Printer,
  Sparkles,
  Bus,
} from 'lucide-react';

const CATEGORIES: (EquipmentCategory | 'Все')[] = [
  'Все',
  'Камеры',
  'Объективы',
  'Мониторы',
  'Рекордеры',
  'Конвертеры',
  'Передатчики',
  'Аудиооборудование',
  'Кабели',
  'Разъёмы',
  'ИБП',
  'Штативы',
  'Адаптеры',
  'Прочее',
];

const LOCATIONS: (StorageLocation | 'Все')[] = [
  'Все',
  'Склад №1 (Камеры)',
  'Склад №2 (Аудио/Свет)',
  'ПТС-1 (OB Van 01)',
  'ПТС-2 (OB Van 02)',
  'Серверная №3',
  'Ремонтная мастерская',
  'Выездной комплект',
];

const STATUSES: (EquipmentStatus | 'Все')[] = [
  'Все',
  'В работе',
  'Доступно',
  'На выезде',
  'На ремонте',
  'Списано',
];

export function App() {
  const [activeSection, setActiveSection] = useState<'equipment' | 'obvan'>(
    'equipment'
  );

  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(
    INITIAL_EQUIPMENT_DATA
  );

  const [obVans, setObVans] = useState<OBVan[]>(INITIAL_OB_VANS);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [crew, setCrew] = useState<CrewMember[]>(INITIAL_CREW);
  const [trips] = useState<Trip[]>(INITIAL_TRIPS);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    searchField: 'all',
    selectedCategory: 'Все',
    selectedLocation: 'Все',
    selectedStatus: 'Все',
  });

  const [sortColumn, setSortColumn] = useState<SortColumn>('category');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [expandedRowId, setExpandedRowId] = useState<string | null>('EQ-1001');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSorted = useMemo(() => {
    return filterAndSortEquipment(
      equipmentList,
      filters,
      sortColumn,
      sortOrder
    );
  }, [equipmentList, filters, sortColumn, sortOrder]);

  const stats = useMemo(() => {
    const total = equipmentList.length;
    const inUse = equipmentList.filter((i) => i.status === 'В работе').length;
    const onTrip = equipmentList.filter((i) => i.status === 'На выезде').length;
    const inRepair = equipmentList.filter((i) => i.status === 'На ремонте').length;
    const available = equipmentList.filter((i) => i.status === 'Доступно').length;

    return { total, inUse, onTrip, inRepair, available };
  }, [equipmentList]);

  const handleSortChange = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const currentFilteredIds = filteredAndSorted.map((item) => item.id);

    const allSelected = currentFilteredIds.every((id) =>
      selectedIds.includes(id)
    );

    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentFilteredIds.includes(id))
      );
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...currentFilteredIds]))
      );
    }
  };

  const handleUpdateItem = (updatedItem: EquipmentItem) => {
    setEquipmentList((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleAddEquipment = (newItem: EquipmentItem) => {
    setEquipmentList((prev) => [newItem, ...prev]);
    setExpandedRowId(newItem.id);
  };

  const handleSaveCrewMember = (member: CrewMember) => {
    setCrew((prev) => {
      const exists = prev.some((item) => item.id === member.id);
      return exists
        ? prev.map((item) => (item.id === member.id ? member : item))
        : [...prev, member];
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      searchField: 'all',
      selectedCategory: 'Все',
      selectedLocation: 'Все',
      selectedStatus: 'Все',
    });
  };

  const handleExportSelectedPDF = async () => {
    const itemsToExport = equipmentList.filter((i) =>
      selectedIds.includes(i.id)
    );

    if (itemsToExport.length === 0) return;

    await exportEquipmentListPDF(
      itemsToExport,
      `Отчет по выбранным позициям (${itemsToExport.length})`
    );
  };

  const handleExportAllPDF = async () => {
    await exportEquipmentListPDF(
      filteredAndSorted,
      `Полный реестр оборудования (${filteredAndSorted.length})`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
              {activeSection === 'obvan' ? (
                <Bus className="w-7 h-7 text-white" />
              ) : (
                <Boxes className="w-7 h-7 text-white" />
              )}
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                {activeSection === 'obvan'
                  ? 'OB Van Manager'
                  : 'Управление Оборудованием'}

                <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-medium">
                  ПТС / Студии
                </span>
              </h1>

              <p className="text-xs text-slate-400">
                {activeSection === 'obvan'
                  ? 'Управление ПТС, экипажем, оборудованием и выездами'
                  : 'Единый реестр, поиск, фильтры, ИИ-характеристики, QR-идентификация и выезды'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1">
              <button
                onClick={() => setActiveSection('equipment')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                  activeSection === 'equipment'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                Оборудование
              </button>

              <button
                onClick={() => setActiveSection('obvan')}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                  activeSection === 'obvan'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                OB Van Manager
              </button>
            </div>

            {activeSection === 'equipment' && (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Добавить позицию
                </button>

                {selectedIds.length > 0 && (
                  <button
                    onClick={handleExportSelectedPDF}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    PDF выбранных ({selectedIds.length})
                  </button>
                )}

                <button
                  onClick={handleExportAllPDF}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  PDF таблицы ({filteredAndSorted.length})
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {activeSection === 'obvan' ? (
          <OBVanDashboard
            vans={obVans}
            crew={crew}
            trips={trips}
            onVansChange={setObVans}
          />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Всего техники
                  </p>
                  <p className="text-2xl font-black text-slate-900 mt-0.5">
                    {stats.total}
                  </p>
                </div>
                <span className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <Boxes className="w-5 h-5" />
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    В работе
                  </p>
                  <p className="text-2xl font-black text-emerald-600 mt-0.5">
                    {stats.inUse}
                  </p>
                </div>
                <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    На выезде
                  </p>
                  <p className="text-2xl font-black text-purple-600 mt-0.5">
                    {stats.onTrip}
                  </p>
                </div>
                <span className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <Clock className="w-5 h-5" />
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Доступно
                  </p>
                  <p className="text-2xl font-black text-blue-600 mt-0.5">
                    {stats.available}
                  </p>
                </div>
                <span className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Radio className="w-5 h-5" />
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    На ремонте
                  </p>
                  <p className="text-2xl font-black text-amber-600 mt-0.5">
                    {stats.inRepair}
                  </p>
                </div>
                <span className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <Wrench className="w-5 h-5" />
                </span>
              </div>
            </div>

            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              categories={CATEGORIES}
              locations={LOCATIONS}
              statuses={STATUSES}
              totalCount={equipmentList.length}
              filteredCount={filteredAndSorted.length}
            />

            <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Нажмите <strong>«Подробнее»</strong> на любой строке таблицы,
                  чтобы раскрыть фотографию, QR-код, сгенерированные ИИ
                  характеристики и историю выездов.
                </span>
              </div>
            </div>

            <EquipmentTable
              items={filteredAndSorted}
              expandedRowId={expandedRowId}
              onToggleExpand={handleToggleExpand}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onUpdateItem={handleUpdateItem}
              onExportSinglePDF={exportSingleEquipmentPDF}
            />
          </>
        )}
      </main>

      {activeSection === 'equipment' && (
        <EquipmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddEquipment={handleAddEquipment}
          categories={CATEGORIES.filter(
            (c) => c !== 'Все'
          ) as EquipmentCategory[]}
          locations={LOCATIONS.filter(
            (l) => l !== 'Все'
          ) as StorageLocation[]}
          statuses={STATUSES.filter(
            (s) => s !== 'Все'
          ) as EquipmentStatus[]}
        />
      )}      <CrewModal
        isOpen={isCrewModalOpen}
        member={null}
        onClose={() => setIsCrewModalOpen(false)}
        onSave={handleSaveCrewMember}
      />
    </div>
  );
}

export default App;








