import {
  Bus,
  Users,
  Package,
  CalendarDays,
  CheckCircle2,
  Wrench,
} from 'lucide-react';
import type { OBVan, CrewMember, Trip } from '../../types/obvan';

interface OBVanDashboardProps {
  vans: OBVan[];
  crew: CrewMember[];
  trips: Trip[];
}

export function OBVanDashboard({
  vans,
  crew,
  trips,
}: OBVanDashboardProps) {
  const readyVans = vans.filter((van) => van.status === 'Готов').length;
  const activeTrips = trips.filter(
    (trip) => trip.status === 'В работе' || trip.status === 'В подготовке'
  ).length;
  const maintenanceVans = vans.filter(
    (van) => van.status === 'На обслуживании' || van.status === 'Неисправен'
  ).length;

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
      <div>
        <h2 className="text-2xl font-black text-slate-900">
          OB Van Manager
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Управление передвижными телевизионными комплексами,
          экипажем, оборудованием и выездами.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {cards.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {title}
              </span>

              <Icon className="w-4 h-4 text-blue-600" />
            </div>

            <div className="mt-2 text-2xl font-black text-slate-900">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {vans.map((van) => (
          <div
            key={van.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm"
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
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                {van.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-400">
                  Экипаж
                </div>
                <div className="mt-1 font-bold">
                  {van.crewIds.length}
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs text-slate-400">
                  Оборудование
                </div>
                <div className="mt-1 font-bold">
                  {van.equipmentIds.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
