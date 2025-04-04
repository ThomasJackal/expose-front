import getBackUrl from "./backUrl";

export function authenticate(userInfos, setToken, navigate) {

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfos)
    };

    console.log(userInfos);

    fetch(`${getBackUrl()}/security/authenticate`, requestOptions)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(json => {
        console.log(json);
        setToken(json.accessToken);
        navigate("/");
    })
    .catch(response => {
        console.error("Une erreur s'est produite lors de l'authentification", `${response}`);
    });
}