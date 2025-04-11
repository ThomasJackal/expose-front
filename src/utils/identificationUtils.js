import getBackUrl from "../components/controller/backUrl";

export async function getUserInfos_Token(token) {
    const requestOptions = {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    };

    try {
        const response = await fetch(`${getBackUrl()}/user/me/infos`, requestOptions);
        const json = await response.json()
        return json;
    } catch (error) {
        return null;
    }
    
}

export async function getUserInfos_Username(username) {

    try {
        const response = await fetch(`${getBackUrl()}/user/${username}/infos`);
        const json = await response.json()
        return json;
    } catch (error) {
        return null;
    }
    
}