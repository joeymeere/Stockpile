import React from 'react';
import FundraiserCard from "./Card";

const CardSection = () => {
    return (
        <div className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from(new Array(3)).map((_, i) => (
                <FundraiserCard key={i} />
                ))}
            </div>
        </div>
    );
};

export default CardSection;