import getBackUrl from "./backUrl";

export async function search(jsonInput, setEvents, searchPosition) {
    
    const searchInput = buildSearchInput(jsonInput, searchPosition);

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchInput)
    };

    fetch(`${getBackUrl()}/event/search`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            setEvents(json);
        })
        .catch(response => {
            console.error("Une erreur s'est produite lors de la recherche", `${response}`);
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
