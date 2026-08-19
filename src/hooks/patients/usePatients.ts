import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  patientsService,
  type Patient,
  type QueryOptions,
} from "../../api";
import type {
  CreateEntityInput,
  UpdateEntityInput,
} from "../../api/core/entity.types";

export const patientQueryKeys = {
  all: ["patients"] as const,

  lists: () =>
    [...patientQueryKeys.all, "list"] as const,

  list: (options: QueryOptions<Patient>) =>
    [
      ...patientQueryKeys.lists(),
      options,
    ] as const,

  details: () =>
    [...patientQueryKeys.all, "detail"] as const,

  detail: (id: string) =>
    [
      ...patientQueryKeys.details(),
      id,
    ] as const,
};

export function usePatients(
  options: QueryOptions<Patient>,
) {
  return useQuery({
    queryKey: patientQueryKeys.list(options),
    queryFn: () =>
      patientsService.getAll(options),
    placeholderData: keepPreviousData,
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: patientQueryKeys.detail(id),
    queryFn: () => patientsService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      input: CreateEntityInput<Patient>,
    ) => patientsService.create(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}

interface UpdatePatientVariables {
  id: string;
  data: UpdateEntityInput<Patient>;
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdatePatientVariables) =>
      patientsService.update(id, data),

    onSuccess: async (patient) => {
      queryClient.setQueryData(
        patientQueryKeys.detail(patient.id),
        patient,
      );

      await queryClient.invalidateQueries({
        queryKey: patientQueryKeys.lists(),
      });
    },
  });
}

export function useRemovePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      patientsService.remove(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: patientQueryKeys.all,
      });
    },
  });
}