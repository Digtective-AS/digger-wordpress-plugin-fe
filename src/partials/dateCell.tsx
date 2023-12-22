import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';

interface DateCellProps {
    params: string;
}

const DateCell: React.FC<DateCellProps> = (props) => {
    const plainDate = props.params;
    const language = localStorage.getItem('i18nextLng');

    let formattedDate = moment(plainDate).format('LL');

    if (language === 'no') {
        moment.locale('nb');
        formattedDate = moment(plainDate).format('D. MMMM YYYY');
    }

    return <span>{formattedDate}</span>;
};

export default DateCell;
