import { driverTourSteps, riderTourSteps } from '@/constants';
import { useState, useEffect } from 'react';
import Joyride, { type Step, type CallBackProps, STATUS } from 'react-joyride';


interface GuidedTourProps {
  userRole: 'rider' | 'driver' | undefined;
}

export default function GuidedTour({ userRole }: GuidedTourProps) {
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  console.log(userRole)

  // রোল অনুযায়ী localStorage-এর জন্য একটি ডাইনামিক কী তৈরি করুন
  const tourLocalStorageKey = `tourCompleted_${userRole}`;

  useEffect(() => {
    // শুধুমাত্র রাইডার বা ড্রাইভার হলেই ট্যুরটি দেখানোর চেষ্টা করুন
    if (userRole === 'rider' || userRole === 'driver') {
      const hasCompletedTour = localStorage.getItem(tourLocalStorageKey);
      
      if (!hasCompletedTour) {
        // রোল অনুযায়ী সঠিক ধাপগুলো সেট করুন
        const currentSteps = userRole === 'rider' ? riderTourSteps : driverTourSteps;
        setSteps(currentSteps);
        // একটি ছোট ডিলে দিন যাতে পেজের এলিমেন্টগুলো রেন্ডার হতে পারে
        setTimeout(() => {
          setRunTour(true);
        }, 1500); // 1 second delay
      }
    }
  }, [userRole, tourLocalStorageKey]);


  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem(tourLocalStorageKey, 'true');
    }
  };
  
  return (
    <Joyride
      steps={steps}
      run={runTour}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton // স্কিপ বাটন দেখানোর জন্য
      styles={{
        options: {
          primaryColor: '#FF4D00',
          textColor: '#0F172A',
          arrowColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          zIndex: 1000
        },
      }}
    />
  );
}