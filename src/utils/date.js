import moment from 'moment/moment';

export const localDateFormat = (date, format) => {
    return moment(date, format).format('ll');
};
