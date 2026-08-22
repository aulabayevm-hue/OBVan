import { useEffect, useState } from 'react';
import { X, Save, UserRound } from 'lucide-react';
import type { CrewMember, CrewRole } from '../../types/obvan';

interface CrewModalProps {
  isOpen: boolean;
  member: CrewMember | null;
  onClose: () => void;
  onSave: (member: CrewMember) => void;
}

const ROLES: CrewRole[] = [
  'Водитель',
  'Инженер',
  'Телеоператор',
  'Звукорежиссёр',
  'Режиссёр',
  'Техник',
  'Продюсер',
];

const EMPTY_MEMBER: CrewMember = {
  id: '',
  fullName: '',
  role: 'Инженер',
  phone: '',
  email: '',
  active: true,
};

export function CrewModal({
  isOpen,
  member,
  onClose,
  onSave,
}: CrewModalProps) {
  const [form, setForm] = useState<CrewMember>(EMPTY_MEMBER);

  useEffect(() => {
    if (!isOpen) return;

    if (member) {
      setForm({
        ...member,
        phone: member.phone ?? '',
        email: member.email ?? '',
      });
    } else {
      setForm({
        ...EMPTY_MEMBER,
        id: `CREW-${Date.now()}`,
      });
    }
  }, [isOpen, member]);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof CrewMember,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.fullName.trim()) return;

    onSave({
      ...form,
      fullName: form.fullName.trim(),
      phone: form.phone?.trim() || undefined,
      email: form.email?.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {member ? 'Редактирование сотрудника' : 'Новый сотрудник'}
              </h2>
              <p className="text-xs text-slate-500">
                Данные экипажа ПТС
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

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              ФИО *
            </label>
            <input
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Иванов Иван Иванович"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-slate-600">
              Должность *
            </label>
            <select
              value={form.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                Телефон
              </label>
              <input
                value={form.phone ?? ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-600">
                E-mail
              </label>
              <input
                type="email"
                value={form.email ?? ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => handleChange('active', e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            <div>
              <p className="text-sm font-bold text-slate-800">
                Сотрудник активен
              </p>
              <p className="text-xs text-slate-500">
                Неактивные сотрудники не должны назначаться на новые выезды
              </p>
            </div>
          </label>

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
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
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrewModal;
