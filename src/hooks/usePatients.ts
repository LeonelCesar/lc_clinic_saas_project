import { useMemo, useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { appointmentsService } from "../services/appointment.service";
import { patientsService } from "../services/patients.services";

import type { Appointment } from "../types/appointment.type";
import type {
  Patient,
  PatientStatus,
} from "../types/patient.types";

import type {
  PatientFormValues,
  PatientSortField,
  PatientTableRow,
  SortDirection,
} from "../types/patient-dashboard.type";

import {
  calculateAge,
  getLastConsultation,
  normalizeSearch,
} from "../utils/patient.utils";

const PAGE_SIZE = 8;

export const patientsQueryKeys = {
  all: ["patients"] as const,

  list: () =>
    [...patientsQueryKeys.all, "list"] as const,

  appointments: () =>
    [
      ...patientsQueryKeys.all,
      "appointments",
    ] as const,
};

function extractCollection<T>(
  payload: unknown,
): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (
    typeof payload !== "object" ||
    payload === null
  ) {
    return [];
  }

  const response = payload as Record<
    string,
    unknown
  >;

  const possibleCollections = [
    response.data,
    response.items,
    response.records,
    response.results,
  ];

  for (const collection of possibleCollections) {
    if (Array.isArray(collection)) {
      return collection as T[];
    }
  }

  return [];
}

