import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function fromNow(date: string) {
  return dayjs(date).fromNow();
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
