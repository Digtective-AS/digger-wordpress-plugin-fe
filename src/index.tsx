import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {SnackbarProvider} from 'notistack';
import './index.css';
import App from './App';
import LoadingSpinner from "./components/loadingSpinner/loadingSpinner.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const fallback =   <div className="h-[calc(100vh-64px)]">
    <LoadingSpinner center color="primary"/>
</div>

ReactDOM.createRoot(document.getElementById('react-test') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                <React.Suspense fallback={fallback}>
                    <App/>
                </React.Suspense>
            </SnackbarProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
);
