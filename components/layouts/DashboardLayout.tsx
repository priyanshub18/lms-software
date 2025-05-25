import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'teacher' | 'student';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-gray-800">LMS Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            <a href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <span>Dashboard</span>
            </a>
            {userRole === 'admin' && (
              <>
                <a href="/dashboard/admin/students" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>Students</span>
                </a>
                <a href="/dashboard/admin/teachers" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>Teachers</span>
                </a>
                <a href="/dashboard/admin/courses" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>Courses</span>
                </a>
              </>
            )}
            {userRole === 'teacher' && (
              <>
                <a href="/dashboard/teacher/classes" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>My Classes</span>
                </a>
                <a href="/dashboard/teacher/assignments" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>Assignments</span>
                </a>
              </>
            )}
            {userRole === 'student' && (
              <>
                <a href="/dashboard/student/courses" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>My Courses</span>
                </a>
                <a href="/dashboard/student/assignments" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                  <span>Assignments</span>
                </a>
              </>
            )}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${userRole}&background=random`}
                  alt={userRole}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 