import { useState } from "react";
import { Clock, CheckCircle, Flag, Code, Shield, AlertTriangle } from "lucide-react";

const EnhancedWelcomeScreen = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sample data
  const questions = Array(15).fill(null);
  const totalPoints = 100;

  const verifyIdentity = () => {
    setIsIdentityVerified(true);
  };

  const startAssessment = () => {
    console.log("Starting assessment");
    // Implementation would go here
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      <div className='absolute top-4 right-4'>
        <button onClick={toggleDarkMode} className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100 shadow"}`}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className={`max-w-4xl w-full mx-auto rounded-xl shadow-xl overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {/* Header with gradient */}
        <div className={`p-8 ${darkMode ? "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-4xl font-bold'>Programming Skills Assessment</h1>
              <p className='mt-2 opacity-90'>Demonstrate your coding expertise and problem-solving abilities</p>
            </div>
            <div className='hidden md:block'>
              <Code size={64} />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className='p-8'>
          {/* Features/highlights */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <div className='flex items-center space-x-3'>
              <Clock size={24} className='text-blue-500' />
              <span>60 minute time limit</span>
            </div>
            <div className='flex items-center space-x-3'>
              <CheckCircle size={24} className='text-green-500' />
              <span>{questions.length} coding challenges</span>
            </div>
            <div className='flex items-center space-x-3'>
              <Flag size={24} className='text-purple-500' />
              <span>{totalPoints} total points</span>
            </div>
          </div>

          {/* Instructions panel */}
          {showInstructions && (
            <div className={`rounded-xl mb-8 overflow-hidden ${darkMode ? "bg-gray-700/50" : "bg-blue-50"}`}>
              <div className={`py-3 px-4 flex items-center justify-between ${darkMode ? "bg-gray-700" : "bg-blue-100"}`}>
                <div className='flex items-center space-x-2'>
                  <AlertTriangle size={20} className='text-amber-500' />
                  <h2 className='font-semibold text-lg'>Instructions</h2>
                </div>
              </div>
              <div className='p-6'>
                <ul className='space-y-3'>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>
                      This assessment contains <span className='font-medium'>{questions.length} questions</span> worth a total of <span className='font-medium'>{totalPoints} points</span>.
                    </div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>
                      You have <span className='font-medium'>60 minutes</span> to complete the assessment.
                    </div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>Answer all questions to the best of your ability.</div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>You can flag questions to review later.</div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>For coding questions, make sure to test your solutions before submitting.</div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>Once you submit the assessment, you cannot change your answers.</div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>The assessment must be completed in one sitting.</div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>The assessment will be submitted automatically when the time expires.</div>
                  </li>
                  <li className='flex items-start space-x-3'>
                    <div className='mt-1 flex-shrink-0'>•</div>
                    <div>Identity verification is required before beginning.</div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className='space-y-4'>
            {!isIdentityVerified ? (
              <button className='w-full py-4 rounded-lg font-medium text-white transition-all transform hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md flex items-center justify-center space-x-2' onClick={verifyIdentity}>
                <Shield size={20} />
                <span>Verify Identity to Begin</span>
              </button>
            ) : (
              <button className='w-full py-4 rounded-lg font-medium text-white transition-all transform hover:scale-105 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md flex items-center justify-center space-x-2' onClick={startAssessment}>
                <CheckCircle size={20} />
                <span>Begin Assessment</span>
              </button>
            )}

            <button className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`} onClick={() => setShowInstructions(!showInstructions)}>
              <span>{showInstructions ? "Hide Instructions" : "Show Instructions"}</span>
            </button>
          </div>

          {/* Footer */}
          <div className={`mt-8 pt-4 text-center text-sm ${darkMode ? "text-gray-400 border-t border-gray-700" : "text-gray-500 border-t border-gray-200"}`}>
            <p>Need help? Contact support@programmingassessment.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWelcomeScreen;
