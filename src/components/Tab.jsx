
  import useTab from '../hooks/useTab';

function ButtonGroup() {
  const { activeTab, setActiveTab } = useTab();

  return (
    <div className="mx-auto p-4 bg-background dark:bg-background-dark text-text dark:text-text-dark">
      <div className="flex gap-4 items-center my-4 md:flex-row flex-col justify-center mt-20">
        
        <button 
          onClick={() => setActiveTab('background')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'background' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Background Checks
        </button>
        
        <button
          onClick={() => setActiveTab('pricing')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'pricing' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Pricing
        </button>
        
        <button
          onClick={() => setActiveTab('filter')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'filter' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Filters
        </button>
        
        <button
          onClick={() => setActiveTab('pictures')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'pictures' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Pictures
        </button>
        
        <button
          onClick={() => setActiveTab('community')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'community' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Community
        </button>
        
        <button
          onClick={() => setActiveTab('stats')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'stats' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Stats
        </button>
        
        <button
          onClick={() => setActiveTab('join')}
          className={`py-4 px-12 border border-primary dark:border-primary-dark rounded-full cursor-pointer transition-all duration-300
            ${activeTab === 'join' ? 'bg-primary dark:bg-primary-dark text-white' : 'bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark'}`}
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default ButtonGroup;
