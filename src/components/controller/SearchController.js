import React from "react";
import getBackUrl from "./backUrl";

export function search(jsonOutput, navigate, setEvents, searchPosition) {

    const LatLong = [1,1];

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildSearchInput(jsonOutput, LatLong))
    };

    fetch(`${getBackUrl()}/event/search`, requestOptions)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => {
            console.log(json);
            setEvents(json);
        })
        .catch(response => {
            console.error("Une erreur s'est produite lors de l'authentification", `${response}`);
        });
}

function buildSearchInput(jsonOutput, LatLong) {

    return {
        latitude: LatLong[0],
        longitude: LatLong[1],
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