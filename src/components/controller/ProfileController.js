import { getUserInfos_Token, getUserInfos_Username } from "../../utils/identificationUtils";
import getBackUrl from "./backUrl";

export async function getPageInfos(usernameToFetch, token) {
    const me = await getUserInfos_Token(token);
    const pageOwner = await getUserInfos_Username(usernameToFetch);

    return {
        exists:(pageOwner != null),
        isMyself:(me?.username == usernameToFetch),
        artistPage: pageOwner?.isArtist
    };
}


export async function fetchUserAsVisitor(usernameToFetch) {
    try {
        const response = await fetch(`${getBackUrl()}/${usernameToFetch}/details`);
        const json = await response.json()
        return json;
    } catch (error) {
        return null;
    }
}

export async function fetchUserAsOwner(usernameToFetch, token) {
    const requestOptions = {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    };

    try {
        const response = await fetch(`${getBackUrl()}/o/${usernameToFetch}/details`, requestOptions);
        const json = await response.json()
        return json;
    } catch (error) {
        return null;
    }
}
