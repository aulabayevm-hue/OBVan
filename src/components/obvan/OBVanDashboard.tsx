import { useState } from 'react';
import {
  Bus,
  Users,
  Package,
  CalendarDays,
  CheckCircle2,
  Wrench,
  Plus,
  Pencil,
} from 'lucide-react';
import type { OBVan, CrewMember, Trip } from '../../types/obvan';
import { OBVanModal } from './OBVanModal';

interface OBVanDashboardProps {
  vans: OBVan[];
  crew: CrewMember[];
  trips: Trip[];
  onVansChange: (vans: OBVan[]) => void;
}

export function OBVanDashboard({
  vans,
  crew,
  trips,
  onVansChange,
}: OBVanDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVan, setEditingVan] = useState<OBVan | null>(null);

  const readyVans = vans.filter(
    (van) => van.status === 'Готов'
  ).length;

  const activeTrips = trips.filter(
    (trip) =>
      trip.status === 'В работе' ||
      trip.status === 'В подготовке'
  ).length;

  const maintenanceVans = vans.filter(
    (van) =>
      van.status === 'На обслуживании' ||
      van.status === 'Неисправен'
  ).length;

  const openCreateModal = () => {
    setEditingVan(null);
    setIsModalOpen(true);
  };

  const openEditModal = (van: OBVan) => {
    setEditingVan(van);
    setIsModalOpen(true);
  };

  const handleSaveVan = (savedVan: OBVan) => {
    const exists = vans.some((van) => van.id === savedVan.id);

    if (exists) {
      onVansChange(
        vans.map((van) =>
          van.id === savedVan.id ? savedVan : van
        )
      );
    } else {
      onVansChange([savedVan, ...vans]);
    }
  };

  const cards = [
    {
      title: 'Всего ПТС',
      value: vans.length,
      icon: Bus,
    },
    {
      title: 'Готовы к работе',
      value: readyVans,
      icon: CheckCircle2,
    },
    {
      title: 'Активные выезды',
      value: activeTrips,
      icon: CalendarDays,
    },
    {
      title: 'Экипаж',
      value: crew.filter((member) => member.active).length,
      icon: Users,
    },
    {
      title: 'Оборудование',
      value: vans.reduce(
        (total, van) => total + van.equipmentIds.length,
        0
      ),
      icon: Package,
    },
    {
      title: 'ТО / неисправность',
      value: maintenanceVans,
      icon: Wrench,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            OB Van Manager
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Управление передвижными телевизионными комплексами,
            экипажем, оборудованием и выездами.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Добавить ПТС
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {cards.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {title}
              </span>

              <Icon className="h-4 w-4 text-blue-600" />
            </div>

            <div className="mt-2 text-2xl font-black text-slate-900">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {vans.map((van) => (
          <div
            key={van.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-blue-600">
                  {van.number}
                </div>

                <h3 className="mt-1 text-lg font-black text-slate-900">
                  {van.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {van.location}
                </p>

                {van.registrationNumber && (
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Госномер: {van.registrationNumber}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    van.status === 'Готов'
                      ? 'bg-emerald-50 text-emerald-700'
                      : van.status === 'На выезде'
                        ? 'bg-blue-50 text-blue-700'
                        : van.status === 'На обслуживании'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                  }`}
                >
                  {van.status}
                </span>

                <button
                  type="button"
                  onClick={() => openEditModal(van)}
                  title="Редактировать ПТС"
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>

            {van.description && (
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {van.description}
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-400">
                  Экипаж
                </div>

                <div className="mt-1 font-bold text-slate-900">
                  {van.crewIds.length}
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-400">
                  Оборудование
                </div>

                <div className="mt-1 font-bold text-slate-900">
                  {van.equipmentIds.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OBVanModal
        isOpen={isModalOpen}
        van={editingVan}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVan(null);
        }}
        onSave={handleSaveVan}
      />
    </section>
  );
}
