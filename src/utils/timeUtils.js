export function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} minute(s)`;
    } else if (minutes < 60 * 24) {
        return `${Math.round(minutes / 60)} hour(s)`;
    } else if (minutes < 60 * 24 * 7) {
        return `${Math.round(minutes / (60 * 24))} day(s)`;
    } else if (minutes < 60 * 24 * 30) {
        return `${Math.round(minutes / (60 * 24 * 7))} week(s)`;
    } else {
        return `${Math.round(minutes / (60 * 24 * 30))} month(s)`;
    }
}

export function convertToMinutes(value, unit) {
    if (unit === "custom") {
        return value;
    }

    switch (unit) {
        case 'minute':
            return value;
        case 'hour':
            return value * 60;
        case 'day':
            return value * 60 * 24;
        case 'week':
            return value * 60 * 24 * 7;
        case 'month':
            return value * 60 * 24 * 30;
        case 'year':
            return value * 60 * 24 * 365;
        default:
            throw new Error(`Unsupported unit: ${unit}`);
    }
}

export function formatRepeatTimeType(minutes) {
    if (minutes === 60) return "Hour";
    if (minutes === 1440) return "Day";
    if (minutes === 10080) return "Week";
    if (minutes === 43200) return "Month";
    return `${minutes} Minutes`;
}

export function formatRepeatTime(minutes) {
    if (minutes % 43200 === 0) {
        return `${minutes / 43200} month`;
    } else if (minutes % 10080 === 0) {
        return `${minutes / 10080} week`;
    } else if (minutes % 1440 === 0) {
        return `${minutes / 1440} day`;
    } else {
        return `${minutes} minutes`;
    }
}

export const TIME_IN_MINUTES = {
    MINUTE: 1,
    HOUR: 60,
    DAY: 60 * 24,
    WEEK: 60 * 24 * 7,
    MONTH: 60 * 24 * 30,
    CUSTOM: -1, // used to move to the custom tab
};