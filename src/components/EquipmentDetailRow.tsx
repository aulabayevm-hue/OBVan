import React, { useState } from 'react';
import type { EquipmentItem, UsageHistoryItem } from '../types/equipment';
import { QRCodeSVG } from 'qrcode.react';
import {
  Sparkles,
  Edit3,
  Check,
  Plus,
  Calendar,
  Truck,
  User,
  Image as ImageIcon,
  FileText,
  X,
  RefreshCw,
  QrCode,
  Info
} from 'lucide-react';
import { generateAISpecs } from '../utils/aiSpecsGenerator';

interface EquipmentDetailRowProps {
  item: EquipmentItem;
  onUpdateItem: (updatedItem: EquipmentItem) => void;
  onExportPDF: (item: EquipmentItem) => void;
}

export const EquipmentDetailRow: React.FC<EquipmentDetailRowProps> = ({
  item,
  onUpdateItem,
  onExportPDF,
}) => {
  // Photo edit state
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [photoInput, setPhotoInput] = useState(item.photoUrl);

  // Specs edit state
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);
  const [specsInput, setSpecsInput] = useState(item.aiSpecs);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Add Trip Modal/Form state
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [newTrip, setNewTrip] = useState<Omit<UsageHistoryItem, 'id'>>({
    departureDate: new Date().toISOString().split('T')[0],
    eventOrObject: '',
    obVanNumber: 'OB Van 01',
    responsibleEmployee: '',
    issueDate: new Date().toISOString().split('T')[0],
    returnDate: new Date().toISOString().split('T')[0],
  });

  // Handle photo save
  const handleSavePhoto = () => {
    onUpdateItem({
      ...item,
      photoUrl: photoInput,
      updatedAt: new Date().toISOString(),
    });
    setIsEditingPhoto(false);
  };

  // Handle photo upload file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoInput(result);
        onUpdateItem({
          ...item,
          photoUrl: result,
          updatedAt: new Date().toISOString(),
        });
        setIsEditingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle AI Spec Re-generation
  const handleRegenerateAI = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      const newSpecs = generateAISpecs(item.brand, item.model, item.category);
      setSpecsInput(newSpecs);
      onUpdateItem({
        ...item,
        aiSpecs: newSpecs,
        updatedAt: new Date().toISOString(),
      });
      setIsGeneratingAI(false);
    }, 600);
  };

  // Handle Spec Save
  const handleSaveSpecs = () => {
    onUpdateItem({
      ...item,
      aiSpecs: specsInput,
      updatedAt: new Date().toISOString(),
    });
    setIsEditingSpecs(false);
  };

  // Handle Add Trip
  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrip.eventOrObject || !newTrip.responsibleEmployee) return;

    const createdTrip: UsageHistoryItem = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      ...newTrip,
    };

    onUpdateItem({
      ...item,
      usageHistory: [createdTrip, ...item.usageHistory],
      updatedAt: new Date().toISOString(),
    });

    setShowAddTrip(false);
    setNewTrip({
      departureDate: new Date().toISOString().split('T')[0],
      eventOrObject: '',
      obVanNumber: 'OB Van 01',
      responsibleEmployee: '',
      issueDate: new Date().toISOString().split('T')[0],
      returnDate: new Date().toISOString().split('T')[0],
    });
  };

  const qrData = JSON.stringify({
    id: item.id,
    inv: item.inventoryNumber,
    sn: item.serialNumber,
    model: `${item.brand} ${item.model}`,
  });

  return (
    <td colSpan={10} className="p-0 border-b border-slate-300">
      <div className="bg-slate-50/90 p-5 border-y border-slate-200 shadow-inner space-y-6">
        {/* Top Header Row in Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Info className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {item.brand} {item.model} — {item.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Инв. № {item.inventoryNumber} | Серийный № {item.serialNumber} | Категория: {item.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onExportPDF(item)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              Скачать PDF паспорта
            </button>
          </div>
        </div>

        {/* Grid: Photo, QR Code, AI Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: Equipment Photo */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-slate-600" /> Фотография оборудования
                </span>
                <button
                  onClick={() => setIsEditingPhoto(!isEditingPhoto)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isEditingPhoto ? 'Отмена' : 'Изменить'}
                </button>
              </div>

              <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center">
                <img
                  src={item.photoUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1589872783345-229f881503c1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/75 text-slate-200 px-2 py-0.5 rounded backdrop-blur-sm">
                  Автоподбор по бренду/модели
                </span>
              </div>

              {isEditingPhoto && (
                <div className="mt-3 space-y-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <label className="block text-[11px] font-medium text-slate-600">
                    URL изображения или файл:
                  </label>
                  <input
                    type="text"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white text-slate-800"
                  />
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <label className="cursor-pointer text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded font-medium">
                      Загрузить файл
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      onClick={handleSavePhoto}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-medium flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Сохранить
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Box 2: QR Code */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col items-center justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 w-full">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-slate-600" /> Уникальный QR-код
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  Активен
                </span>
              </div>
            </div>

            <div className="my-2 p-3 bg-white border-2 border-slate-800 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <QRCodeSVG
                value={qrData}
                size={120}
                level="H"
                includeMargin={true}
              />
              <span className="text-[10px] font-mono text-slate-500 mt-1">
                ID: {item.id}
              </span>
            </div>

            <p className="text-[11px] text-center text-slate-500">
              Связан с карточкой оборудования. Сканируйте для быстрого поиска в системе.
            </p>
          </div>

          {/* Box 3: AI Technical Specifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" /> Характеристики (ИИ)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleRegenerateAI}
                    disabled={isGeneratingAI}
                    className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium flex items-center gap-1 border border-purple-200 transition-colors"
                    title="Сгенерировать техническое описание заново с помощью ИИ"
                  >
                    <RefreshCw className={`w-3 h-3 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                    {isGeneratingAI ? 'ИИ генерирует...' : 'ИИ Обновить'}
                  </button>
                  <button
                    onClick={() => setIsEditingSpecs(!isEditingSpecs)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditingSpecs ? 'Закрыть' : 'Правка'}
                  </button>
                </div>
              </div>

              {isEditingSpecs ? (
                <div className="space-y-2 mt-2">
                  <textarea
                    rows={6}
                    value={specsInput}
                    onChange={(e) => setSpecsInput(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveSpecs}
                      className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-medium flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Сохранить ТХ
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {item.aiSpecs}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section: Usage History */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                История использования оборудования на выездах
              </h4>
              <p className="text-xs text-slate-500">
                Зафиксированные командировки, мероприятия и ответственные сотрудники
              </p>
            </div>
            <button
              onClick={() => setShowAddTrip(true)}
              className="self-start sm:self-auto flex items-center gap-1 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Добавить выезд
            </button>
          </div>

          {/* Add Trip Modal Form */}
          {showAddTrip && (
            <form
              onSubmit={handleAddTrip}
              className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 mb-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="text-xs font-bold text-emerald-900">
                  Новая запись о выезде
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddTrip(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Мероприятие / Объект
                  </label>
                  <input
                    type="text"
                    required
                    value={newTrip.eventOrObject}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, eventOrObject: e.target.value })
                    }
                    placeholder="Например: Прямой эфир Нового Года"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Ответственный сотрудник
                  </label>
                  <input
                    type="text"
                    required
                    value={newTrip.responsibleEmployee}
                    onChange={(e) =>
                      setNewTrip({
                        ...newTrip,
                        responsibleEmployee: e.target.value,
                      })
                    }
                    placeholder="ФИО сотрудника"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Номер OB Van (ПТС)
                  </label>
                  <input
                    type="text"
                    value={newTrip.obVanNumber}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, obVanNumber: e.target.value })
                    }
                    placeholder="OB Van 01 / Комплект №1"
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Дата выезда
                  </label>
                  <input
                    type="date"
                    value={newTrip.departureDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, departureDate: e.target.value })
                    }
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Дата выдачи
                  </label>
                  <input
                    type="date"
                    value={newTrip.issueDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, issueDate: e.target.value })
                    }
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Дата возвращения
                  </label>
                  <input
                    type="date"
                    value={newTrip.returnDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, returnDate: e.target.value })
                    }
                    className="w-full px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-emerald-200">
                <button
                  type="button"
                  onClick={() => setShowAddTrip(false)}
                  className="px-3 py-1 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-medium"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white rounded font-medium"
                >
                  Сохранить выезд
                </button>
              </div>
            </form>
          )}

          {/* History Table */}
          {item.usageHistory.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              История выездов пока пуста. Нажмите «Добавить выезд», чтобы внести запись.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2">Дата выезда</th>
                    <th className="px-3 py-2">Мероприятие / Объект</th>
                    <th className="px-3 py-2">Номер OB Van</th>
                    <th className="px-3 py-2">Ответственный</th>
                    <th className="px-3 py-2">Дата выдачи</th>
                    <th className="px-3 py-2">Дата возврата</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {item.usageHistory.map((trip) => (
                    <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2.5 font-medium text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {trip.departureDate}
                      </td>
                      <td className="px-3 py-2.5 font-semibold text-slate-800">
                        {trip.eventOrObject}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 font-medium">
                          {trip.obVanNumber}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-medium text-slate-800 flex items-center gap-1 whitespace-nowrap">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {trip.responsibleEmployee}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-slate-600">
                        {trip.issueDate}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap text-slate-600">
                        {trip.returnDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </td>
  );
};
