"use client";
import { useState, useEffect } from "react";
import { Clock, CalendarClock, Users, Bell, ChevronRight, CheckCircle, ArrowLeft, HelpCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard-layout";
import { useRouter } from "next/navigation";

interface LoadingResultsPageProps {
  isResultReady?: boolean;
  assessmentName?: string;
  submissionDate?: string;
  expectedCompletionDate?: string;
}

export default function LoadingResultsPage({ isResultReady = false, assessmentName = "Assessment", submissionDate = "Today, 10:45 AM", expectedCompletionDate = "2-3 business days" }: LoadingResultsPageProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleReturnToDashboard = () => {
    router.push("/dashboard/student");
  };

  const handleEditNotifications = () => {
    router.push("/dashboard/student/settings/notifications");
  };

  if (!isResultReady) {
    return (
      <DashboardLayout userRole='student'>
        <div className='min-h-screen bg-gradient-to-br -m-10 from-indigo-50 pt-10 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 p-6'>
          <div className='max-w-7xl mx-auto'>
            {/* Header with back button */}
            <div className='mb-8 flex items-center'>
              <button 
                onClick={handleBackClick}
                className='mr-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                <ArrowLeft className='w-5 h-5 text-gray-600 dark:text-gray-300' />
              </button>
              <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>{assessmentName} Results</h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>Your assessment is being reviewed by our expert team</p>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Main Card */}
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700'>
                {/* Status Banner */}
                <div className='bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4 flex justify-between items-center'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm'>
                      <Clock className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <h2 className='text-white font-medium'>Review in Progress</h2>
                      <p className='text-blue-100 text-sm'>Expected completion: {expectedCompletionDate}</p>
                    </div>
                  </div>
                  <span className='px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm'>In Progress</span>
                </div>

                {/* Progress bar */}
                {/* <div className='w-full bg-gray-100 dark:bg-gray-700 h-1.5'>
                  <div className='bg-gradient-to-r from-indigo-500 to-blue-500 h-full transition-all duration-300 ease-out' style={{ width: `${progress}%` }}></div>
                </div> */}

                <div className='p-6'>
                  {/* Timeline */}
                  <div className='space-y-5 mb-8'>
                    <div className='flex items-start'>
                      <div className='flex flex-col items-center mr-4'>
                        <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-sm'>
                          <CheckCircle className='w-5 h-5 text-white' />
                        </div>
                        <div className='h-16 w-0.5 bg-gray-200 dark:bg-gray-700 mt-1'></div>
                      </div>
                      <div className='flex-1'>
                        <div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800'>
                          <h3 className='font-medium text-gray-900 dark:text-white'>Assessment Submitted</h3>
                          <p className='text-gray-600 dark:text-gray-400 text-sm mt-1'>Your responses have been securely received</p>
                        </div>
                        <p className='text-xs text-gray-500 dark:text-gray-500 mt-1 ml-1'>{submissionDate}</p>
                      </div>
                    </div>

                    <div className='flex items-start'>
                      <div className='flex flex-col items-center mr-4'>
                        <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-sm animate-pulse'>
                          <Users className='w-5 h-5 text-white' />
                        </div>
                        <div className='h-16 w-0.5 bg-gray-200 dark:bg-gray-700 mt-1'></div>
                      </div>
                      <div className='flex-1'>
                        <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800'>
                          <h3 className='font-medium text-gray-900 dark:text-white'>Expert Review</h3>
                          <p className='text-gray-600 dark:text-gray-400 text-sm mt-1'>Our team of experts is carefully reviewing your responses</p>
                        </div>
                        <p className='text-xs text-gray-500 dark:text-gray-500 mt-1 ml-1'>In progress</p>
                      </div>
                    </div>

                    <div className='flex items-start'>
                      <div className='flex flex-col items-center mr-4'>
                        <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                          <Bell className='w-5 h-5 text-gray-400 dark:text-gray-500' />
                        </div>
                      </div>
                      <div className='flex-1'>
                        <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700'>
                          <h3 className='font-medium text-gray-400 dark:text-gray-500'>Results Available</h3>
                          <p className='text-gray-400 dark:text-gray-500 text-sm mt-1'>You'll be notified when your results are ready to view</p>
                        </div>
                        <p className='text-xs text-gray-400 dark:text-gray-600 mt-1 ml-1'>Pending</p>
                      </div>
                    </div>
                  </div>

                  {/* Return to Dashboard Button */}
                  <div className='mt-8 flex justify-center'>
                    <button 
                      onClick={handleReturnToDashboard}
                      className='flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
                    >
                      Return to Dashboard
                      <ChevronRight className='w-4 h-4 ml-2' />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                {/* Notification Settings */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700'>
                  <div className='bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Bell className='w-5 h-5 text-indigo-500 dark:text-indigo-400 mr-3' />
                      <div>
                        <h3 className='font-medium text-gray-900 dark:text-white text-sm'>Notification Preferences</h3>
                        <p className='text-gray-500 dark:text-gray-400 text-xs'>You'll receive an email when results are ready</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleEditNotifications}
                      className='text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300'
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700'>
                  <div className='flex items-center mb-4'>
                    <HelpCircle className='w-5 h-5 text-indigo-500 dark:text-indigo-400 mr-2' />
                    <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Frequently Asked Questions</h2>
                  </div>
                  <div className='space-y-4'>
                    <div className='p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer'>
                      <h3 className='font-medium text-gray-900 dark:text-white text-sm'>Why does the review process take time?</h3>
                      <p className='text-gray-600 dark:text-gray-400 text-xs mt-1'>Our expert team carefully reviews each response to provide you with detailed and meaningful feedback.</p>
                    </div>
                    <div className='p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer'>
                      <h3 className='font-medium text-gray-900 dark:text-white text-sm'>Will I be notified when results are ready?</h3>
                      <p className='text-gray-600 dark:text-gray-400 text-xs mt-1'>Yes, you'll receive an email notification as soon as your assessment results are available for viewing.</p>
                    </div>
                    <div className='p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer'>
                      <h3 className='font-medium text-gray-900 dark:text-white text-sm'>Can I continue using the platform while waiting?</h3>
                      <p className='text-gray-600 dark:text-gray-400 text-xs mt-1'>Absolutely! You can continue using all other features of the platform while your assessment is being reviewed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}
