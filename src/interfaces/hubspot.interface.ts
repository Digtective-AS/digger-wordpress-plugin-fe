export interface HubspotContactSettingsFormInterface {
    amount: string,
    status: string,
}

export interface HubspotContactSettingsContentInterface {
    label: string,
    status: boolean,
    id: number,
}

export interface HubspotPipelineOptionsInterface {
    id?: string,
    label?: string,
}

export interface HubspotSingleFormInterface {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export interface HubspotFormsInterface {
    data?: HubspotSingleFormInterface,
    hasNextPage?: boolean,
}

export interface EmbedDataInterface {
    region: string,
    portalId: string
}
