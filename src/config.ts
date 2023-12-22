export interface EnvConfig {
    readonly baseApiUrl: string;
    readonly baseCoreApiUrl?: string;
    readonly baseDiggerApiUrl?: string;
    readonly wordpressPluginApiUrl?: string;
}

export enum Env {
    LOCAL = 'local',
    TEST = 'test',
    PROD = 'prod',
}

export type Config = Record<Env, EnvConfig>;

const rootConfigs: Config = {
    [Env.LOCAL]: {
        baseApiUrl: 'https://test-api-digger-v2.digtective.com/digger-dashboard/api/',
        baseCoreApiUrl: 'https://test-api-digger-v2.digtective.com/digger-core-api/',
        baseDiggerApiUrl: 'https://test-api-digger-v2.digtective.com/digger-dashboard/api/',
        wordpressPluginApiUrl: 'http://localhost/wordpress/',
    },
    [Env.TEST]: {
        baseApiUrl: 'https://test-api-digger-v2.digtective.com/digger-dashboard/api/',
        baseCoreApiUrl: 'https://test-api-digger-v2.digtective.com/digger-core-api/',
        baseDiggerApiUrl: 'https://test-api-digger-v2.digtective.com/digger-dashboard/api/',
        wordpressPluginApiUrl: 'http://localhost/wordpress/',
    },
    [Env.PROD]: {
        baseApiUrl: 'https://api-digger-v2.digtective.com/digger-dashboard/api/',
        baseCoreApiUrl: 'https://api-digger-v2.digtective.com/digger-core-api/',
        baseDiggerApiUrl: 'https://api-digger-v2.digtective.com/digger-dashboard/api/',
        wordpressPluginApiUrl: 'http://localhost/wordpress/',
    },
};

function resolveEnv(): Env {
    switch (window.location.host) {
        case 'digger-v2.digtective.com':
            return Env.PROD;
        case 'test-digger-v2.digtective.com':
            return Env.TEST;
        default:
            return Env.LOCAL;
    }
}

export default rootConfigs[resolveEnv()];
