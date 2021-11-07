export const findHourDifference = (date: string): string => {
  return ((+new Date() - +new Date(date)) / 3600000).toFixed(0)
}
