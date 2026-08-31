import { useMemo } from "react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import type { Doctor } from "../../types/doctor.types";

const COLORS = {
  purple: "#7C3AED",
  purpleLight: "#EDE9FE",

  green: "#10B981",
  greenLight: "#D1FAE5",

  orange: "#F59E0B",
  orangeLight: "#FEF3C7",

  slate: "#CBD5E1",
};

interface DoctorsStatsProps {
  doctors: Doctor[];
}

const weekDays = [
  { dayOfWeek: 1, label: "Seg" },
  { dayOfWeek: 2, label: "Ter" },
  { dayOfWeek: 3, label: "Qua" },
  { dayOfWeek: 4, label: "Qui" },
  { dayOfWeek: 5, label: "Sex" },
  { dayOfWeek: 6, label: "Sáb" },
  { dayOfWeek: 0, label: "Dom" },
];

export function DoctorsStats({ doctors }: DoctorsStatsProps) {
  /*
   * BASIC METRICS
   */

  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === "ACTIVE",
  ).length;

  const inactiveDoctors = doctors.filter(
    (doctor) => doctor.status === "INACTIVE",
  ).length;

  const specialties = new Set(
    doctors.map((doctor) => doctor.specialty),
  ).size;

  /*
   * WEEKLY COVERAGE
   */

  const weeklyCoverage = useMemo(() => {
    return weekDays.map((day) => {
      const availableDoctors = doctors.filter((doctor) =>
        doctor.schedule?.some(
          (schedule) => schedule.dayOfWeek === day.dayOfWeek,
        ),
      ).length;

      const percentage =
        doctors.length === 0
          ? 0
          : Math.round(
              (availableDoctors / doctors.length) * 100,
            );

      return {
        day: day.label,
        doctors: availableDoctors,
        percentage,
      };
    });
  }, [doctors]);

  /*
   * SPECIALTY DISTRIBUTION
   */

  const doctorsBySpecialty = useMemo(() => {
    const specialtyMap = new Map<string, number>();

    for (const doctor of doctors) {
      specialtyMap.set(
        doctor.specialty,
        (specialtyMap.get(doctor.specialty) ?? 0) + 1,
      );
    }

    return Array.from(
      specialtyMap,
      ([specialty, total]) => ({
        specialty,
        total,
      }),
    )
      .sort((a, b) => b.total - a.total)
      .slice(0, 7);
  }, [doctors]);

  /*
   * PERCENTAGES
   */

  const activePercentage =
    doctors.length === 0
      ? 0
      : Math.round(
          (activeDoctors / doctors.length) * 100,
        );

  const inactivePercentage =
    doctors.length === 0
      ? 0
      : Math.round(
          (inactiveDoctors / doctors.length) * 100,
        );

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {/* =====================================================
          1 — WEEKLY COVERAGE
      ===================================================== */}

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Cobertura semanal
            </p>

            <div className="mt-2 flex items-end gap-2">
              <strong className="text-3xl font-semibold tracking-tight text-slate-900">
                {activePercentage}%
              </strong>

              <span className="mb-1 text-xs font-medium text-violet-600">
                médicos ativos
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            ↗
          </div>
        </div>

        <div className="mt-5 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyCoverage}>
              <defs>
                <linearGradient
                  id="coverageGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={COLORS.purple}
                    stopOpacity={0.28}
                  />

                  <stop
                    offset="95%"
                    stopColor={COLORS.purple}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
                formatter={(value) => [
                  `${value} médicos`,
                  "Disponíveis",
                ]}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#94A3B8",
                }}
              />

              <Area
                type="monotone"
                dataKey="doctors"
                stroke={COLORS.purple}
                strokeWidth={2.5}
                fill="url(#coverageGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>

      {/* =====================================================
          2 — TOTAL DOCTORS
      ===================================================== */}

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Total de médicos
            </p>

            <strong className="mt-2 block text-3xl font-semibold tracking-tight text-slate-900">
              {doctors.length}
            </strong>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            ↗
          </div>
        </div>

        <div className="mt-7 grid grid-cols-3 divide-x divide-slate-200">
          <div className="pr-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <p className="text-xs text-slate-500">
                Ativos
              </p>
            </div>

            <strong className="mt-1 block text-lg text-slate-800">
              {activeDoctors}
            </strong>
          </div>

          <div className="px-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-300" />

              <p className="text-xs text-slate-500">
                Inativos
              </p>
            </div>

            <strong className="mt-1 block text-lg text-slate-800">
              {inactiveDoctors}
            </strong>
          </div>

          <div className="pl-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-200" />

              <p className="text-xs text-slate-500">
                Especialidades
              </p>
            </div>

            <strong className="mt-1 block text-lg text-slate-800">
              {specialties}
            </strong>
          </div>
        </div>

        <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
          {activePercentage > 0 && (
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{
                width: `${activePercentage}%`,
              }}
            />
          )}

          {inactivePercentage > 0 && (
            <div
              className="h-full bg-slate-300 transition-all"
              style={{
                width: `${inactivePercentage}%`,
              }}
            />
          )}
        </div>

        <div className="mt-3 flex justify-between text-xs text-slate-400">
          <span>
            {activePercentage}% ativos
          </span>

          <span>
            {inactivePercentage}% inativos
          </span>
        </div>
      </article>

      {/* =====================================================
          3 — DOCTORS BY SPECIALTY
      ===================================================== */}

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Distribuição médica
            </p>

            <div className="mt-2 flex items-end gap-2">
              <strong className="text-3xl font-semibold tracking-tight text-slate-900">
                {specialties}
              </strong>

              <span className="mb-1 text-xs font-medium text-amber-600">
                especialidades
              </span>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
            ↗
          </div>
        </div>

        <div className="mt-5 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={doctorsBySpecialty}>
              <CartesianGrid
                vertical={false}
                stroke="#F1F5F9"
              />

              <Tooltip
                cursor={{
                  fill: "#FFF7ED",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  fontSize: "12px",
                }}
                formatter={(value) => [
                  value,
                  "Médicos",
                ]}
              />

              <XAxis
                dataKey="specialty"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: "#94A3B8",
                }}
                tickFormatter={(value: string) =>
                  value.length > 8
                    ? `${value.slice(0, 8)}…`
                    : value
                }
              />

              <Bar
                dataKey="total"
                fill={COLORS.orange}
                radius={[5, 5, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}