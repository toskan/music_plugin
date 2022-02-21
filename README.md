# music_plugin


![This is an image](/images/radio_128px.png)
## WFMU Radio to LAST.FM

User needs:
**LAST.FM account**, **last.fm credentials** ([Get API Key and Secret](https://www.last.fm/api))

This extension allows WFMU radio listeners to track what they are listening to. It sends currently playing song info to the recent tracks played in their last.fm account. The user can also favorite songs on WFMU playlists and those will be added to their loved tracks in their last.fm account.

The extension can track what is being listened to on these sites: 

  - [https://wfmu.org/listen-live/](https://wfmu.org/listen-live/)
  - [radiorethink](https://www.radiorethink.com/tuner/index.cfm?stationCode=wfmu)
  - [tunein](https://tunein.com/radio/WFMU-911-s28808/) 
  - [radio.net](https://www.radio.net/s/wfmu)
  - [onlineradiobox](https://onlineradiobox.com/us/wfmu/?cs=us.wfmu)

  - on the WFMU page with the currently playing playlist (playlist and comments)

The listener can create last.fm credentials in their last.fm account to get an API key and secret. There will be prompts in the extension pop-up that allows them to do so. The link and required field info are provided in the pop-up to facilitate it.

The extension uses last.fm's api love.track and scrobble.track methods to accomplish its functionality.
