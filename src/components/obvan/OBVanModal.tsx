import { useEffect, useState } from 'react';
import { X, Save, Bus } from 'lucide-react';
import type { OBVan, OBVanStatus } from '../../types/obvan';

interface OBVanModalProps {
  isOpen: boolean;
  van: OBVan | null;
  onClose: () => void;
  onSave: (van: OBVan) => void;
}

const STATUSES: OBVanStatus[] = [
  'Готов',
  'На выезде',
  'На обслуживании',
  'Неисправен',
];

export function OBVanModal({
  isOpen,
  van,
  onClose,
  onSave,
}: OBVanModalProps) {
  const [form, setForm] = useState<OBVan>({
    id: '',
    number: '',
    name: '',
    registrationNumber: '',
    status: 'Готов',
    location: '',
    description: '',
    crewIds: [],
    equipmentIds: [],
    notes: '',
  });

  useEffect(() => {
    if (van) {
      setForm(van);
    } else {
      setForm({
        id: `OBV-${Date.now()}`,
        number: '',
        name: '',
        registrationNumber: '',
        status: 'Готов',
        location: '',
        description: '',
        crewIds: [],
        equipmentIds: [],
        notes: '',
      });
    }
  }, [van, isOpen]);

  if (!isOpen) return null;

  const update = <K extends keyof OBVan>(
    field: K,
    value: OBVan[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.number.trim() || !form.name.trim()) {
      return;
    }

    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <Bus className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-900">
                {van ? 'Редактирование ПТС' : 'Добавление ПТС'}
              </h2>

              <p className="text-xs text-slate-500">
                Данные передвижного телевизионного комплекса
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">
                Номер ПТС *
              </span>

              <input
                value={form.number}
                onChange={(e) => update('number', e.target.value)}
                placeholder="ПТС-3"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">
                Название *
              </span>

              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="OB Van 03"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">
                Госномер
              </span>

              <input
                value={form.registrationNumber ?? ''}
                onChange={(e) =>
                  update('registrationNumber', e.target.value)
                }
                placeholder="123 ABC 01"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">
                Статус
              </span>

              <select
                value={form.status}
                onChange={(e) =>
                  update('status', e.target.value as OBVanStatus)
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">
              Местонахождение
            </span>

            <input
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="Гараж ПТС"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">
              Описание
            </span>

            <textarea
              value={form.description ?? ''}
              onChange={(e) => update('description', e.target.value)}
              placeholder="Описание передвижного телевизионного комплекса"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">
              Примечания
            </span>

            <textarea
              value={form.notes ?? ''}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Дополнительная информация"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Отмена
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500"
            >
              <Save className="h-4 w-4" />
              Сохранить ПТС
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
