import React from 'react';
import {FormikValues, useFormik} from "formik";
import {digtectiveTokenValidationSchema} from "../validations/digtectiveTokenValidationSchema.ts";
import {CustomButton} from "../buttons/customButton.tsx";
import useMutateLogin from "../../apiHooks/mutations/authMutations.ts";
import TopHeader from "../topHeader/TopHeader.tsx";

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
        <>
        <TopHeader />
        <div className="bg-white flex flex-col gap-2 rounded-lg w-[calc(100%-20px)] mt-4 p-4">
            <h1 className="text-primary font-bold text-2xl">
                Connect to our Digger
            </h1>
            <p className="text-primary mt-1">
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
            <form onSubmit={formik.handleSubmit} className="flex items-end gap-4 my-1 w-full max-w-[800px]">
                <div className="flex flex-col gap-2">
                <label htmlFor="token" className="text-primary font-medium">
                    Token Key Code
                </label>
                    <div className="relative w-[500px] outline-none">
                        <div className="absolute -inset-[2px] rounded-md border-4 border-primary animate-pulse opacity-20"></div>
                        <input
                            id="token"
                            name="token"
                            type="text"
                            value={formik.values.token}
                            onChange={formik.handleChange}
                            placeholder="Place Token Key Here"
                            disabled={isLoading}
                            className="w-full h-[45px] border-transparent focus:outline-none focus:border-transparent focus:ring-0  outline-none px-2 py-1 border border-primary animate-pulse outline-none rounded-md bg-white relative"
                            autoComplete="off"
                        />
                    </div>

                </div>
                <CustomButton disabled={isLoading} type="submit" className="max-w-[165px] flex justify-center w-full h-[45px]">
                    Activate Token
                </CustomButton>
            </form>
            {error && (
                <p className="text-red">
                    {helperText}
                </p>
            )}
        </div>
        </>
    )
};

export default ConnectToDigger;
