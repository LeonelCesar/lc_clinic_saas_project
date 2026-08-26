/* export type DashboardAppointmentStatus =
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
  status: DashboardAppointmentStatus;
}

export interface AppointmentStatusMetric {
  staus: DashboardAppointmentStatus;
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
} */

import type { AppointmentStatus } from "./appointment.type";

export type DashboardAppointmentStatus = AppointmentStatus;

export interface DashboardAppointment {
  id: string;
  patientName: string;
  doctorName: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: DashboardAppointmentStatus;
}

export interface AppointmentStatusMetric {
  status: DashboardAppointmentStatus;
  label: string;
  count: number;
  percentage: number;
}

export interface DashboardSummary {
  appointmentsToday: number;
  totalPatients: number;
  activeDoctors: number;
  monthlyAppointments: number;
  monthlyExpectedRevenue: number;
  cancellationRate: number;
}

export interface DoctorWorkloadItem {
  doctorId: string;
  doctorName: string;
  specialty: string;
  appointmentsToday: number;
  appointmentsThisMonth: number;
}

export type DashboardAlertSeverity = "INFO" | "WARNING" | "CRITICAL";

export interface DashboardAlert {
  id: string;
  title: string;
  description: string;
  severity: DashboardAlertSeverity;
}

export interface DashboardData {
  summary: DashboardSummary;
  todayAppointments: DashboardAppointment[];
  upcomingAppointments: DashboardAppointment[];
  statusMetrics: AppointmentStatusMetric[];
  doctorWorkload: DoctorWorkloadItem[];
  alerts: DashboardAlert[];
}
