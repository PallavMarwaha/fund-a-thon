import dayjs from "dayjs";

function formatDates(date) {
    return dayjs(date).format("DD MMMM, YYYY");
}

export default formatDates;
