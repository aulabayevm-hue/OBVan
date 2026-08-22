import type { EquipmentItem, FilterState, SortColumn, SortOrder } from '../types/equipment';

export function filterAndSortEquipment(
  items: EquipmentItem[],
  filters: FilterState,
  sortColumn: SortColumn,
  sortOrder: SortOrder
): EquipmentItem[] {
  return items
    .filter((item) => {
      // 1. Search Query Filter
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        if (filters.searchField === 'name') {
          if (!item.name.toLowerCase().includes(query) && !item.brand.toLowerCase().includes(query)) {
            return false;
          }
        } else if (filters.searchField === 'model') {
          if (!item.model.toLowerCase().includes(query)) {
            return false;
          }
        } else if (filters.searchField === 'inventoryNumber') {
          if (!item.inventoryNumber.toLowerCase().includes(query)) {
            return false;
          }
        } else if (filters.searchField === 'serialNumber') {
          if (!item.serialNumber.toLowerCase().includes(query)) {
            return false;
          }
        } else {
          // 'all'
          const inName = item.name.toLowerCase().includes(query);
          const inBrand = item.brand.toLowerCase().includes(query);
          const inModel = item.model.toLowerCase().includes(query);
          const inInv = item.inventoryNumber.toLowerCase().includes(query);
          const inSer = item.serialNumber.toLowerCase().includes(query);
          if (!inName && !inBrand && !inModel && !inInv && !inSer) {
            return false;
          }
        }
      }

      // 2. Category Filter
      if (filters.selectedCategory !== 'Все') {
        if (item.category !== filters.selectedCategory) {
          return false;
        }
      }

      // 3. Storage Location Filter
      if (filters.selectedLocation !== 'Все') {
        if (item.storageLocation !== filters.selectedLocation) {
          return false;
        }
      }

      // 4. Status Filter
      if (filters.selectedStatus !== 'Все') {
        if (item.status !== filters.selectedStatus) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      let valA = a[sortColumn] || '';
      let valB = b[sortColumn] || '';

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
}
