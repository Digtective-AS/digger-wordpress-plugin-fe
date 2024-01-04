import {useQuery} from 'react-query';
import {useNavigate} from 'react-router-dom';
import {AxiosResponse} from 'axios/index';
import {dataFetchDigger} from '../../axios/customAxios';
import {appendQueryParamIfNotEmpty, generateQueryKey} from '../../constants/hookConstants';
import {ApiError, ApiResponse} from '../../interfaces/apiResponse.type';
import {
  EmbedDataInterface,
  HubspotFormsInterface,
} from '../../interfaces/hubspot.interface';
import {PLUGIN_URL_PAGE_NAME} from "../../constants/pageIdentifiers.ts";

export const useGetHubspotForms = (
  identifier: string,
  rows: number,
  page: number,
) => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams();
  appendQueryParamIfNotEmpty(queryParams, 'rows', rows.toString());
  appendQueryParamIfNotEmpty(queryParams, 'onPage', page.toString());

  const queryKey = generateQueryKey(identifier, queryParams);

  return useQuery<AxiosResponse, ApiError<null>, ApiResponse<HubspotFormsInterface>>(
    [`hubspot_forms_${queryKey}`],
    () => dataFetchDigger.get(`/hubspot/forms?rows=${rows}&page=${page}`),
    {
      onSuccess: () => {
        navigate(`${window.location.pathname}?page=${PLUGIN_URL_PAGE_NAME}&rows=${rows}&onPage=${page}`, {replace: true});
      },
    },
  );
};

export const useGetHubspotFormEmbedData = () => useQuery<AxiosResponse, ApiError<null>, ApiResponse<EmbedDataInterface>>(
  ['hubspot_form_embed'],
  () => dataFetchDigger.get('/hubspot/embed'),
);

export const useIsConnectedToHubspot = () => useQuery<AxiosResponse, ApiError<null>, ApiResponse<EmbedDataInterface>>(
  ['hubspot_form_embed_is_connected'],
  () => dataFetchDigger.get('/hubspot/embed'),
);

