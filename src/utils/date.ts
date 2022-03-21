import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function fromNow(date: string) {
  return dayjs(date).fromNow();
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getFormatedDate(date: string, format?: string) {
  const currentDate = dayjs(date);
  if (!format) {
    return [currentDate.date(), currentDate.month().toString(), currentDate.year().toString()].join('/');
  }
  const formatValues = format.toUpperCase().split('/');
  const mappedDates = formatValues.map((event) =>
    event === 'DD' ? currentDate.date() : event === 'MM' ? currentDate.month() : currentDate.year(),
  );
  return mappedDates.join('/');
}
