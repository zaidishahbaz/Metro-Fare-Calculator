import moment from "moment";

export function parseDateTime(datetimeString: string): Date {
  return moment(datetimeString, "YYYY-MM-DDTHH:mm:ss").toDate();
}
