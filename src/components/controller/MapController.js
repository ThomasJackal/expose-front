let lastRequestTime = new Date();
const requestCooldown = 1000;

export async function fetchAddress(address) {
    await cooldown();

    const openStreetMapRequest = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`

    const response = await fetch(openStreetMapRequest);
    const json = await response.json()

    return json;
}

export async function fetchReverseAddress(latLng) {
    await cooldown();

    const openStreetMapRequest = `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${latLng.lat}&lon=${latLng.lng}&zoom=18&addressdetails=1`

    const response = await fetch(openStreetMapRequest);
    const json = await response.json()

    return json;
}

async function cooldown() {

    const timer = requestCooldown - (new Date().getTime()) - (lastRequestTime.getTime());
    lastRequestTime = new Date();
    if (timer > 0) await new Promise(r => setTimeout(r, timer));
}
