import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], posts: [] });

    const search = async () => {
        try {
            const response = await axios.get(`https://wygo-ojzf.onrender.com/search?query=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error during search', error);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={search}>Search</button>

            <div>
                <h2>Users</h2>
                {results.users.map(user => (
                    <div key={user.id}>
                        <img src={user.avatar} alt={user.name} />
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2>Posts</h2>
                {results.posts.map(post => (
                    <div key={post.id}>
                        <img src={post.author.avatar} alt={post.author.name} />
                        <p>{post.author.name}</p>
                        <p>{post.content}</p>
                        <p>{post.postTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
