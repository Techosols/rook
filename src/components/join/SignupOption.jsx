
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth0 } from '@auth0/auth0-react';

function SignupOption({ onClick, loading }) {
  const { isLoading } = useAuth0();
  const isLoadingState = isLoading || loading;

  return (
    <div className="bg-background dark:bg-background-dark p-3 md:p-8 min-h-46">
      <div className="container mx-auto max-w-md flex flex-col gap-y-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-primary dark:text-primary-dark mb-4">Welcome to Rook</h2>
          <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-8">
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Please sign into the email address that you would like to attach to your
              Rook membership. All notifications from Rook will go to this email
              address.
            </p>
            
            <div className="flex flex-col items-center">
              <button
                className={`py-3 px-8 rounded-full text-white w-full sm:w-auto space-x-3 flex items-center justify-center shadow-md transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-primary dark:bg-primary-dark cursor-pointer hover:bg-primary-hover dark:hover:bg-primary-dark-hover hover:shadow-lg"
                }`}
                onClick={onClick}
                disabled={isLoadingState}
              >
                {isLoadingState ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <GoogleIcon className="text-xl" />
                )}
                <span className="font-medium">
                  {isLoadingState ? "Signing in..." : "Sign up with Google"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupOption
