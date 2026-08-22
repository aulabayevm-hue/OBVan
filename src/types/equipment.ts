export interface UsageHistoryItem {
  id: string;
  departureDate: string; // Дата выезда (YYYY-MM-DD)
  eventOrObject: string; // Мероприятие или объект
  obVanNumber: string; // Номер OB Van (ПТС)
  responsibleEmployee: string; // Ответственный сотрудник
  issueDate: string; // Дата выдачи (YYYY-MM-DD)
  returnDate: string; // Дата возвращения (YYYY-MM-DD)
}

export type EquipmentCategory =
  | 'Камеры'
  | 'Объективы'
  | 'Мониторы'
  | 'Рекордеры'
  | 'Конвертеры'
  | 'Передатчики'
  | 'Аудиооборудование'
  | 'Кабели'
  | 'Разъёмы'
  | 'ИБП'
  | 'Штативы'
  | 'Адаптеры'
  | 'Прочее';

export type EquipmentStatus =
  | 'В работе'
  | 'Доступно'
  | 'На ремонте'
  | 'На выезде'
  | 'Списано';

export type StorageLocation =
  | 'Склад №1 (Камеры)'
  | 'Склад №2 (Аудио/Свет)'
  | 'ПТС-1 (OB Van 01)'
  | 'ПТС-2 (OB Van 02)'
  | 'Серверная №3'
  | 'Ремонтная мастерская'
  | 'Выездной комплект';

export interface EquipmentItem {
  id: string;
  category: EquipmentCategory;
  name: string; // Наименование
  brand: string; // Производитель
  model: string; // Модель
  inventoryNumber: string; // Инвентарный №
  serialNumber: string; // Серийный №
  storageLocation: StorageLocation; // Место хранения
  status: EquipmentStatus; // Статус
  fault: string; // Неисправность ("Нет" или описание)
  photoUrl: string; // Фотография
  aiSpecs: string; // Краткие технические характеристики (ИИ)
  usageHistory: UsageHistoryItem[]; // История использования на выездах
  updatedAt?: string;
}

export type SortColumn =
  | 'category'
  | 'name'
  | 'model'
  | 'inventoryNumber'
  | 'serialNumber'
  | 'storageLocation'
  | 'status'
  | 'fault';

export type SortOrder = 'asc' | 'desc';

export interface FilterState {
  searchQuery: string; // Искать по наименованию, модели, инв. №, серийному №
  searchField: 'all' | 'name' | 'model' | 'inventoryNumber' | 'serialNumber';
  selectedCategory: EquipmentCategory | 'Все';
  selectedLocation: StorageLocation | 'Все';
  selectedStatus: EquipmentStatus | 'Все';
}
