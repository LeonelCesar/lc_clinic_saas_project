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
import type { Doctor } from "../services/doctors.services";

const doctorsRepository =
  new LocalStorageRepository<Doctor>(
    databaseCollections.doctors,
  );

export const doctorsService = {
  getAll(
    options?: QueryOptions<Doctor>,
  ): Promise<PaginatedResult<Doctor>> {
    return doctorsRepository.getAll(options);
  },

  getById(id: string): Promise<Doctor> {
    return doctorsRepository.getById(id);
  },

  create(
    input: CreateEntityInput<Doctor>,
  ): Promise<Doctor> {
    return doctorsRepository.create(input);
  },

  update(
    id: string,
    input: UpdateEntityInput<Doctor>,
  ): Promise<Doctor> {
    return doctorsRepository.update(id, input);
  },

  remove(id: string): Promise<void> {
    return doctorsRepository.remove(id);
  },

  count(): Promise<number> {
    return doctorsRepository.count();
  },
};