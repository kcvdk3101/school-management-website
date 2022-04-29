export function convertDateString(date: string | Date | undefined) {
  return `${new Date(date as Date).toLocaleDateString()}`
}
