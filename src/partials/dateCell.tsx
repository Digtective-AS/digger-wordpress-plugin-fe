import React from 'react';
import moment from 'moment';
import 'moment/locale/nb';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface DateCellProps {
  params: string;
}

const DateCell: React.FC<DateCellProps> = (props) => {
  const plainDate = props.params;
  const parsedDate = new Date(plainDate);

  const formattedDate = `${monthNames[parsedDate.getMonth()]} ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;

  return <span>{formattedDate}</span>;
};

export default DateCell;
