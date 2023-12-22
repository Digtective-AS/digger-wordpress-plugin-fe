import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios/index';
import { dataFetchDigger } from '../../axios/customAxios';
import { appendQueryParamIfNotEmpty, generateQueryKey } from '../../constants/hookConstants';
import { ApiError, ApiResponse } from '../../interfaces/apiResponse.type';
import {
    EmbedDataInterface, HubspotContactSettingsContentInterface, HubspotContactSettingsFormInterface,
    HubspotFormsInterface,
    HubspotPipelineOptionsInterface,
} from '../../interfaces/hubspot.interface';
import { DraggableStatusCardsInterface } from '../../interfaces/draggableStatusCards';

export const useGetHubspotForms = (
    identifier: string,
    rows: number,
    page: number,
) => {
    const navigate = useNavigate();

    const queryParams = new URLSearchParams();
    appendQueryParamIfNotEmpty(queryParams, 'rows', rows.toString());
    appendQueryParamIfNotEmpty(queryParams, 'page', page.toString());

    const queryKey = generateQueryKey(identifier, queryParams);

    return useQuery<AxiosResponse, ApiError<null>, ApiResponse<HubspotFormsInterface>>(
        [`hubspot_forms_${queryKey}`],
        () => dataFetchDigger.get(`/hubspot/forms?${queryParams}`),
        {
            onSuccess: () => {
                navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
            },
        },
    );
};

export const useGetHubspotFormEmbedData = () => useQuery<AxiosResponse, ApiError<null>, ApiResponse<EmbedDataInterface>>(
    ['hubspot_form_embed'],
    () => dataFetchDigger.get('/hubspot/embed'),
);

export const useGetHubspotPipelineOptions = (identifier: string, hubspotPipelineId?: string) => {
    const navigate = useNavigate();

    return useQuery<AxiosResponse, ApiError<null>, ApiResponse<HubspotPipelineOptionsInterface[]>>(
        [`organization_${identifier}`],
        () => dataFetchDigger.get('/hubspot/pipelines'),
        {
            onSuccess: () => {
                navigate(`${window.location.pathname}?hubspotPipelineId=${hubspotPipelineId || ''}`, { replace: true });
            },
        },
    );
};

export const useGetHubspotPipelineStages = (identifier: string, hubspotPipelineId?: string | null) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams();
    if (hubspotPipelineId) {
        appendQueryParamIfNotEmpty(queryParams, 'hubspotPipelineId', hubspotPipelineId.trim());
    }

    const queryKey = generateQueryKey(identifier, queryParams);

    return useQuery<AxiosResponse, ApiError<null>, ApiResponse<DraggableStatusCardsInterface[]>>(
        [`hubspot_pipeline_stages_${queryKey}`],
        () => dataFetchDigger.get(`/hubspot/pipeline/${hubspotPipelineId}/stages`),
        {
            onSuccess: () => {
                navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
            },
            enabled: !!hubspotPipelineId,
        },
    );
};

export const useGetHubspotPipelineStagesMapped = (identifier: string, hubspotPipelineId?: string | null) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams();
    if (hubspotPipelineId) {
        appendQueryParamIfNotEmpty(queryParams, 'hubspotPipelineId', hubspotPipelineId.trim());
    }

    const queryKey = generateQueryKey(identifier, queryParams);

    return useQuery<AxiosResponse, ApiError<null>, ApiResponse<DraggableStatusCardsInterface[]>>(
        [`hubspot_pipeline_stages_mapped_${queryKey}`],
        () => dataFetchDigger.get(`/hubspot/pipeline/${hubspotPipelineId}/stages/mapped`),
        {
            onSuccess: () => {
                navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
            },
            enabled: !!hubspotPipelineId,
        },
    );
};

export const useGetHubspotContactSettingsFormData = () => (
    useQuery<AxiosResponse, ApiError<null>, ApiResponse<HubspotContactSettingsFormInterface>>(
        ['hubspot_contact_settings_form'],
        () => dataFetchDigger.get('/hubspot/organization-settings'),
    )
);
export const useGetHubspotContactSettingsContentData = () => (
    useQuery<AxiosResponse, ApiError<null>, ApiResponse<HubspotContactSettingsContentInterface[]>>(
        ['hubspot_contact_settings_content'],
        () => dataFetchDigger.get('/hubspot/contact-fields'),
    )
);
