import getBackUrl from "./backUrl";

export async function saveEvent(event, token) {

    const requestOptions = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(event)
    };

    const response = await fetch(`${getBackUrl()}/a/event/create`, requestOptions);
    if (response.ok) return true;
    else return false;
}
