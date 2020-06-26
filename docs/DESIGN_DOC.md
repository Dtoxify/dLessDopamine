# LessDopamine [Design Doc]
a master chrome extension, designed to integrate every component to counteract attention fragmenting sites, redesigning the web to be more user-centric and perserving user's attention states.

## app components
- feed blockers
- site greyscale
- delay site load time
- make sites frustrating to use in order to prevent users from mindlessly scrolling
- block sites on list
- add as many barriers to using the site's default settings
- remove display elements that are ads, or other unnecessary site bloat that reduces quality of user experience
- delay gratification => set timer so user intentionally uses the site (ex.warning_message = "Have you gotten everything done for today or are you trying to shut your brain off to avoid work?"
- reduce overall chrome extension usage, the goal is to deliver a master switch, and all-in-1 (mindfulness + indistractibility features) solution that users can configure settings for depending on their preferences (or predefined settings based on difficulty they select)

## difficulty modes to successfully transition user behavior
- introduce beginner, intermediate, and monk mode (hard) so that users know what mode to use in order to shift their behavior successfully
- users can edit settings via chrome://extensions
## feature-specific deliverables
- each feature will be it's own application, and it will be integrated together and only needs the specific sites you want to block.
- preselected number of sites to block so users do not have to manually copy/paste sites (display so it can be selected and then on_select, it will then be added to the list of bad_sites


### linkedin
- news feed eradicator
- hide today's news
- specific timeline that the settings are active in order to prevent users from leaving the settings disabled
- make the site automatically grey (so the link you insert will then change the CSS of the page)
#### repo src/ex
- https://github.com/jordwest/news-feed-eradicator
- https://github.com/darrentu/Feed-Blocker-for-LinkedIn

### twitter
- hide trends
- hide all media
- manually add the users you follow that you want to view their retweets, otherwise block everyone's retweets in order to remove clutter from people you do not know and in order to have more control over your usage
- hide who to follow
- mute users you follow (all at once)
#### repo src/ex
- https://github.com/Samin100/twitter-muter
- https://github.com/thomaswang/minimal-twittertps://github.com/thomaswang/minimal-twitter

### facebook
- hide news feed
- https://github.com/jordwest/news-feed-eradicator/
- implement defacebook in order to nullify behavior over time
- https://github.com/barber5/defacebook
### instagram
- hide explore page
- make the site grey and boring
- delay site load
- hide recommended users to follow
