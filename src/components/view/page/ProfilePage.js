import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { fetchUserAsOwner, fetchUserAsVisitor, getPageInfos } from "../../controller/ProfileController";
import { myContext } from "../../..";


export default function ProfilePage() {

    const [pageUser, setPageUser] = useState(null);

    const [pageInfos, setPageInfos] = useState({
        exists:true,
        isMyself: false,
        artistPage: false
    });

    useEffect(() => {
        console.log(pageInfos)
    }, [pageInfos])

    const [token,] = useContext(myContext);

    if (pageUser == null) {

        initialize();

        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    async function initialize() {
        await handlePageInfos();
        await handlePageUser();
    }

    async function handlePageInfos() {
        const urlParams = new URLSearchParams(window.location.search);
        const pageUsername = urlParams.get('username');

        setPageInfos(await getPageInfos(pageUsername, token));
    }

    async function handlePageUser() {
        if (pageInfos.isMyself) {
            setPageUser("await fetchUserAsOwner(pageUsername, token)");
        } else {
            setPageUser("await fetchUserAsVisitor(pageUsername)");
        }
    }


    return (
        <>
            Hello {
                pageInfos.exists ?
                    `${pageInfos.isMyself ? "me" : "you"} , this is a ${pageInfos.artistPage ? "artist" : "user"} kind of page.` :
                    " this page does not exists"
            }
        </>
    );
}