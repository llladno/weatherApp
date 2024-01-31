import React from 'react';

const DayCard = ({data}:any) => {
    console.log(data)
    return (
        <div>
            <h3>{data.maxtemp_c}</h3>
            <h5>{data.mintemp_c}</h5>
        </div>
    );
};

export default DayCard;