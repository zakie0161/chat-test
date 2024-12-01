import React from 'react';
import PropTypes from 'prop-types';

const Shimmer = ({ className = '' }) => {
    return (
        <div role="status" className="animate-pulse">
            <div className={`bg-gray-200 mb-4 ${className}`}></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

Shimmer.propTypes = {
    className: PropTypes.string, // Prop type validation
};

export default Shimmer;
