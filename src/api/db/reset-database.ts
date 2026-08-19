import {
  databaseCollections,
  fakeApiConfig,
} from "../config";
import { removeCollection } from "../core/local-storage";
import { seedDatabase } from "./seed";

export function resetDatabase(): void {
  Object.values(databaseCollections).forEach(
    (collection) => {
      removeCollection(collection);
    },
  );

  const versionKey = `${fakeApiConfig.databasePrefix}:version`;

  localStorage.removeItem(versionKey);

  seedDatabase();
}