"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CheckCircle, Book, Award, User, Download, Video } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";

// Types
interface Class {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  attendees: number;
  maxCapacity: number;
}

interface Resource {
  id: number;
  title: string;
  type: "PDF" | "Video";
  size: string;
  downloadable: boolean;
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function OfflineClassesTab() {
  const [nextClass, setNextClass] = useState<Class | null>(null);
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setNextClass({
        id: 1,
        title: "Advanced React Component Architecture",
        date: "April 30, 2025",
        time: "10:00 AM - 12:30 PM",
        location: "Tech Hub, Floor 3, Room 302",
        instructor: "Sarah Johnson",
        attendees: 18,
        maxCapacity: 25,
      });

      setUpcomingClasses([
        {
          id: 2,
          title: "UI/UX Design Principles",
          date: "May 3, 2025",
          time: "2:00 PM - 4:30 PM",
          location: "Design Studio, Floor 2, Room 205",
          instructor: "Michael Chen",
          attendees: 12,
          maxCapacity: 20,
        },
        {
          id: 3,
          title: "Backend Integration Workshop",
          date: "May 7, 2025",
          time: "9:30 AM - 1:00 PM",
          location: "Tech Hub, Floor 3, Room 310",
          instructor: "Priya Patel",
          attendees: 15,
          maxCapacity: 25,
        },
        {
          id: 4,
          title: "Advanced State Management",
          date: "May 12, 2025",
          time: "11:00 AM - 2:00 PM",
          location: "Tech Hub, Floor 3, Room 302",
          instructor: "Sarah Johnson",
          attendees: 8,
          maxCapacity: 25,
        },
      ]);

      setResources([
        {
          id: 1,
          title: "Component Architecture Slides",
          type: "PDF",
          size: "3.2 MB",
          downloadable: true,
        },
        {
          id: 2,
          title: "Workshop Recordings - April 20",
          type: "Video",
          size: "238 MB",
          downloadable: true,
        },
        {
          id: 3,
          title: "Practical Exercise Guide",
          type: "PDF",
          size: "1.8 MB",
          downloadable: true,
        },
      ]);

      setLoaded(true);
    }, 800);
  }, []);

  const handleRegister = (classId: number): void => {
    // Handle registration logic
    console.log(`Registered for class ${classId}`);
  };

  return (
    <TabsContent value='offline' className='w-full'>
      <div className='bg-slate-900 text-slate-200 rounded-lg p-6 min-h-screen'>
        <motion.div initial='hidden' animate={loaded ? "visible" : "hidden"} variants={staggerContainer} className='space-y-8'>
          {/* Header */}
          <motion.div variants={fadeIn} className='pb-4 border-b border-slate-700'>
            <h2 className='text-2xl font-bold text-blue-400'>Offline Classes</h2>
            <p className='text-slate-400 mt-1'>In-person sessions to enhance your learning experience</p>
          </motion.div>

          {/* Next Upcoming Class */}
          {nextClass && (
            <motion.div variants={fadeIn}>
              <h3 className='text-xl font-semibold text-slate-200 mb-4'>Next Class</h3>
              <motion.div whileHover={{ scale: 1.02 }} className='bg-slate-800 rounded-lg p-6 border-l-4 border-blue-500 shadow-lg'>
                <h4 className='text-lg font-semibold text-blue-400'>{nextClass.title}</h4>

                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='flex items-center gap-3'>
                    <Calendar className='h-5 w-5 text-blue-400' />
                    <span>{nextClass.date}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <Clock className='h-5 w-5 text-blue-400' />
                    <span>{nextClass.time}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <MapPin className='h-5 w-5 text-blue-400' />
                    <span>{nextClass.location}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <User className='h-5 w-5 text-blue-400' />
                    <span>{nextClass.instructor}</span>
                  </div>
                </div>

                <div className='mt-6 flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Users className='h-5 w-5 text-slate-400' />
                    <span className='text-slate-400'>
                      {nextClass.attendees} / {nextClass.maxCapacity} enrolled
                    </span>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium text-white' onClick={() => handleRegister(nextClass.id)}>
                    Reserve Seat
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Calendar View */}
          <motion.div variants={fadeIn} className='mt-8'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-slate-200'>Upcoming Schedule</h3>
              <button className='text-blue-400 flex items-center gap-1 hover:text-blue-300'>View Calendar</button>
            </div>

            <motion.div variants={staggerContainer} className='space-y-4'>
              {upcomingClasses.map((cls) => (
                <motion.div key={cls.id} variants={fadeIn} whileHover={{ scale: 1.01 }} className='bg-slate-800 p-4 rounded-lg flex flex-col md:flex-row justify-between gap-4'>
                  <div>
                    <h4 className='font-medium text-slate-200'>{cls.title}</h4>
                    <div className='flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-slate-400'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-4 w-4' />
                        <span>{cls.date}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>{cls.time}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <User className='h-4 w-4' />
                        <span>{cls.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <span className='text-sm text-slate-400'>
                      {cls.attendees}/{cls.maxCapacity}
                    </span>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded' onClick={() => handleRegister(cls.id)}>
                      Register
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Class Resources */}
          <motion.div variants={fadeIn} className='mt-8'>
            <h3 className='text-xl font-semibold text-slate-200 mb-4'>Class Resources</h3>
            <div className='bg-slate-800 rounded-lg p-6'>
              <motion.div variants={staggerContainer} className='divide-y divide-slate-700'>
                {resources.map((resource) => (
                  <motion.div key={resource.id} variants={fadeIn} className='py-3 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {resource.type === "PDF" ? <Book className='h-5 w-5 text-blue-400' /> : <Video className='h-5 w-5 text-blue-400' />}
                      <div>
                        <h4 className='font-medium text-slate-200'>{resource.title}</h4>
                        <p className='text-sm text-slate-400'>
                          {resource.type} · {resource.size}
                        </p>
                      </div>
                    </div>

                    {resource.downloadable && (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='p-2 text-blue-400 hover:text-blue-300 rounded-full hover:bg-slate-700'>
                        <Download className='h-5 w-5' />
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Performance & Attendance */}
          <motion.div variants={fadeIn} className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-slate-800 rounded-lg p-6'>
              <h3 className='text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2'>
                <CheckCircle className='h-5 w-5 text-blue-400' />
                Attendance Record
              </h3>
              <div className='flex items-center gap-4'>
                <div className='relative w-20 h-20'>
                  <svg className='w-full h-full' viewBox='0 0 36 36'>
                    <path
                      d='M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#334155'
                      strokeWidth='2'
                    />
                    <path
                      d='M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831'
                      fill='none'
                      stroke='#3b82f6'
                      strokeWidth='2'
                      strokeDasharray='85, 100'
                    />
                  </svg>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white'>85%</div>
                </div>
                <div>
                  <p className='text-slate-400'>You've attended 17 out of 20 classes</p>
                  <p className='text-sm text-blue-400 mt-1'>Great attendance rate!</p>
                </div>
              </div>
            </div>

            <div className='bg-slate-800 rounded-lg p-6'>
              <h3 className='text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2'>
                <Award className='h-5 w-5 text-blue-400' />
                Performance
              </h3>
              <div className='space-y-3'>
                <div>
                  <div className='flex justify-between text-sm mb-1'>
                    <span className='text-slate-400'>Participation</span>
                    <span className='text-blue-400'>Excellent</span>
                  </div>
                  <div className='h-2 bg-slate-700 rounded-full'>
                    <div className='h-2 bg-blue-500 rounded-full w-4/5'></div>
                  </div>
                </div>
                <div>
                  <div className='flex justify-between text-sm mb-1'>
                    <span className='text-slate-400'>Practical Exercises</span>
                    <span className='text-blue-400'>Good</span>
                  </div>
                  <div className='h-2 bg-slate-700 rounded-full'>
                    <div className='h-2 bg-blue-500 rounded-full w-3/5'></div>
                  </div>
                </div>
                <div>
                  <div className='flex justify-between text-sm mb-1'>
                    <span className='text-slate-400'>Assignments</span>
                    <span className='text-blue-400'>Excellent</span>
                  </div>
                  <div className='h-2 bg-slate-700 rounded-full'>
                    <div className='h-2 bg-blue-500 rounded-full w-4/5'></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeIn} className='mt-8'>
            <h3 className='text-xl font-semibold text-slate-200 mb-4'>Frequently Asked Questions</h3>
            <div className='space-y-4'>
              <div className='bg-slate-800 rounded-lg p-4'>
                <h4 className='font-medium text-blue-400'>How do I change my registered class?</h4>
                <p className='mt-2 text-slate-400'>You can cancel your registration up to 24 hours before the class starts. Go to "My Classes" section and select "Cancel Registration" next to the class you wish to change.</p>
              </div>
              <div className='bg-slate-800 rounded-lg p-4'>
                <h4 className='font-medium text-blue-400'>What should I bring to offline classes?</h4>
                <p className='mt-2 text-slate-400'>You should bring your laptop, notebook, and any course materials specified for that particular class. Check the class description for specific requirements.</p>
              </div>
              <div className='bg-slate-800 rounded-lg p-4'>
                <h4 className='font-medium text-blue-400'>Are recordings available for missed classes?</h4>
                <p className='mt-2 text-slate-400'>Yes, recordings are typically available within 48 hours after the class ends. You can find them in the "Class Resources" section.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {!loaded && (
          <div className='flex items-center justify-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        )}
      </div>
    </TabsContent>
  );
}
