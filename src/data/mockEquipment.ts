import type { EquipmentItem } from '../types/equipment';

export const INITIAL_EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: 'EQ-1001',
    category: 'Камеры',
    name: 'Камера студийная 4K',
    brand: 'Sony',
    model: 'HDC-4300',
    inventoryNumber: 'INV-2023-001',
    serialNumber: 'SN-SNY-98214',
    storageLocation: 'ПТС-1 (OB Van 01)',
    status: 'В работе',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1589872783345-229f881503c1?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• 2/3-дюймовая 3-CMOS матрица 4K Ultra HD\n• Форматы: 4K HDR, HD High Frame Rate (до 8x)\n• Байонеты: B4 mount\n• Поддержка ITU-R BT.2020, S-Log3\n• Выходы: 12G-SDI, 3G-SDI, оптический интерфейс',
    usageHistory: [
      {
        id: 'HIS-01',
        departureDate: '2025-01-15',
        eventOrObject: 'Чемпионат по футболу, Стадион "Динамо"',
        obVanNumber: 'OB Van 01',
        responsibleEmployee: 'Иванов А. В.',
        issueDate: '2025-01-14',
        returnDate: '2025-01-16'
      },
      {
        id: 'HIS-02',
        departureDate: '2025-02-01',
        eventOrObject: 'Концерт на Красной Площади',
        obVanNumber: 'OB Van 01',
        responsibleEmployee: 'Петров С. М.',
        issueDate: '2025-01-31',
        returnDate: '2025-02-02'
      }
    ]
  },
  {
    id: 'EQ-1002',
    category: 'Камеры',
    name: 'Кинокамера полнокадровая',
    brand: 'ARRI',
    model: 'ALEXA Mini LF',
    inventoryNumber: 'INV-2023-002',
    serialNumber: 'SN-ARR-44012',
    storageLocation: 'Склад №1 (Камеры)',
    status: 'Доступно',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Полнокадровый сенсор LFW (36.70 x 25.54 mm)\n• Запись Codex Compact Drive 1TB\n• Форматы ARRIRAW и Apple ProRes 4.5K\n• Чувствительность EI 800, динамический диапазон 16+ stop\n• Байонет LPL / PL',
    usageHistory: [
      {
        id: 'HIS-03',
        departureDate: '2024-12-10',
        eventOrObject: 'Съемка художественного фильма "Север"',
        obVanNumber: 'Выездной комплект №2',
        responsibleEmployee: 'Сидоров Д. В.',
        issueDate: '2024-12-08',
        returnDate: '2024-12-25'
      }
    ]
  },
  {
    id: 'EQ-1003',
    category: 'Объективы',
    name: 'Длиннофокусный вещательный трансфокатор 2/3"',
    brand: 'Canon',
    model: 'UCN DIGISUPER 90x',
    inventoryNumber: 'INV-2023-010',
    serialNumber: 'SN-CAN-55102',
    storageLocation: 'ПТС-1 (OB Van 01)',
    status: 'В работе',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Кратность зума: 90x (9-810mm / 18-1620mm c 2x экстендером)\n• Оптический стабилизатор изображения IS\n• Диафрагма F/1.7 (9-486mm)\n• Сервопривод фокусировки и зума с обратной связью',
    usageHistory: [
      {
        id: 'HIS-04',
        departureDate: '2025-01-15',
        eventOrObject: 'Чемпионат по футболу, Стадион "Динамо"',
        obVanNumber: 'OB Van 01',
        responsibleEmployee: 'Иванов А. В.',
        issueDate: '2025-01-14',
        returnDate: '2025-01-16'
      }
    ]
  },
  {
    id: 'EQ-1004',
    category: 'Мониторы',
    name: 'Профессиональный накамерный OLED монитор 17"',
    brand: 'Sony',
    model: 'PVM-A170',
    inventoryNumber: 'INV-2023-021',
    serialNumber: 'SN-SNY-11029',
    storageLocation: 'Склад №2 (Аудио/Свет)',
    status: 'На ремонте',
    fault: 'Поврежден разъем SDI-IN 1, мерцание экрана',
    photoUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• 16.5" TRIMASTER EL OLED панель (1920x1080)\n• Цветовой охват ITU-R BT.709\n• Входы: 3G/HD/SD-SDI x2, HDMI, Composite\n• Функция осциллографа (Waveform) и векторскопа (Vectorscope)',
    usageHistory: [
      {
        id: 'HIS-05',
        departureDate: '2024-11-05',
        eventOrObject: 'Форум "Технологии будущего", Манеж',
        obVanNumber: 'OB Van 02',
        responsibleEmployee: 'Кузнецов Е. П.',
        issueDate: '2024-11-04',
        returnDate: '2024-11-08'
      }
    ]
  },
  {
    id: 'EQ-1005',
    category: 'Рекордеры',
    name: 'Многоканальный видеорекордер 4K HDR',
    brand: 'AJA',
    model: 'Ki Pro Ultra 12G',
    inventoryNumber: 'INV-2023-035',
    serialNumber: 'SN-AJA-88320',
    storageLocation: 'ПТС-2 (OB Van 02)',
    status: 'В работе',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Поддержка 12G-SDI 4K/UHD и 4-канальной записи HD\n• Кодеки: Apple ProRes (включая 4444 XQ) и Avid DNxHR\n• Запись на SSD-накопители AJA Pak Media\n• Встроенный HD ЖК-дисплей для мониторинга',
    usageHistory: [
      {
        id: 'HIS-06',
        departureDate: '2025-02-10',
        eventOrObject: 'Трансляция балета в Большом театре',
        obVanNumber: 'OB Van 02',
        responsibleEmployee: 'Смирнов В. Н.',
        issueDate: '2025-02-09',
        returnDate: '2025-02-11'
      }
    ]
  },
  {
    id: 'EQ-1006',
    category: 'Конвертеры',
    name: 'Магистральный конвертер 12G-SDI в Optical Fiber',
    brand: 'Blackmagic Design',
    model: 'Mini Converter Optical Fiber 12G',
    inventoryNumber: 'INV-2023-044',
    serialNumber: 'SN-BMD-30012',
    storageLocation: 'Серверная №3',
    status: 'Доступно',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Двунаправленная конвертация 12G-SDI <-> Оптическое волокно\n• Автоматическое переключение SD/HD/3G/6G/12G-SDI\n• Дальность передачи по оптике до 16 км\n• Питание 12V с фиксацией разъема',
    usageHistory: []
  },
  {
    id: 'EQ-1007',
    category: 'Передатчики',
    name: 'Беспроводная видеосистема 4K',
    brand: 'Teradek',
    model: 'Bolt 4K MAX 750',
    inventoryNumber: 'INV-2023-052',
    serialNumber: 'SN-TRD-99124',
    storageLocation: 'Выездной комплект',
    status: 'На выезде',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Передача видео без задержки (zero-delay < 1ms)\n• Дальность действия: до 230 метров (750 футов)\n• Передача 10-бит 422 HDR через 12G-SDI и HDMI 2.0\n• Защищенное шифрование AES-256',
    usageHistory: [
      {
        id: 'HIS-07',
        departureDate: '2025-02-18',
        eventOrObject: 'Съемка репортажа "Зимние гонки"',
        obVanNumber: 'Выездной комплект №1',
        responsibleEmployee: 'Алексеев К. С.',
        issueDate: '2025-02-17',
        returnDate: '2025-02-22'
      }
    ]
  },
  {
    id: 'EQ-1008',
    category: 'Аудиооборудование',
    name: 'Конденсаторный микрофон-пушка',
    brand: 'Sennheiser',
    model: 'MKH 416-P48U3',
    inventoryNumber: 'INV-2023-063',
    serialNumber: 'SN-SNH-00381',
    storageLocation: 'Склад №2 (Аудио/Свет)',
    status: 'Доступно',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Диаграмма направленности: остронаправленная / суперкардиоидная\n• Частотный диапазон: 40 Гц – 20 kHz\n• Питание: Фантомное 48V ± 12V\n• Высокая устойчивость к неблагоприятным климатическим условиям',
    usageHistory: [
      {
        id: 'HIS-08',
        departureDate: '2025-01-20',
        eventOrObject: 'Интервью на экономическом форуме',
        obVanNumber: 'OB Van 02',
        responsibleEmployee: 'Макаров Д. А.',
        issueDate: '2025-01-19',
        returnDate: '2025-01-21'
      }
    ]
  },
  {
    id: 'EQ-1009',
    category: 'Кабели',
    name: 'Катушка оптического кабеля High-Durability 200м',
    brand: 'Canare',
    model: 'FC-OFC-200M',
    inventoryNumber: 'INV-2023-078',
    serialNumber: 'SN-CNR-77123',
    storageLocation: 'ПТС-1 (OB Van 01)',
    status: 'В работе',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Длина: 200 метров на барабане\n• Разъемы: Neutrik opticalCON DUO\n• Бронированная TPU оболочка, устойчивая к раздавливанию\n• Поддержка 12G-SDI / SMPTE ST 2082',
    usageHistory: []
  },
  {
    id: 'EQ-1010',
    category: 'Штативы',
    name: 'Углепластиковая штативная система с гидравлической головкой',
    brand: 'Sachtler',
    model: 'System Video 18 FT MS',
    inventoryNumber: 'INV-2023-085',
    serialNumber: 'SN-SCH-11204',
    storageLocation: 'Склад №1 (Камеры)',
    status: 'Доступно',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1589872783345-229f881503c1?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Нагрузка: от 2 до 22 кг\n• Головка: Video 18 S2 c 16-ступенчатой контрбалансировкой\n• Ножки: flowtech 100 carbon fiber\n• Диапазон высоты: от 26 до 174 см',
    usageHistory: []
  },
  {
    id: 'EQ-1011',
    category: 'ИБП',
    name: 'Онлайн ИБП 3000ВА для рэка ПТС',
    brand: 'APC',
    model: 'Smart-UPS RT 3000VA (SURTD3000XLI)',
    inventoryNumber: 'INV-2023-091',
    serialNumber: 'SN-APC-66311',
    storageLocation: 'ПТС-2 (OB Van 02)',
    status: 'В работе',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Мощность: 3000 VA / 2100 W\n• Топология: Двойное преобразование (Double Conversion On-Line)\n• Рэковое исполнение (3U Rackmount)\n• Встроенные горячезаменяемые батареи RBC44',
    usageHistory: []
  },
  {
    id: 'EQ-1012',
    category: 'Разъёмы',
    name: 'Комплект панельных разъемов BNC 12G (50 шт.)',
    brand: 'Neutrik',
    model: 'NBB75DFGX',
    inventoryNumber: 'INV-2023-102',
    serialNumber: 'SN-NTK-99001',
    storageLocation: 'Ремонтная мастерская',
    status: 'Доступно',
    fault: 'Нет',
    photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Волновое сопротивление: 75 Ом\n• Пропускная способность: до 18 ГГц (12G-SDI UHD)\n• Изолятор: PTFE (Тефлон), позолоченный центральный контакт',
    usageHistory: []
  },
  {
    id: 'EQ-1013',
    category: 'Адаптеры',
    name: 'Адаптер питания V-Mount в 4-pin XLR 15V',
    brand: 'Hawk-Woods',
    model: 'VL-XLR4',
    inventoryNumber: 'INV-2023-115',
    serialNumber: 'SN-HWK-10294',
    storageLocation: 'Склад №2 (Аудио/Свет)',
    status: 'Списано',
    fault: 'Выход из строя внутреннего предохранителя, оплавлен контакт',
    photoUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    aiSpecs: '• Входное напряжение: 11 - 17 V DC от аккумуляторов V-Mount\n• Выход: 4-pin XLR Female (15V regulated, max 8A)',
    usageHistory: [
      {
        id: 'HIS-09',
        departureDate: '2024-08-10',
        eventOrObject: 'Телемарафон "День Города"',
        obVanNumber: 'OB Van 01',
        responsibleEmployee: 'Иванов А. В.',
        issueDate: '2024-08-09',
        returnDate: '2024-08-11'
      }
    ]
  }
];
