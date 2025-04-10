let lastRequestTime = new Date();
const requestCooldown = 1000;

export async function fetchAddress(address) {
    if (!cooldownIsFinished()) return;

    const openStreetMapRequest = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&polygon=1&addressdetails=1`

    const response = await fetch(openStreetMapRequest);
    const json = await response.json()

    return json;
}

export async function fetchReverseAddress(latLng) {
    if (!cooldownIsFinished()) return;

    const openStreetMapRequest = `https://nominatim.openstreetmap.org/reverse?format=xml&lat=${latLng.lat}&lon=${latLng.lng}&zoom=18&addressdetails=1`

    const response = await fetch(openStreetMapRequest);
    const json = await response.json()

    return json;
}

function cooldownIsFinished() {
    const timer = (new Date().getTime()) - (lastRequestTime.getTime());
    if (timer < requestCooldown) return false;
    lastRequestTime = new Date();
    return true;
}
