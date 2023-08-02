export function getJoinedDataNames<T extends { name: string }>(data: T[]): string {
  return data.map((item) => item.name).join(', ');
}
