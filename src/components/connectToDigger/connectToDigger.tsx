import React from 'react';
import {FormikValues, useFormik} from "formik";
import {digtectiveTokenValidationSchema} from "../validations/digtectiveTokenValidationSchema.ts";
import {CustomButton} from "../buttons/customButton.tsx";
import useMutateLogin from "../../apiHooks/mutations/authMutations.ts";

const ConnectToDigger = () => {
    const {mutateAsync, isLoading} = useMutateLogin();

    const formik: FormikValues = useFormik({
        initialValues: {
            token: "",
        },
        validationSchema: digtectiveTokenValidationSchema,
        onSubmit: async (values) => {
            await mutateAsync(values);
        },
    });

    const error = Boolean(formik.touched.token) && Boolean(formik.errors.token);
    const helperText = Boolean(formik.touched.token) && formik.errors.token;

    return (
        <div className="bg-white w-[calc(100%-20px)] mt-4 p-4">
            <h1 className="text-primary font-medium text-2xl">
                Connect to our Digger
            </h1>
            <p className="text-red-500 mt-1">
                Please go to the digger dashboard and paste the token from the&nbsp;
                <a
                    href="https://digger-v2.digtective.com/developers/console"
                    target="_blank"
                    className="font-medium underline"
                >
                    developer console
                </a>
                &nbsp;page
            </p>
            <form onSubmit={formik.handleSubmit} className="flex flex-col items-start gap-1 my-3 w-full max-w-[500px]">
                <label htmlFor="token" className="text-primary font-medium">
                    Token
                </label>
                <input
                    id="token"
                    name="token"
                    type="text"
                    value={formik.values.token}
                    onChange={formik.handleChange}
                    placeholder="Token"
                    disabled={isLoading}
                    className="w-full"
                    autoComplete="off"
                />
                {error && (
                    <p className="text-red">
                        {helperText}
                    </p>
                )}
                <CustomButton disabled={isLoading} type="submit" className="mt-4">
                    Connect
                </CustomButton>
            </form>
        </div>
    )
};

export default ConnectToDigger;