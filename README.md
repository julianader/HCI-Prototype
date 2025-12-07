# HCI Project Webpage

This is our webpage for testing the HCI-study "Effects of different kind of error mesages"

## Data Collection

Session data is automatically saved to Google Sheets when users complete the post-survey. The data includes:

- **Demographics**: Full name, age, gender, computer confidence ratings
- **Post-survey responses**: Mood ratings and error message evaluations
- **Timing data**: Task start/end times and duration
- **Error events**: Details about errors encountered during the registration process

### Google Sheets Setup

Data is sent to: `https://script.google.com/macros/s/AKfycbw1Syh06gO3CQvG7mKzMDYPtdjJnL9TuPeiESkMs8eZG5xzF-OuDUhwDclkwVGFywCh-w/exec`

Make sure your Google Sheet has these column headers (row 1):

```
Timestamp | Full Name | Age | Gender | Computer Confidence | Current Mood | Confident Using Computers | Solve Website Problems | Explore Interfaces | Errors Confidence | Mood After Task | Task Duration (ms) | Error Events Count | part21_aestheticallyAppealing | part21_feltIrritated | part21_pleasingAppearance | part21_helpedUnderstand | part21_increasedStress | part21_clearUnderstandable | part22_increasedStress | part22_pleasingAppearance | part22_helpedUnderstand | part22_positiveVisualImpression | part22_feltFrustrated | part22_guidedEffectively | part23_guidedEffectively | part23_aestheticallyAppealing | part23_feltFrustrated | part23_positiveVisualImpression | part23_clearUnderstandable | part23_feltIrritated
```

```
