import React, {useState} from "react";

export const Post = (props) => {
    const [likes, setLikes] = useState(0);

    const addLike = () => {
        setLikes(likes+1);
    };

    return (
        <div className="Post">
            <h2>{props.name}</h2>
            <p>Name: {props.name}</p>
            <p>Likes: {likes}</p>
            <button onClick={addLike} class="fas fa-heart"></button>
        </div>
    );

};