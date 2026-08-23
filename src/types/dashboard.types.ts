export type DashboardAppointmenStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW"
  | "RESCHEDULED";

export interface DashboardAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: DashboardAppointmenStatus;
}

export interface AppointmentStatusMetric {
  staus: DashboardAppointmenStatus;
  label: string;
  count: number;
  percentage: number;
}

export interface DashboardSummary {
  appointmentsToday: number;
  totalPatients: number;
  activeDoctores: number;
  monthlyAppointements: number;
  monthlyExpectedRevenue: number;
  cancellationRate: number;
}

export interface DoctorWorkloadItem {
  doctorId: string;
  doctorName: string;
  speciality: string;
  appointmentsToday: string;
  appointmentsThisMonth: string;
}

export type DashboardAlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface DashboardAlert {
  id: string;
  title: string;
  description: string;
  severity: string;
}

export interface DashboardDate {
  summary: DashboardSummary;
  todayAppointments: DashboardAppointment[];
  upcomingAppointments: DashboardAppointment[];
  statuMetrics: AppointmentStatusMetric[];
  doctorWorkload: DoctorWorkloadItem[];
  alert: DashboardAlert[];
}
