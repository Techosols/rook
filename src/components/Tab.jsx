  import React, { useState } from 'react';

function ButtonGroup() {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div className="mx-auto p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <div className="flex gap-4 items-center my-4 md:flex-row flex-col justify-center mt-20">
        
        <button 
          onClick={() => setActiveButton('background-checks')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'background-checks' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Background Checks
        </button>
        
        <button
          onClick={() => setActiveButton('pricing')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'pricing' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Pricing
        </button>
        
        <button
          onClick={() => setActiveButton('filters')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'filters' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Filters
        </button>
        
        <button
          onClick={() => setActiveButton('pictures')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'pictures' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Pictures
        </button>
        
        <button
          onClick={() => setActiveButton('community')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'community' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Community
        </button>
        
        <button
          onClick={() => setActiveButton('stats')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'stats' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Stats
        </button>
        
        <button
          onClick={() => setActiveButton('join')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeButton === 'join' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default ButtonGroup;
