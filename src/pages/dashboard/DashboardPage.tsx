import {
  CalendarCheck,
  CalendarDays,
  Stethoscope,
  TrendingUp,
  UserRound,
  XCircle,
} from "lucide-react";

import PageContainer from "../../components/PageContainer";
import { AppointmentStatusPanel } from "../../components/dashboard/AppointmentStatusPanel";
import { DashboardAlerts } from "../../components/dashboard/DashboardAlert";
import { DashboardStatCard } from "../../components/dashboard/DashboardStartCard";
import { DoctorWorkload } from "../../components/dashboard/DoctorWorkLoad";
import { TodayAppointments } from "../../components/dashboard/TodayAppointment";
import { UpcomingAppointments } from "../../components/dashboard/UpcomingAppointments";
import { useDashboard } from "../../hooks/useDashboard";

import {
  formatCurrency,
  formatDashboardDate,
} from "../../utils/dashboard.utils";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return (
      <PageContainer
        title="Dashboard"
        description="Visão operacional da clínica."
      >
        <div className="flex min-h-80 items-center justify-center">
          <p className="text-sm text-slate-500">A carregar dashboard...</p>
        </div>
      </PageContainer>
    );
  }

  if (isError || !data) {
    return (
      <PageContainer
        title="Dashboard"
        description="Visão operacional da clínica."
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="font-semibold text-slate-900">
            Não foi possível carregar a dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Ocorreu um problema ao consultar os dados da clínica.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Tentar novamente
          </button>
        </div>
      </PageContainer>
    );
  }

  const {
    summary,
    todayAppointments,
    upcomingAppointments,
    statusMetrics,
    doctorWorkload,
    alerts,
  } = data;

  return (
    <PageContainer
      title="Dashboard"
      description="Visão operacional da clínica."
    >
      <div className="space-y-8">
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm text-slate-500">
              {formatDashboardDate(new Date())}
            </p>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              Visão geral da operação
            </h2>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <DashboardStatCard
            title="Consultas hoje"
            value={summary.appointmentsToday}
            description="Agenda clínica de hoje"
            icon={CalendarCheck}
          />

          <DashboardStatCard
            title="Pacientes"
            value={summary.totalPatients}
            description="Pacientes registados"
            icon={UserRound}
          />

          <DashboardStatCard
            title="Médicos ativos"
            value={summary.activeDoctors}
            description="Profissionais disponíveis"
            icon={Stethoscope}
          />

          <DashboardStatCard
            title="Marcações no mês"
            value={summary.monthlyAppointments}
            description="Volume mensal"
            icon={CalendarDays}
          />

          <DashboardStatCard
            title="Receita prevista"
            value={formatCurrency(summary.monthlyExpectedRevenue)}
            description="Marcações válidas do mês"
            icon={TrendingUp}
          />

          <DashboardStatCard
            title="Cancelamentos"
            value={`${summary.cancellationRate}%`}
            description="Taxa mensal"
            icon={XCircle}
          />
        </section>

        <DashboardAlerts alerts={alerts} />

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <TodayAppointments appointments={todayAppointments} />

          <UpcomingAppointments appointments={upcomingAppointments} />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <AppointmentStatusPanel metrics={statusMetrics} />

          <DoctorWorkload doctors={doctorWorkload} />
        </div>
      </div>
    </PageContainer>
  );
}
