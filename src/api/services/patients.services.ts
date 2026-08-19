import { databaseCollections } from "../config";
import type {
  CreateEntityInput,
  UpdateEntityInput,
} from "../core/entity.types";
import type {
  PaginatedResult,
  QueryOptions,
} from "../core/query.types";
import { LocalStorageRepository } from "../core/repository";
import type { Patient } from "../types/patient.types";

const patientsRepository =
  new LocalStorageRepository<Patient>(
    databaseCollections.patients,
  );

export const patientsService = {
  getAll(
    options?: QueryOptions<Patient>,
  ): Promise<PaginatedResult<Patient>> {
    return patientsRepository.getAll(options);
  },

  getById(id: string): Promise<Patient> {
    return patientsRepository.getById(id);
  },

  create(
    input: CreateEntityInput<Patient>,
  ): Promise<Patient> {
    return patientsRepository.create(input);
  },

  update(
    id: string,
    input: UpdateEntityInput<Patient>,
  ): Promise<Patient> {
    return patientsRepository.update(id, input);
  },

  remove(id: string): Promise<void> {
    return patientsRepository.remove(id);
  },

  count(): Promise<number> {
    return patientsRepository.count();
  },
};