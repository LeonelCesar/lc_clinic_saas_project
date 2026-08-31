import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Doctor, DoctorStatus } from "../types/doctor.types";
import { doctorsService } from "../services/doctors.services";

import type {
  DoctorFormValues,
  DoctorSortDirection,
  DoctorSortField,
  DoctorTableRow,
} from "../types/doctor-dashboard-type";

import {
  getScheduleDaysCount,
  normalizeDoctorSearch,
} from "../utils/doctor.utils";

const PAGE_SIZE = 8;

export const doctorsQueryKeys = {
  all: ["doctors"] as const,

  list: () => [...doctorsQueryKeys.all, "list"] as const,
};

function extractCollection<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (typeof payload !== "object" || payload === null) {
    return [];
  }

  const response = payload as Record<string, unknown>;

  const collections = [
    response.data,
    response.items,
    response.records,
    response.results,
  ];

  for (const collection of collections) {
    if (Array.isArray(collection)) {
      return collection as T[];
    }
  }

  return [];
}

export function useDoctors() {
  const queryClient = useQueryClient();
  const [search, setSearchState] = useState("");
  const [status, setStatusState] = useState<DoctorStatus | "ALL">("ALL");
  const [specialty, setSpecialtyState] = useState("ALL");
  const [sortField, setSortField] = useState<DoctorSortField>("name");
  const [sortDirection, setSortDirection] =
    useState<DoctorSortDirection>("asc");
  const [page, setPageState] = useState(1);

  /*
   * QUERY
   */

  const doctorsQuery = useQuery({
    queryKey: doctorsQueryKeys.list(),

    queryFn: () => doctorsService.getAll(),

    staleTime: 30_000,

    refetchOnWindowFocus: false,
  });

  /*
   * NORMALIZED DATA
   */

  const doctors = useMemo<Doctor[]>(
    () => extractCollection<Doctor>(doctorsQuery.data),
    [doctorsQuery.data],
  );

  /*
   * CREATE
   */

  const createMutation = useMutation({
    mutationFn: (values: DoctorFormValues) => {
      return doctorsService.create(values);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: doctorsQueryKeys.all,
      });
    },
  });

  /*
   * UPDATE
   */

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: DoctorFormValues }) => {
      return doctorsService.update(id, values);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: doctorsQueryKeys.all,
      });
    },
  });

  /*
   * DELETE
   */

  const deleteMutation = useMutation({
    mutationFn: (id: string) => doctorsService.remove(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: doctorsQueryKeys.all,
      });
    },
  });

  /*
   * TABLE MODEL
   */

  const rows = useMemo<DoctorTableRow[]>(() => {
    return doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      licenseNumber: doctor.licenseNumber,
      specialty: doctor.specialty,
      status: doctor.status,
      consultationPrice: doctor.consultationPrice,
      scheduleDays: getScheduleDaysCount(doctor.schedule),

      doctor,
    }));
  }, [doctors]);

  /*
   * SPECIALTIES
   */

  const specialties = useMemo(() => {
    return Array.from(new Set(rows.map((doctor) => doctor.specialty))).sort(
      (a, b) => a.localeCompare(b, "pt-PT"),
    );
  }, [rows]);

  /*
   * FILTERING
   */

  const filteredRows = useMemo(() => {
    const normalized = normalizeDoctorSearch(search);

    return rows.filter((doctor) => {
      const matchesSearch =
        normalized.length === 0 ||
        normalizeDoctorSearch(doctor.name).includes(normalized) ||
        normalizeDoctorSearch(doctor.email).includes(normalized) ||
        normalizeDoctorSearch(doctor.phone).includes(normalized) ||
        normalizeDoctorSearch(doctor.licenseNumber).includes(normalized);

      const matchesStatus = status === "ALL" || doctor.status === status;

      const matchesSpecialty =
        specialty === "ALL" || doctor.specialty === specialty;

      return matchesSearch && matchesStatus && matchesSpecialty;
    });
  }, [rows, search, status, specialty]);

  /*
   * SORTING
   */

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      let result = 0;

      switch (sortField) {
        case "consultationPrice":
          result = a.consultationPrice - b.consultationPrice;

          break;

        case "specialty":
          result = a.specialty.localeCompare(b.specialty, "pt-PT");

          break;

        case "name":
        default:
          result = a.name.localeCompare(b.name, "pt-PT");

          break;
      }

      return sortDirection === "asc" ? result : -result;
    });
  }, [filteredRows, sortField, sortDirection]);

  /*
   * PAGINATION
   */

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;

    return sortedRows.slice(start, start + PAGE_SIZE);
  }, [sortedRows, safePage]);

  /*
   * STATS
   */

  const stats = useMemo(() => {
    const active = rows.filter((doctor) => doctor.status === "ACTIVE").length;

    const inactive = rows.filter(
      (doctor) => doctor.status === "INACTIVE",
    ).length;

    return {
      total: rows.length,
      active,
      inactive,
      specialties: specialties.length,
    };
  }, [rows, specialties]);

  /*
   * HANDLERS
   */

  function handleSearch(value: string): void {
    setSearchState(value);
    setPageState(1);
  }

  function handleStatus(value: DoctorStatus | "ALL"): void {
    setStatusState(value);
    setPageState(1);
  }

  function handleSpecialty(value: string): void {
    setSpecialtyState(value);
    setPageState(1);
  }

  function handlePageChange(nextPage: number): void {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setPageState(nextPage);
  }

  function toggleSort(field: DoctorSortField): void {
    if (sortField === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));

      return;
    }

    setSortField(field);
    setSortDirection("asc");
    setPageState(1);
  }

  return {
    doctors,
    rows: paginatedRows,

    totalDoctors: stats.total,
    activeDoctors: stats.active,
    inactiveDoctors: stats.inactive,
    totalSpecialties: stats.specialties,

    specialties,
    filteredCount: filteredRows.length,

    search,
    status,
    specialty,
    sortField,
    sortDirection,

    page: safePage,
    pageSize: PAGE_SIZE,
    totalPages,

    setSearch: handleSearch,
    setStatus: handleStatus,
    setSpecialty: handleSpecialty,
    setPage: handlePageChange,
    toggleSort,

    isLoading: doctorsQuery.isLoading,
    isFetching: doctorsQuery.isFetching,
    isError: doctorsQuery.isError,
    error: doctorsQuery.error,
    refetch: doctorsQuery.refetch,

    createDoctor: createMutation.mutateAsync,
    updateDoctor: updateMutation.mutateAsync,
    deleteDoctor: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    allRows: rows,
  };
}
