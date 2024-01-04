import React, {FC} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import closableEnqueueSnackbar from '../../components/closableEnqueueSnackbar/closableEnqueueSnackbar';
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import {embedScript} from '../../constants/constants';
import {EmbedDataInterface} from '../../interfaces/hubspot.interface';
import {CustomButton} from "../../components/buttons/customButton.tsx";

interface EmbedFormDialogContentProps {
    closeDialog: () => void,
    isFetchingEmbedData?: boolean,
    isErrorEmbedData?: boolean,
    formId?: string | null,
    embedData?: EmbedDataInterface,
}

const EmbedFormDialogContent: FC<EmbedFormDialogContentProps> = (props) => {
    return (
        <div className="mx-auto w-full max-w-[515px]">
            <p className="xs:px-10 text-center text-sm text-primary">
                To embed this form, simply copy and paste the code below into the HTML code in your website.
            </p>
            <div className="mt-[30px] h-[250px] w-full overflow-auto rounded-lg bg-primary/10 p-4">
                {props.isFetchingEmbedData && !props.isErrorEmbedData && <LoadingSpinner center color="primary"/>}
                {props.isErrorEmbedData && (
                    <p className="text-center text-sm text-primary">
                        Something went wrong!
                    </p>
                )}
                {!props.isErrorEmbedData && !props.isFetchingEmbedData && !props.formId && (
                    <p className="text-center text-sm text-primary">
                        No embed data.
                    </p>
                )}

                {!props.isFetchingEmbedData && !props.isErrorEmbedData && props.formId && props.embedData && (
                    <pre>{embedScript(props.embedData?.region, props.embedData?.portalId, props.formId)}</pre>
                )}
            </div>
            <div className="ml-auto mt-5 flex w-fit gap-3">
                <CustomButton variant="outline" onClick={props.closeDialog} className="border-none">
                    Cancel
                </CustomButton>
                <CopyToClipboard
                    text={(props.formId && props.embedData
                        && embedScript(props.embedData?.region, props.embedData?.portalId, props.formId)) || ''}
                >
                    <CustomButton
                        disabled={!props.formId || !props.embedData}
                        onClick={() => closableEnqueueSnackbar('Copy successful', 'success')}
                    >
                        Copy
                    </CustomButton>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default EmbedFormDialogContent;
