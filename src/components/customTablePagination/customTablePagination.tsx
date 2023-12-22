import React, { FC } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useTranslation } from 'react-i18next';
import { Colors, ROWS_PER_PAGE_OPTIONS } from '../../constants/constants';

interface CustomTablePaginationProps {
  count?: number,
  rowsPerPage: number,
  page: number,
  setPage: (_newPage: number) => void,
  refetch: () => void,
  setRowsPerPage: (_newRowsPerPage: number) => void,
  hasNextPage?: boolean,
}

const CustomTablePagination: FC<CustomTablePaginationProps> = (props) => {
  const handleChangePage = async (event: unknown, newPage: number) => {
    await props.setPage(newPage);
    props.refetch();
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPage(0);
    await props.setRowsPerPage(parseInt(event.target.value, 10));
    props.refetch();
  };

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      count={props.count || 0}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Rows per page"
      sx={{
        color: Colors.primary,
        backgroundColor: 'white',
        fontSize: 12,
        '& .MuiTablePagination-select': {
          color: Colors.primary,
          padding: 0,
        },
        '& .MuiTablePagination-selectLabel': {
          fontSize: 12,
        },
        '& .MuiTablePagination-displayedRows': {
          fontSize: 12,
        },
      }}
      labelDisplayedRows={({ from, to, count }) => {
        if (count) {
            return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`;

        }
        return '';
      }}
      nextIconButtonProps={{
        disabled: props.hasNextPage === false
          || (props.count ? props.count < props.rowsPerPage * (props.page + 1) + 1 : false),
      }}
    />
  );
};

export default CustomTablePagination;
