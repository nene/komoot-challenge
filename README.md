# Komoot Challenge

## Assignment

Develop a react app that enables you to plan your cross country run and download it as GPX file.

Cross Country runners are not bound to the streets.
Your users can plan their favorite route across fields and
hills by just placing markers as waypoints on the map.
For detailed planning the same waypoints show up as a list where
users can delete and rearrange them until the route is perfect and ready to download.
The user interface should be based on the design to the left.

An excellent ReactJS Developer should manage to do this challenge in a few hours.
Impress us with your coding skills by not using 3rd party react components and plugins.
At least the map and the list should be separated react components.

Send us the sources as zip file, a link to the hosted solution and
what you have learned while developing.

## Design decisions

- Using plain CSS as the recommendation was to avoid 3rd party components.
  Normally I would opt to using styled-components library.
  To keep styles under control, using a BEM-like naming scheme for classes `Component__subComponent--state`.
- All values in CSS are hard-coded.
  For such a small project it shouldn't matter much,
  though normally I would at least declare all colors as named constants.
- Hard-coded my personal Mapbox access token.
  Not the securest approach. But I have controls to turn that token off if needed.
- Hard-coded ID in Map component.
  That will limit creating multiple instances of this component,
  which won't really matter in this simple app.
- Use icon font generated by https://www.icofont.com/
- Using Leaflet library for the map.
- Using the Leaflet.LatLng type throughout the code (even in non-map-related components).
  It might be better to avoid such tight coupling with the Leaflet library.
- Implemented some immutable array helpers.
  Normally I would go for a library like ramda or lodash,
  but I guess for this assignment it's better to implement them on my own.
- Using the basic xml library for quick XML generation.
- Validated the generated GPX XML file with https://www.truugo.com/xml_validator/
