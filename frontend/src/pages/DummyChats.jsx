import React from 'react';

const DummyPreviousChats = ({ previousChats }) => {
    return (
        <div style={{ paddingRight: '0.8rem', paddingTop: '1.4rem', maxWidth: '500px', fontSize: '18px', fontFamily: 'Arial' }}>
            <ul style={{ listStyle: 'none', padding: 0, marginLeft: 'auto' }}>
                {previousChats.map((chat, index) => (
                    <li key={index} style={{ marginBottom: '1rem' }}>
                        <div style={{ color: '#ffffff' }}>{chat.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DummyPreviousChats;
