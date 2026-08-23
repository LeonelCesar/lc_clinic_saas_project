import { databaseCollections, fakeApiConfig } from "../types/config";
import { readCollection, writeCollection } from "../api/core/local-storage";
import type { Appointment } from "../types/appointment.type";
import type { Doctor } from "../types/doctor.types";
import type { Patient } from "../types/patient.types";
import type { MedicalService } from "../types/services.types";
import type { User } from "../types/user.types";

const DATABASE_VERSION_KEY = `${fakeApiConfig.databasePrefix}:version`;

const seedDate = "2026-08-01T09:00:00.000Z";

const usersSeed: User[] = [
  {
    id: "user-admin-1",
    name: "Leonel César",
    email: "admin@clinic.pt",
    password: "123456",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "user-doctor-1",
    name: "Dra. Eloa Maria Neves César",
    email: "eloamaria@clinic.pt",
    password: "123456",
    role: "DOCTOR",
    status: "ACTIVE",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
];

const patientsSeed: Patient[] = [
  {
    id: "patient-1",
    name: "Rita da Costa César",
    email: "rita.cesar@email.pt",
    phone: "+351 912 345 678",
    birthDate: "1988-04-14",
    gender: "FEMALE",
    taxNumber: "245678901",
    healthNumber: "123456789",
    status: "ACTIVE",
    address: {
      street: "Rua da Liberdade, 25",
      city: "Lisboa",
      postalCode: "1000-120",
      country: "Portugal",
    },
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "patient-2",
    name: "António Liquine",
    email: "antonio.liquine@email.pt",
    phone: "+351 913 222 111",
    birthDate: "1975-09-22",
    gender: "MALE",
    taxNumber: "256789012",
    healthNumber: "987654321",
    status: "ACTIVE",
    address: {
      street: "Avenida Central, 84",
      city: "Barreiro",
      postalCode: "2830-200",
      country: "Portugal",
    },
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "patient-3",
    name: "Lanira Reis Brito Neves",
    email: "lanira.reis@email.pt",
    phone: "+351 914 555 123",
    birthDate: "1992-06-01",
    gender: "FEMALE",
    status: "ACTIVE",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
];

const doctorsSeed: Doctor[] = [
  {
    id: "doctor-1",
    name: "Dra. Henriqueta Bengui César",
    email: "henriqueta@clinic.pt",
    phone: "+351 211 000 101",
    licenseNumber: "OM-45678",
    specialty: "Cardiologia",
    status: "ACTIVE",
    consultationPrice: 85,
    schedule: [
      {
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: 3,
        startTime: "09:00",
        endTime: "17:00",
      },
      {
        dayOfWeek: 5,
        startTime: "09:00",
        endTime: "13:00",
      },
    ],
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "doctor-2",
    name: "Dr. Cristeen Patrick",
    email: "cristeen@clinic.pt",
    phone: "+351 211 000 102",
    licenseNumber: "OM-78542",
    specialty: "Clínica Geral",
    status: "ACTIVE",
    consultationPrice: 60,
    schedule: [
      {
        dayOfWeek: 1,
        startTime: "08:00",
        endTime: "16:00",
      },
      {
        dayOfWeek: 2,
        startTime: "08:00",
        endTime: "16:00",
      },
      {
        dayOfWeek: 4,
        startTime: "08:00",
        endTime: "16:00",
      },
    ],
    createdAt: seedDate,
    updatedAt: seedDate,
  },
];

const medicalServicesSeed: MedicalService[] = [
  {
    id: "service-1",
    name: "Consulta de Cardiologia",
    description: "Avaliação cardiológica completa.",
    durationInMinutes: 45,
    price: 85,
    specialty: "Cardiologia",
    status: "ACTIVE",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "service-2",
    name: "Consulta de Clínica Geral",
    description: "Consulta médica de avaliação geral.",
    durationInMinutes: 30,
    price: 60,
    specialty: "Clínica Geral",
    status: "ACTIVE",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "service-3",
    name: "Eletrocardiograma",
    description: "Exame de avaliação da atividade elétrica cardíaca.",
    durationInMinutes: 20,
    price: 35,
    specialty: "Cardiologia",
    status: "ACTIVE",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
];

const appointmentsSeed: Appointment[] = [
  {
    id: "appointment-1",
    patientId: "patient-1",
    doctorId: "doctor-1",
    serviceId: "service-1",
    date: "2026-08-03",
    startTime: "09:00",
    endTime: "09:45",
    status: "CONFIRMED",
    reason: "Avaliação de palpitações.",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "appointment-2",
    patientId: "patient-2",
    doctorId: "doctor-2",
    serviceId: "service-2",
    date: "2026-08-03",
    startTime: "10:00",
    endTime: "10:30",
    status: "SCHEDULED",
    reason: "Consulta de rotina.",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
  {
    id: "appointment-3",
    patientId: "patient-3",
    doctorId: "doctor-1",
    serviceId: "service-3",
    date: "2026-08-04",
    startTime: "11:00",
    endTime: "11:20",
    status: "SCHEDULED",
    reason: "Realização de eletrocardiograma.",
    createdAt: seedDate,
    updatedAt: seedDate,
  },
];

function seedCollection<T>(collection: string, records: T[]): void {
  const currentRecords = readCollection<T>(collection);

  if (currentRecords.length > 0) {
    return;
  }

  writeCollection(collection, records);
}

export function seedDatabase(): void {
  const storedVersion = Number(localStorage.getItem(DATABASE_VERSION_KEY));

  if (storedVersion === fakeApiConfig.databaseVersion) {
    return;
  }

  seedCollection(databaseCollections.users, usersSeed);
  seedCollection(databaseCollections.patients, patientsSeed);
  seedCollection(databaseCollections.doctors, doctorsSeed);
  seedCollection(databaseCollections.medicalServices, medicalServicesSeed);
  seedCollection(databaseCollections.appointments, appointmentsSeed);

  localStorage.setItem(
    DATABASE_VERSION_KEY,
    String(fakeApiConfig.databaseVersion),
  );
}