export function usePatients() {
  const queryClient =
    useQueryClient();

  /*
   * UI STATE
   */

  const [search, setSearchState] =
    useState("");

  const [status, setStatusState] =
    useState<
      PatientStatus | "ALL"
    >("ALL");

  const [sortField, setSortField] =
    useState<PatientSortField>(
      "name",
    );

  const [
    sortDirection,
    setSortDirection,
  ] =
    useState<SortDirection>("asc");

  const [page, setPageState] =
    useState(1);

  /*
   * QUERIES
   */

  const patientsQuery =
    useQuery({
      queryKey:
        patientsQueryKeys.list(),

      queryFn: () =>
        patientsService.getAll(),

      staleTime: 30_000,

      refetchOnWindowFocus: false,
    });

  const appointmentsQuery =
    useQuery({
      queryKey:
        patientsQueryKeys.appointments(),

      queryFn: () =>
        appointmentsService.getAll(),

      staleTime: 30_000,

      refetchOnWindowFocus: false,
    });

  /*
   * NORMALIZED DATA
   */

  const patients =
    useMemo<Patient[]>(
      () =>
        extractCollection<Patient>(
          patientsQuery.data,
        ),
      [patientsQuery.data],
    );

  const appointments =
    useMemo<Appointment[]>(
      () =>
        extractCollection<Appointment>(
          appointmentsQuery.data,
        ),
      [appointmentsQuery.data],
    );

  /*
   * CREATE PATIENT
   */

  const createMutation =
    useMutation({
      mutationFn: (
        values: PatientFormValues,
      ) => {
        return patientsService.create({
          ...values,
          status: "ACTIVE",
        });
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey:
            patientsQueryKeys.all,
        });
      },
    });

  /*
   * UPDATE PATIENT
   */

  const updateMutation =
    useMutation({
      mutationFn: ({
        id,
        values,
      }: {
        id: string;
        values: PatientFormValues;
      }) => {
        return patientsService.update(
          id,
          values,
        );
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey:
            patientsQueryKeys.all,
        });
      },
    });

  /*
   * DELETE PATIENT
   */

  const deleteMutation =
    useMutation({
      mutationFn: (
        id: string,
      ) =>
        patientsService.remove(id),

      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey:
            patientsQueryKeys.all,
        });
      },
    });

  /*
   * TABLE ROWS
   */

  const rows =
    useMemo<PatientTableRow[]>(
      () => {
        return patients.map(
          (patient) => {
            return {
              id: patient.id,

              name: patient.name,

              email: patient.email,

              phone: patient.phone,

              age: calculateAge(
                patient.birthDate,
              ),

              gender:
                patient.gender,

              lastConsultation:
                getLastConsultation(
                  patient.id,
                  appointments,
                ),

              status:
                patient.status,

              patient,
            };
          },
        );
      },
      [
        patients,
        appointments,
      ],
    );

  /*
   * SEARCH + FILTER
   */

  const filteredRows =
    useMemo(() => {
      const normalizedSearch =
        normalizeSearch(search);

      return rows.filter(
        (row) => {
          const matchesSearch =
            normalizedSearch.length ===
              0 ||
            normalizeSearch(
              row.name,
            ).includes(
              normalizedSearch,
            ) ||
            normalizeSearch(
              row.email,
            ).includes(
              normalizedSearch,
            ) ||
            normalizeSearch(
              row.phone,
            ).includes(
              normalizedSearch,
            );

          const matchesStatus =
            status === "ALL" ||
            row.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      rows,
      search,
      status,
    ]);

  /*
   * SORTING
   */

  const sortedRows =
    useMemo(() => {
      return [
        ...filteredRows,
      ].sort((a, b) => {
        let result = 0;

        switch (sortField) {
          case "age": {
            result =
              a.age - b.age;

            break;
          }

          case "lastConsultation": {
            const first =
              a.lastConsultation ??
              "";

            const second =
              b.lastConsultation ??
              "";

            result =
              first.localeCompare(
                second,
              );

            break;
          }

          case "name":
          default: {
            result =
              a.name.localeCompare(
                b.name,
                "pt-PT",
              );

            break;
          }
        }

        return sortDirection ===
          "asc"
          ? result
          : -result;
      });
    }, [
      filteredRows,
      sortField,
      sortDirection,
    ]);

  /*
   * PAGINATION
   */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        sortedRows.length /
          PAGE_SIZE,
      ),
    );

  const safePage =
    Math.min(
      page,
      totalPages,
    );

  const paginatedRows =
    useMemo(() => {
      const startIndex =
        (safePage - 1) *
        PAGE_SIZE;

      const endIndex =
        startIndex +
        PAGE_SIZE;

      return sortedRows.slice(
        startIndex,
        endIndex,
      );
    }, [
      sortedRows,
      safePage,
    ]);

  /*
   * STATISTICS
   */

  const statistics =
    useMemo(() => {
      const active =
        rows.filter(
          (patient) =>
            patient.status ===
            "ACTIVE",
        ).length;

      const inactive =
        rows.filter(
          (patient) =>
            patient.status ===
            "INACTIVE",
        ).length;

      return {
        total:
          rows.length,

        active,

        inactive,
      };
    }, [rows]);

  /*
   * HANDLERS
   */

  function handleSearch(
    value: string,
  ): void {
    setSearchState(value);

    setPageState(1);
  }

  function handleStatus(
    value:
      | PatientStatus
      | "ALL",
  ): void {
    setStatusState(value);

    setPageState(1);
  }

  function handlePageChange(
    nextPage: number,
  ): void {
    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return;
    }

    setPageState(nextPage);
  }

  function toggleSort(
    field: PatientSortField,
  ): void {
    if (sortField === field) {
      setSortDirection(
        (current) =>
          current === "asc"
            ? "desc"
            : "asc",
      );

      return;
    }

    setSortField(field);

    setSortDirection("asc");

    setPageState(1);
  }

  async function refetch(): Promise<void> {
    await Promise.all([
      patientsQuery.refetch(),
      appointmentsQuery.refetch(),
    ]);
  }

  /*
   * QUERY STATES
   */

  const isLoading =
    patientsQuery.isLoading ||
    appointmentsQuery.isLoading;

  const isFetching =
    patientsQuery.isFetching ||
    appointmentsQuery.isFetching;

  const isError =
    patientsQuery.isError ||
    appointmentsQuery.isError;

  const error =
    patientsQuery.error ??
    appointmentsQuery.error ??
    null;

  /*
   * PUBLIC API
   */

  return {
    /*
     * Data
     */
    rows:
      paginatedRows,

    allRows:
      rows,

    /*
     * Statistics
     */
    totalPatients:
      statistics.total,

    activePatients:
      statistics.active,

    inactivePatients:
      statistics.inactive,

    filteredCount:
      filteredRows.length,

    /*
     * Search / filters
     */
    search,

    status,

    setSearch:
      handleSearch,

    setStatus:
      handleStatus,

    /*
     * Sorting
     */
    sortField,

    sortDirection,

    toggleSort,

    /*
     * Pagination
     */
    page:
      safePage,

    pageSize:
      PAGE_SIZE,

    totalPages,

    setPage:
      handlePageChange,

    /*
     * Queries
     */
    isLoading,

    isFetching,

    isError,

    error,

    refetch,

    /*
     * Mutations
     */
    createPatient:
      createMutation.mutateAsync,

    updatePatient:
      updateMutation.mutateAsync,

    deletePatient:
      deleteMutation.mutateAsync,

    /*
     * Mutation states
     */
    isCreating:
      createMutation.isPending,

    isUpdating:
      updateMutation.isPending,

    isDeleting:
      deleteMutation.isPending,

    /*
     * Mutation errors
     */
    createError:
      createMutation.error,

    updateError:
      updateMutation.error,

    deleteError:
      deleteMutation.error,
  };
}