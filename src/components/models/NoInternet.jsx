import { WifiOff, CloudOff } from "lucide-react";

function NoInternet() {
  return (
    <div className="flex items-center justify-center min-h-[300px] py-8 px-4 bg-background dark:bg-background-dark">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-background-dark p-6 flex flex-col items-center relative overflow-hidden">
        {/* Decorative graphics */}
        <div className="absolute -top-8 -left-8 opacity-20 pointer-events-none">
          <CloudOff size={96} />
        </div>
        <div className="absolute -bottom-8 -right-8 opacity-20 pointer-events-none">
          <CloudOff size={96} />
        </div>
        <div className="mb-4 text-primary dark:text-primary-dark z-10">
          <WifiOff size={72} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 dark:text-white z-10">No Internet Connection</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4 z-10">
          Please check your internet connection and try again.<br />
          You are currently offline.
        </p>
      </div>
    </div>
  );
}

export default NoInternet;
