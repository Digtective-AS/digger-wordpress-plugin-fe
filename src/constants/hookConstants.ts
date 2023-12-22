import { Dayjs } from 'dayjs';
export const appendQueryParamIfNotEmpty = (params: URLSearchParams, key: string, value: string | number) => {
    if (value !== '' && !Number.isNaN(value as number)) {
        params.append(key, value.toString());
    }
};

export const generateQueryKey = (identifier: string, queryParams: URLSearchParams) => {
    const queryKeyParams = [
        identifier,
        ...queryParams.toString().split('&').filter((param) => param !== ''),
    ];

    return queryKeyParams.join('_');
};

export function formatDate(filterDateRange: Dayjs | null) {
    if (!filterDateRange) {
        return '';
    }

    return filterDateRange.format('YYYY-MM-DD');
}
