# HCI Project Webpage

This is our webpage for testing the HCI-study "Effects of different kind of error mesages"

## Data Collection

Session data is automatically saved to Google Sheets when users complete the post-survey. The data includes:

- **Demographics**: Full name, age, gender, computer confidence ratings
- **Post-survey responses**: Mood ratings and error message evaluations
- **Timing data**: Task start/end times and duration
- **Error events**: Details about errors encountered during the registration process

### Google Sheets Setup

Data is sent to: `https://script.google.com/macros/s/AKfycbyUMwVwKqp6o48C4KyXAM4jh6dqqZB97orXoNch9W4GDVmPQ_gJV9ytmuETp5w7OvHHqg/exec`

Make sure your Google Sheet has these column headers (row 1):

```
Timestamp | Full Name | Age | Gender | Computer Confidence | Current Mood | Confident Using Computers | Solve Website Problems | Explore Interfaces | Errors Confidence | Team Name | Project Title | Description | Programming Languages | Email | GitHub URL | Participants | Mood After Task | Task Duration (seconds) | Error Events Count | part21_aestheticallyAppealing | part21_feltIrritated | part21_pleasingAppearance | part21_helpedUnderstand | part21_increasedStress | part21_clearUnderstandable | part22_increasedStress | part22_pleasingAppearance | part22_helpedUnderstand | part22_positiveVisualImpression | part22_feltFrustrated | part22_guidedEffectively | part23_guidedEffectively | part23_aestheticallyAppealing | part23_feltFrustrated | part23_positiveVisualImpression | part23_clearUnderstandable | part23_feltIrritated
```

### Time Display

**Task Duration column now shows seconds automatically:**
- Data is sent directly in seconds (no milliseconds)
- Empty durations show as blank (not zero)
- Example: 38.087 seconds for a ~38 second task

### UPDATED Google Apps Script Code

**IMPORTANT:** Replace your entire Google Apps Script with this exact code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Log the incoming data for debugging
    console.log('Received data:', JSON.stringify(data));

    // Flatten the nested data structure - EXACT column order
    const row = [
      new Date().toISOString(), // Column A: timestamp
      data.demographics?.fullName || '', // B: Full Name
      data.demographics?.age || '', // C: Age
      data.demographics?.gender || '', // D: Gender
      data.demographics?.computerConfidence || '', // E: Computer Confidence
      data.demographics?.currentMood || '', // F: Current Mood
      data.demographics?.part2_confidentUsingComputers || '', // G: Confident Using Computers
      data.demographics?.part2_solveWebsiteProblems || '', // H: Solve Website Problems
      data.demographics?.part2_exploreInterfaces || '', // I: Explore Interfaces
      data.demographics?.part2_errorsConfidence || '', // J: Errors Confidence
      data.registration?.teamName || '', // K: Team Name
      data.registration?.projectTitle || '', // L: Project Title
      data.registration?.description || '', // M: Description
      data.registration?.programmingLanguages || '', // N: Programming Languages
      data.registration?.email || '', // O: Email
      data.registration?.githubUrl || '', // P: GitHub URL
      data.registration?.participants || '', // Q: Participants
      data.postSurvey?.moodAfterTask || '', // R: Mood After Task
      data.startTime && data.endTime ? (data.endTime - data.startTime) / 1000 : '', // S: Task Duration (seconds)
      data.errorEvents?.length || 0, // T: Error Events Count
      // Post-survey questions (columns U-AJ)
      data.postSurvey?.part21_aestheticallyAppealing || '',
      data.postSurvey?.part21_feltIrritated || '',
      data.postSurvey?.part21_pleasingAppearance || '',
      data.postSurvey?.part21_helpedUnderstand || '',
      data.postSurvey?.part21_increasedStress || '',
      data.postSurvey?.part21_clearUnderstandable || '',
      data.postSurvey?.part22_increasedStress || '',
      data.postSurvey?.part22_pleasingAppearance || '',
      data.postSurvey?.part22_helpedUnderstand || '',
      data.postSurvey?.part22_positiveVisualImpression || '',
      data.postSurvey?.part22_feltFrustrated || '',
      data.postSurvey?.part22_guidedEffectively || '',
      data.postSurvey?.part23_guidedEffectively || '',
      data.postSurvey?.part23_aestheticallyAppealing || '',
      data.postSurvey?.part23_feltFrustrated || '',
      data.postSurvey?.part23_positiveVisualImpression || '',
      data.postSurvey?.part23_clearUnderstandable || '',
      data.postSurvey?.part23_feltIrritated || ''
    ];

    // Append the row
    sheet.appendRow(row);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

```
