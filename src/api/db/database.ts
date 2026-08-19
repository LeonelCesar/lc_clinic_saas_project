import { databaseCollections, fakeApiConfig } from "../config";
import { readCollection } from "../core/local-storage";

export interface DatabaseStats {
  version: number;
  users: number;
  patients: number;
  doctors: number;
  appointments: number;
  medicalServices: number;
}

export function getDatabaseStats(): DatabaseStats {
  const versionKey = `${fakeApiConfig.databasePrefix}:version`;

  return {
    version: Number(localStorage.getItem(versionKey) ?? 0),
    users: readCollection(databaseCollections.users).length,
    patients: readCollection(databaseCollections.patients).length,
    doctors: readCollection(databaseCollections.doctors).length,
    appointments: readCollection(databaseCollections.appointments).length,
    medicalServices: readCollection(databaseCollections.medicalServices).length,
  };
}
