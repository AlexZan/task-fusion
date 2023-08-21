import React from 'react';

function Insights() {
  return (
    <div className="theme-bg-darker theme-text-dark">
      <header className="text-center padding-small">
        <h1>Day Summary / Insights</h1>
      </header>
      <div className="container mx-auto max-w-5xl">
        <div className="gap-4 padding-small ">
          {/* Placeholder data for now */}
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Productive Time</h2>
            <p>XX hours YY minutes</p>
          </div>
        </div>
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Enjoyment Time</h2>
            <p>XX hours YY minutes</p>
          </div>
        </div>
        {/* You can expand this with more sections and visualizations */}
      </div>
    </div>
  );
}

export default Insights;
