const formatDate = (date: Date, localization, options): string =>
  date.toLocaleDateString(localization, options);

export { formatDate };
