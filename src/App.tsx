import { useState, useEffect } from 'react';
import { DemographicsPage } from './components/DemographicsPage';
import { RegistrationPage } from './components/RegistrationPage';
import { SummaryPage } from './components/SummaryPage';
import type { Demographics, SessionData, ErrorEvent } from './types';
import './styles/main.scss';

function App() {
  const [page, setPage] = useState<number>(0);
  const [sessionData, setSessionData] = useState<SessionData>({
    demographics: {
      fullName: '',
      age: '',
      gender: '',
      computerConfidence: 4,
      currentMood: 4,
      part2_confidentUsingComputers: 3,
      part2_solveWebsiteProblems: 3,
      part2_exploreInterfaces: 3,
      part2_errorsConfidence: 3
    },
    startTime: null,
    endTime: null,
    errorEvents: []
  });

  useEffect(() => {
    if (page === 0) {
      document.body.classList.add('demographics-page');
    } else {
      document.body.classList.remove('demographics-page');
    }
  }, [page]);

  const handleDemographicsChange = (data: Demographics) => {
    setSessionData(prev => ({ ...prev, demographics: data }));
  };

  const handleDemographicsNext = () => {
    setSessionData(prev => ({ ...prev, startTime: Date.now() }));
    setPage(1);
  };

  const handleRegistrationComplete = (errorEvents: ErrorEvent[]) => {
    setSessionData(prev => ({ 
      ...prev, 
      endTime: Date.now(),
      errorEvents 
    }));
    setPage(2);
  };

  return (
    <div className="container">
      {page === 0 && (
        <DemographicsPage 
          data={sessionData.demographics} 
          onChange={handleDemographicsChange} 
          onNext={handleDemographicsNext} 
        />
      )}
      
      {page === 1 && (
        <RegistrationPage 
          onComplete={handleRegistrationComplete} 
        />
      )}
      
      {page === 2 && (
        <SummaryPage sessionData={sessionData} />
      )}
    </div>
  );
}

export default App;
