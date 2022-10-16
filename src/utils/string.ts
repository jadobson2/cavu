export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/_/g, '-')
    .replace(/[^\w-]+/g, '')
}
