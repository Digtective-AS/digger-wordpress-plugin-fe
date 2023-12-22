import React, { useState } from 'react';
import DateCell from '../../partials/dateCell';
import {DEFAULT_ROWS_PER_PAGE, HUBSPOT_FORMS_TABLE} from "../../constants/constants.ts";
import {TableColumnInterface} from "../../interfaces/tableColumn.interface.ts";
import {useGetHubspotFormEmbedData, useGetHubspotForms} from "../../apiHooks/queries/useGetHubspotForms.ts";
import BasicDialog from "../../dialogs/basicDialog.tsx";
import EmbedFormDialogContent from "../../dialogs/dialogContents/embedFormDialogContent.tsx";
import BasicTable from "./basicTable.tsx";

const columns: TableColumnInterface[] = [
    {
        field: 'id',
        headerName: 'Id',
    },
    {
        field: 'name',
        headerName: 'Name',
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        cellRenderer: (params: string) => <DateCell params={params} />,
    }, {
        field: 'updatedAt',
        headerName: 'Updated At',
        cellRenderer: (params: string) => <DateCell params={params} />,
    },
];

const HubspotFormsTable = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROWS_PER_PAGE);
    const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState<boolean>(false);
    const [embedId, setEmbedId] = useState<string | null>(null);

    const {
        data: hubspotFormsData,
        isError: isErrorHubspotFormsData,
        refetch: refetchHubspotFormsData,
        isFetching,
    } = useGetHubspotForms(
        HUBSPOT_FORMS_TABLE,
        rowsPerPage,
        page + 1,
    );

    const {
        data: embedData,
        isFetching: isFetchingEmbedData,
        isError: isErrorEmbedData,
    } = useGetHubspotFormEmbedData();

    return (
        <>
            <BasicDialog
                open={isEmbedDialogOpen}
                closeDialog={() => setIsEmbedDialogOpen(false)}
                title="Embed your form"
            >
                <EmbedFormDialogContent
                    closeDialog={() => setIsEmbedDialogOpen(false)}
                    formId={embedId}
                    isFetchingEmbedData={isFetchingEmbedData}
                    isErrorEmbedData={isErrorEmbedData}
                    embedData={embedData?.data?.data}
                />
            </BasicDialog>
            <BasicTable
                data={hubspotFormsData?.data?.data}
                refetch={refetchHubspotFormsData}
                setPage={(newPage) => setPage(newPage)}
                setRowsPerPage={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
                setIsEmbedDialogOpen={(isOpen) => setIsEmbedDialogOpen(isOpen)}
                onEmbed={(id) => setEmbedId(id)}
                isError={isErrorHubspotFormsData}
                hasNextPage={hubspotFormsData?.data?.data?.hasNextPage}
                borderless
                isFetching={isFetching}
                page={page}
                columns={columns}
                rowsPerPage={rowsPerPage}
            />
        </>
    );
};
export default HubspotFormsTable;
