import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appointmentsService } from "../services/appointment.service";

import type {
  CreateEntityInput,
  UpdateEntityInput,
} from "../api/core/entity.types";

import type { Appointment } from "../types/appointment.type";
import type { QueryOptions } from "../api/core/query.types";

export const appointmentsQueryKeys = {
  all: ["appointments"] as const,

  lists: () => [...appointmentsQueryKeys.all, "list"] as const,

  list: (options?: QueryOptions<Appointment>) =>
    [...appointmentsQueryKeys.lists(), options] as const,

  detail: (id: string) => [...appointmentsQueryKeys.all, "detail", id] as const,
};

export function useAppointments(options?: QueryOptions<Appointment>) {
  return useQuery({
    queryKey: appointmentsQueryKeys.list(options),
    queryFn: () => appointmentsService.getAll(options),
    staleTime: 30_000,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateEntityInput<Appointment>) =>
      appointmentsService.create(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: appointmentsQueryKeys.all,
      });
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateEntityInput<Appointment>;
    }) => appointmentsService.update(id, input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: appointmentsQueryKeys.all,
      });
    },
  });
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentsService.remove(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: appointmentsQueryKeys.all,
      });
    },
  });
}
