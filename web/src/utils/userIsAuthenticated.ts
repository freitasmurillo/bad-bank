
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql"

export const userIsAuthenticated = (cb: Function = (res: boolean) => res) => {
    const [{ data, fetching }] = useMeQuery();
    return cb(fetching || data?.me);
}

export const goToLoginIfNotAuthenticated = (isAuthenticated: boolean): void => {
    if (!isAuthenticated) {
        const router = useRouter();
        router.replace('/');
    }
}

export const goToDashboardIfAuthenticated = (isAuthenticated: boolean): void => {
    if (isAuthenticated) {
        const router = useRouter();
        router.replace('/dashboard');
    }
}
