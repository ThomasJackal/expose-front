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

    const response = await fetch(`${getBackUrl()}/a/event/create`, requestOptions)
    if (response.ok) {
        const json = await response.json();
        console.log("oui")
        return json.id;

    } else {
        console.error("Une erreur s'est produite lors de la création de l'évènement", `${response} (error:${response.error})`);
        return false;
    }
}
