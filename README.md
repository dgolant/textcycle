# textcycle
An SMS interface for the Indianapolis Pacer Bikeshare program :D, deeply a work in progress

**Prerequisites:**

 * Twilio AccountSID, Authentication Token, and Mobile Number (Capable of sending SMS)
 * A Mobile phone capable of receiving SMS
 * Node stuff (npm, node, etc. etc.)
  
**Setup:**
  
 * Go into tokens.json and populate the information.  Note that phone numbers must be in format +10000000000, with 1 being your    country     code
 * Go into settings.json.
 * Fill which stations you would like to track (IDs can be found in stationMetaData.json, by default the ones I use are filled)
 * Fill in the scheduled times you would like text messages sent (Cron format is "SS MM HH DoM MM DoW(0-6)")
 * Leave DEBUG as False unless you are editing the project
 * `npm install` in the directory you've cloned to
 * `npm start`
 * Enjoy.

* * *

## Roadmap:

 * [x] ~~basic functionality (is it useful in my life?)~~
 * [ ] Add a basic config UI
 * [ ] text to get tracked station updates
 * [ ] text to get other station updates
 * [ ] text to reconfig
 * [ ] Add other GBFS cities?
 * [ ] host publicly? 
