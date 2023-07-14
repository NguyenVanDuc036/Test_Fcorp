import moment from "moment";

export function formatTimeDuration(timeInput: string): string {
  const startTime = moment(timeInput, "YYYY/MM/DD HH:mm");
  const endTime = moment();
  const time = moment.duration(
    moment(endTime, "YYYY/MM/DD HH:mm").diff(
      moment(startTime, "YYYY/MM/DD HH:mm")
    )
  );
  const minutes = time.asMinutes();
  return minutes < 60
    ? (minutes < 1 ? 1 : minutes.toFixed()) + " minutes"
    : minutes < 1440
    ? time.asHours().toFixed() + " hours"
    : time.asDays().toFixed() + " day";
}
