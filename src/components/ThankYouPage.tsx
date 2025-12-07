import React from 'react';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <h1 className="thank-you-title">THANK YOU!</h1>

        <div className="thank-you-message">
          Your participation in this study is greatly appreciated.
          Your responses will help us improve user experiences and error handling in web applications.
        </div>

        <div className="thank-you-subtitle">
          You may now close this window.
        </div>

        <div className="thank-you-team">
          <h3>Team Members:</h3>
          <ul>
            <li>Elizaveta Voropaeva</li>
            <li>Polina Averkova</li>
            <li>Niklas Mikeska</li>
            <li>Julia Naguib</li>
          </ul>
        </div>

        <div className="thank-you-supervision">
          <p>Under the supervision of:</p>
          <p className="professor-name">Katherin Probst</p>
        </div>

        <div className="thank-you-course">
          <p>HCI / Human Computer Interaction</p>
        </div>
      </div>
    </div>
  );
};