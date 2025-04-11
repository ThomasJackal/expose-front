import getBackUrl from "./backUrl";

export function search(jsonOutput, setEvents, searchPosition) {
    
    const searchInput = buildSearchInput(jsonOutput, searchPosition);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchInput)
    };


    fetch(`${getBackUrl()}/event/search`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            console.log(json);
            setEvents(json);
        })
        .catch(response => {
            console.error("Une erreur s'est produite lors de la rehcerche", `${response}`);
        });
}

function buildSearchInput(jsonOutput, LatLong) {

    return {
        latitude: LatLong.lat,
        longitude: LatLong.lng,
        field: jsonOutput.query,
        perimeter: jsonOutput.distance,
        eventType: jsonOutput.eventType,
        tags: jsonOutput.tags
    }
}

function fetchAddress(addressName) {
    console.log(addressName);

    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    fetch(`${getBackUrl()}/event/search`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            console.log(json);
            setEvents(json);
            navigate("/search");
        })
        .catch(response => {
            console.error("Une erreur s'est produite lors de l'authentification", `${response}`);
        });
}