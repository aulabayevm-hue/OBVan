import React, { useState } from 'react';
import type {
  EquipmentCategory,
  EquipmentItem,
  EquipmentStatus,
  StorageLocation,
} from '../types/equipment';
import { X, Sparkles, PlusCircle } from 'lucide-react';
import { generateAISpecs } from '../utils/aiSpecsGenerator';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEquipment: (item: EquipmentItem) => void;
  categories: EquipmentCategory[];
  locations: StorageLocation[];
  statuses: EquipmentStatus[];
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onClose,
  onAddEquipment,
  categories,
  locations,
  statuses,
}) => {
  const [category, setCategory] = useState<EquipmentCategory>('Камеры');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [inventoryNumber, setInventoryNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [storageLocation, setStorageLocation] = useState<StorageLocation>(
    'Склад №1 (Камеры)'
  );
  const [status, setStatus] = useState<EquipmentStatus>('Доступно');
  const [fault, setFault] = useState('Нет');
  const [photoUrl, setPhotoUrl] = useState('');
  const [aiSpecs, setAiSpecs] = useState('');

  if (!isOpen) return null;

  const handleGenerateAISpecs = () => {
    const generated = generateAISpecs(brand, model, category);
    setAiSpecs(generated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !model || !inventoryNumber || !serialNumber) return;

    const defaultPhoto =
      photoUrl.trim() ||
      'https://images.unsplash.com/photo-1589872783345-229f881503c1?auto=format&fit=crop&w=800&q=80';

    const defaultSpecs =
      aiSpecs.trim() || generateAISpecs(brand, model, category);

    const newItem: EquipmentItem = {
      id: `EQ-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      name,
      brand: brand || 'Универсальный бренд',
      model,
      inventoryNumber,
      serialNumber,
      storageLocation,
      status,
      fault: fault || 'Нет',
      photoUrl: defaultPhoto,
      aiSpecs: defaultSpecs,
      usageHistory: [],
    };

    onAddEquipment(newItem);
    onClose();

    // Reset fields
    setName('');
    setBrand('');
    setModel('');
    setInventoryNumber('');
    setSerialNumber('');
    setFault('Нет');
    setPhotoUrl('');
    setAiSpecs('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Добавить новое оборудование
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Категория *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EquipmentCategory)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Наименование оборудования *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="например: Видеокамера 4K"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Производитель (Бренд)
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="например: Sony / ARRI / Canon"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Модель *
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="например: FX6 / ALEXA Mini"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Инвентарный № *
              </label>
              <input
                type="text"
                required
                value={inventoryNumber}
                onChange={(e) => setInventoryNumber(e.target.value)}
                placeholder="например: INV-2025-099"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Серийный № *
              </label>
              <input
                type="text"
                required
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="например: SN-901283"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Место хранения *
              </label>
              <select
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value as StorageLocation)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Статус *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EquipmentStatus)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Неисправность (если есть)
            </label>
            <input
              type="text"
              value={fault}
              onChange={(e) => setFault(e.target.value)}
              placeholder='Опишите неисправность или укажите "Нет"'
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              URL Фотографии (необязательно, подберется автоматически)
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Технические характеристики (ИИ)
              </label>
              <button
                type="button"
                onClick={handleGenerateAISpecs}
                className="text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded border border-purple-200 font-medium flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Сгенерировать с ИИ
              </button>
            </div>
            <textarea
              rows={4}
              value={aiSpecs}
              onChange={(e) => setAiSpecs(e.target.value)}
              placeholder="Характеристики заполняются вручную или генерируются с помощью ИИ"
              className="w-full p-2.5 text-xs font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
            >
              Создать оборудование
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
