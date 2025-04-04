import getBackUrl from "./backUrl";

export function fetchEvent(eventId, setEvent) {
    const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        
        fetch(`${getBackUrl()}/event/${eventId}`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            console.log(json)
            setEvent(json);
        })
        .catch(response => {
            console.error("Une erreur s'est produite lors du fetch de l'event", `${response}`);
        });
}