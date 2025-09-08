import { useState } from "react"
import { X, TriangleAlert } from "lucide-react";

import Button from "../../ui/Button";

function AiEnhance() {
    const [enhancedText, setEnhancedText] = useState("");
    const [showAlert, setShowAlert] = useState(true);

    const handleEnhance = () => {
        // Call AI enhancement API or logic here
        setEnhancedText("Enhanced text goes here...");
    };

    return (
        <div>
            {showAlert && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 flex items-center justify-between space-x-2" role="alert">
                    <div className="flex items-center space-x-2">
                        <TriangleAlert className="h-5 w-5 text-yellow-500" />
                        <p className="text-sm">AI Enhance is a paid feature. Charges will be added to your monthly bill.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <button onClick={() => setShowAlert(false)} className="text-yellow-500 hover:text-yellow-700 focus:outline-none">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
            <div className='p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-background dark:bg-background-dark rounded shadow space-y-4 dark:border dark:border-primary-dark dark:rounded-md'>
                <h2 className='text-2xl font-semibold dark:text-white'>AI Enhance</h2>
                <hr className='border-gray-300 dark:border-gray-600' />
                <p className="text-gray-500 text-sm">Get AI help writing parts of your profile essay. Just paste text you want "enhanced" by AI in the box below, and click "Enhance".</p>
                <p className="text-gray-500 text-sm">This is a paid feature and you will be charged, based on the total number of characters you input, and the number of characters output by the AI Assistant. We show you a running total of charges you incur, below the input text box. Charges you incur will be added to your monthly bill.</p>
                <textarea rows="3" className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary placeholder:text-gray-400" placeholder="Ask me about my new puppy. &#10;Ask me about my recent vacation to Brazil."></textarea>
                <div className="flex items-center justify-between" >
                    <Button text={"Enhance"} active={true} onClick={handleEnhance} />
                    <p className="text-gray-500">Characters: 1,100 || Charge: $0.10</p>
                </div>
                <textarea rows="3" className="border border-gray-300 dark:border-gray-500 p-2 rounded-lg w-full focus:outline-primary placeholder:text-gray-400" placeholder="AI Assistant will output text here.">{enhancedText}</textarea>
            </div>


        </div>
    )
}

export default AiEnhance
