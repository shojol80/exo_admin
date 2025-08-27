import isEmpty from "../isEmpty";
import dayjs from "dayjs";

export default function formatDate(str, format = "YYYY-MM-DD HH:mm") {
    if (isEmpty(str)) return null
    return dayjs(str).format(format);
}