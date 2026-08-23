import { databaseCollections } from "../types/config";

import type {
  CreateEntityInput,
  UpdateEntityInput,
} from "../api/core/entity.types";

import type {
  PaginatedResult,
  QueryOptions,
} from "../api/core/query.types";

import { LocalStorageRepository } from "../api/core/repository";

import type { MedicalService } from "../types/services.types";

const medicalServicesRepository =
  new LocalStorageRepository<MedicalService>(
    databaseCollections.medicalServices,
  );

export const medicalServicesService = {
  getAll(
    options?: QueryOptions<MedicalService>,
  ): Promise<PaginatedResult<MedicalService>> {
    return medicalServicesRepository.getAll(options);
  },

  getById(id: string): Promise<MedicalService> {
    return medicalServicesRepository.getById(id);
  },

  create(
    input: CreateEntityInput<MedicalService>,
  ): Promise<MedicalService> {
    return medicalServicesRepository.create(input);
  },

  update(
    id: string,
    input: UpdateEntityInput<MedicalService>,
  ): Promise<MedicalService> {
    return medicalServicesRepository.update(id, input);
  },

  remove(id: string): Promise<void> {
    return medicalServicesRepository.remove(id);
  },

  count(): Promise<number> {
    return medicalServicesRepository.count();
  },
};