import getBackUrl from "./backUrl";
import { fetchReverseAddress } from "./MapController";

export async function fetchEvent(eventId, setEvent) {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`${getBackUrl()}/event/${eventId}`, requestOptions);
    if (response.ok) {
        const json = await response.json();

        try {
            const address = await fetchReverseAddress({ lat: json.address.latitude, lng: json.address.longitude })
            console.log(address)
            json.address.firstLine = address.address.road;
            json.address.secondLine = address.display_name;
            json.address.postalCode = address.address.postcode;
            json.address.city = address.address.town;
        } catch (e) {
            console.log("echec de la récupération de l'addresse")
        }

        setEvent(json);

    } else {
        console.error("Une erreur s'est produite lors du fetch de l'event", `${response}`);
    }
}