export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateEntityInput<T extends BaseEntity> =
  Omit<T, keyof BaseEntity> & {
    id?: string;
  };

export type UpdateEntityInput<T extends BaseEntity> =
  Partial<Omit<T, keyof BaseEntity>>;