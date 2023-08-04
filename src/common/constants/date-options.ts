import { DateOptionsFormat } from '../enums/date-options-format';

const LONG_OPTION = {
  month: DateOptionsFormat.LONG,
  day: DateOptionsFormat.NUMERIC,
  year: DateOptionsFormat.NUMERIC,
};

const SHORT_OPTION = {
  year: DateOptionsFormat.NUMERIC,
  day: DateOptionsFormat.NUMERIC,
  month: DateOptionsFormat.NUMERIC,
};

export { LONG_OPTION, SHORT_OPTION };
