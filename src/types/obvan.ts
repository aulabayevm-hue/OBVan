export type OBVanStatus =
  | 'Готов'
  | 'На выезде'
  | 'На обслуживании'
  | 'Неисправен';

export type CrewRole =
  | 'Водитель'
  | 'Инженер'
  | 'Телеоператор'
  | 'Звукорежиссёр'
  | 'Режиссёр'
  | 'Техник'
  | 'Продюсер';

export type TripStatus =
  | 'Планируется'
  | 'В подготовке'
  | 'В работе'
  | 'Завершён'
  | 'Отменён';

export interface CrewMember {
  id: string;
  fullName: string;
  role: CrewRole;
  phone?: string;
  email?: string;
  active: boolean;
}

export interface OBVan {
  id: string;
  number: string;
  name: string;
  registrationNumber?: string;
  status: OBVanStatus;
  location: string;
  description?: string;
  crewIds: string[];
  equipmentIds: string[];
  notes?: string;
}

export interface Trip {
  id: string;
  title: string;
  event: string;
  location: string;
  startDate: string;
  endDate: string;
  obVanId: string;
  crewIds: string[];
  equipmentIds: string[];
  status: TripStatus;
  responsiblePerson?: string;
  notes?: string;
}
