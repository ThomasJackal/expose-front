import getBackUrl from "./backUrl";

export async function saveEvent(event, token) {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(event)
    };

    console.log(requestOptions);

    fetch(`${getBackUrl()}/a/event/create`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            return true
        })
        .catch(response => {
            console.error("Une erreur s'est produite lors de la création de l'évènement", `${response} (error:${response.error})`);
            return false
        });
}
