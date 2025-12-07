import { useState, useEffect } from 'react';
import { DemographicsPage } from './components/DemographicsPage';
import { RegistrationPage } from './components/RegistrationPage';
import { SummaryPage } from './components/SummaryPage';
import { ThankYouPage } from './components/ThankYouPage';
import type { Demographics, PostSurvey, SessionData, ErrorEvent } from './types';
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
    postSurvey: {
      moodAfterTask: 4,
      part21_aestheticallyAppealing: 3,
      part21_feltIrritated: 3,
      part21_pleasingAppearance: 3,
      part21_helpedUnderstand: 3,
      part21_increasedStress: 3,
      part21_clearUnderstandable: 3,
      part22_increasedStress: 3,
      part22_pleasingAppearance: 3,
      part22_helpedUnderstand: 3,
      part22_positiveVisualImpression: 3,
      part22_feltFrustrated: 3,
      part22_guidedEffectively: 3,
      part23_guidedEffectively: 3,
      part23_aestheticallyAppealing: 3,
      part23_feltFrustrated: 3,
      part23_positiveVisualImpression: 3,
      part23_clearUnderstandable: 3,
      part23_feltIrritated: 3
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

  const handlePostSurveyChange = (data: PostSurvey) => {
    setSessionData(prev => ({ ...prev, postSurvey: data }));
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

  const handlePostSurveySubmit = () => {
    // Here you could save the data to a server, local storage, etc.
    console.log('Post-survey submitted:', sessionData);
    setPage(3);
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
        <SummaryPage
          sessionData={sessionData}
          onPostSurveyChange={handlePostSurveyChange}
          onSubmit={handlePostSurveySubmit}
        />
      )}

      {page === 3 && (
        <ThankYouPage />
      )}
    </div>
  );
}

export default App;
