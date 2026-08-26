import { fakeApiConfig } from "../../types/config";

function generateRandomDelay(): number {
  const { minimum, maximum } = fakeApiConfig.delay;

  return Math.floor(
    Math.random() * (maximum - minimum + 1) + minimum,
  );
}

export async function simulateNetworkDelay(): Promise<void> {
  const delay = generateRandomDelay();

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, delay);
  });
}