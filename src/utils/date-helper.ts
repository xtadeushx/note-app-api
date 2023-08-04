import { MONTHS } from 'src/common/constants/months';

const formatDateLong = (date: Date): string => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();

  const formattedDate = `${MONTHS[monthIndex]}, ${day} ${year}`;
  return formattedDate;
};

const formatDateShort = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

export { formatDateLong, formatDateShort };
