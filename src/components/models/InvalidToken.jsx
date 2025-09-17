
import { ShieldAlert, RotateCcw, LogIn } from "lucide-react";

function InvalidToken() {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <div className="mb-4 text-red-500 dark:text-red-400">
        <ShieldAlert size={56} />
      </div>
      <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Invalid Token</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        Your authentication token is invalid or has expired.<br />
        Please log in again to continue.
      </p>
      <div className="flex items-center flex-col md:flex-row gap-2">
        <button
          className="mt-2 px-6 py-2 rounded-lg bg-secondary dark:bg-secondary-dark text-white font-semibold shadow hover:bg-secondary-dark hover:text-primary hover:border hover:border-secondary transition-colors flex items-center gap-2"
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={20} />
          Reload
        </button>
        <button
          className="mt-2 px-6 py-2 rounded-lg bg-primary dark:bg-primary-dark text-white font-semibold shadow hover:bg-primary-dark transition-colors flex items-center gap-2"
          onClick={() => window.location.href = '/login'}
        >
          <LogIn size={20} />
          Login
        </button>
      </div>
    </div>
  );
}

export default InvalidToken;
