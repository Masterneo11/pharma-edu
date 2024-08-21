import React from 'react';

interface interfaceDirections {
    Instruct: string
}

const Directions: React.FC<interfaceDirections> = ({ Instruct }) => {

    return (
        <>
            <div className='directionsfield'>
                <label htmlFor='directions' className='directionslabel'>{Instruct}</label>
                <textarea
                    id='directions'
                    className='directionsinputbox'
                    placeholder="Directions..."
                />
            </div>
        </>
    );
}
export default Directions;