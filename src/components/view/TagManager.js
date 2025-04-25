import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";

export default function TagManager(props) {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        handleChange(tags);
    }, [tags])

    const handleChange = useCallback((datas) => {
        props.setFormData(prevData => ({
            ...prevData,
            tags: datas
        }));
    }, []);

    return (
        <>
            <h5>Tag(s)</h5>
            <Tag>PAINT</Tag>
            <Tag>SCULPTURE</Tag>
            <Tag>SCENIC_ARTS</Tag>
            <Tag>PHOTOGRAPHIC</Tag>
            <Tag>MUSICAL</Tag>
            <Tag>PERFORMANCE</Tag>
            <Tag>VISUAL_ART</Tag>
        </>
    );

    function Tag(props) {

        const [selected, setSelected] = useState(tags.indexOf(props.children) != -1)

        function toggle() {

            setSelected(!selected)
            updateTags();
        }

        function updateTags() {
            const index = tags.indexOf(props.children);
            const newArr = [...tags];

            if (index === -1) {
                newArr.push(props.children);
            } else {
                newArr.splice(index, 1);
            }

            setTags(newArr);
        }

        return (
            <Button variant="transparent" onClick={toggle} className="p-0">
                <Badge bg={selected ? "danger" : "secondary"}>
                    {props.children}
                </Badge>
            </Button>
        );
    }
}

