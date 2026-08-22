import type { OBVan, CrewMember, Trip } from '../types/obvan';

export const INITIAL_OB_VANS: OBVan[] = [
  {
    id: 'OBV-001',
    number: 'ПТС-1',
    name: 'OB Van 01',
    registrationNumber: '',
    status: 'Готов',
    location: 'Гараж ПТС',
    description: 'Основной передвижной телевизионный комплекс',
    crewIds: [],
    equipmentIds: [],
    notes: '',
  },
  {
    id: 'OBV-002',
    number: 'ПТС-2',
    name: 'OB Van 02',
    registrationNumber: '',
    status: 'Готов',
    location: 'Гараж ПТС',
    description: 'Резервный передвижной телевизионный комплекс',
    crewIds: [],
    equipmentIds: [],
    notes: '',
  },
];

export const INITIAL_CREW: CrewMember[] = [
  {
    id: 'CREW-001',
    fullName: 'Иванов Иван',
    role: 'Инженер',
    active: true,
  },
  {
    id: 'CREW-002',
    fullName: 'Петров Пётр',
    role: 'Телеоператор',
    active: true,
  },
  {
    id: 'CREW-003',
    fullName: 'Сидоров Алексей',
    role: 'Звукорежиссёр',
    active: true,
  },
];

export const INITIAL_TRIPS: Trip[] = [];
