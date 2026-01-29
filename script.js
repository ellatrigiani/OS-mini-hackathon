// Open index.html in any modern browser.

// ========================================
// LONDON ACTIVITY GENERATOR
// ==========================
// Build: Single-page, offline-capable app
// Tech: Vanilla JS, no dependencies
// Features:
// - 90 suggestions (30 per mode)
// - "London twist" modifier (30% chance)
// - Confetti animation (pure JS+CSS)
// - Keyboard support (Enter/Space/1/2/3)
// - Reduced motion support
// ========================================

// Use IIFE to avoid polluting global scope
(function() {
  'use strict';

  // ========================================
  // CONSTANTS & CONFIG
  // ========================================
  const CITY = 'london';
  const TWIST_CHANCE = 0.3;
  const MAX_HISTORY = 3;
  const THINKING_DURATION_MS = 1000;

  const TWISTS = [
    'End with a flat white.',
    'Do it rain or shine.',
    'Avoid Oxford Circus at all costs.',
    'Take the scenic route.',
    'Bring a brolly just in case.',
    'Snap a photo for the story.',
    'Stop for pasties if it gets chilly.',
    'Mind the gap.',
    'Enjoy the city\'s quiet corners.',
    'London\'s best kept secret.'
  ];

  const THINKING_MESSAGES = [
    'Checking the Tube...',
    'Consulting the weather...',
    'Asking a Londoner...',
    'Scanning the skyline...',
    'Checking pub opening hours...',
    'Looking for the best spots...',
    'Consulting the spirit of London...',
    'Planning your perfect moment...'
  ];

  // ========================================
  // SUGGESTIONS DATABASE
  // ========================================
  const SUGGESTIONS = {
    chill: [
      {
        title: 'Regent\'s Park Stroll',
        description: 'Wander through Queen Mary\'s Gardens and spot the rose varieties in bloom.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Regent\'s+Park+London'
      },
      {
        title: 'Bermondsey Antiques Browse',
        description: 'Explore the antique market at Bermondsey Square early on Friday morning.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Bermondsey+Square+Antiques+Market+London'
      },
      {
        title: 'Dawn at Primrose Hill',
        description: 'Watch the sun rise over the London skyline from this peaceful hilltop.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Primrose+Hill+London'
      },
      {
        title: 'Southwark Cathedral Garden Sit',
        description: 'Rest in the quiet garden surrounded by history and herbs.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Southwark+Cathedral+London'
      },
      {
        title: 'Lincoln\'s Inn Fields',
        description: 'Read a book on London\'s largest public square, surrounded by legal history.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Lincoln\'s+Inn+Fields+London'
      },
      {
        title: 'Hampstead Heath Ponds',
        description: 'Visit one of the serene swimming ponds or just walk the woodland paths.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Hampstead+Heath+London'
      },
      {
        title: 'Postman\'s Park',
        description: 'Reflect at the Watts Memorial to Heroic Self-Sacrifice in this peaceful garden.',
        time: '20 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Postman\'s+Park+London'
      },
      {
        title: 'Barbican Conservatory',
        description: 'Wander through this tropical oasis hidden in brutalist architecture.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Barbican+Conservatory+London'
      },
      {
        title: 'St Dunstan in the East',
        description: 'Visit this bombed-out church turned into a beautiful public garden.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=St+Dunstan+in+the+East+London'
      },
      {
        title: 'Canal Walk from Little Venice',
        description: 'Follow the Regent\'s Canal path to Camden at a leisurely pace.',
        time: '90 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Little+Venice+London'
      },
      {
        title: 'Kew Gardens Tea Room',
        description: 'Enjoy a peaceful afternoon tea surrounded by rare plants and Victorian glasshouses.',
        time: '120 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Kew+Gardens+London'
      },
      {
        title: 'St Katharine Docks',
        description: 'Walk around the marina and enjoy the boat-filled basin away from the crowds.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=St+Katharine+Docks+London'
      },
      {
        title: 'Alexandra Palace',
        description: 'Take in panoramic views of London from this Victorian entertainment palace.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Alexandra+Palace+London'
      },
      {
        title: 'Pitzhanger Manor',
        description: 'Explore this restored Georgian villa with its tranquil gardens.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Pitzhanger+Manor+Ealing'
      },
      {
        title: 'Kyoto Garden in Holland Park',
        description: 'Find peace in this authentic Japanese garden with waterfall and koi pond.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Holland+Park+Kyoto+Garden+London'
      },
      {
        title: 'Victoria Park Canal Basin',
        description: 'Sit by the canal and watch the boats pass by in East London\'s oldest park.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Victoria+Park+London'
      },
      {
        title: 'Brompton Cemetery',
        description: 'Walk through beautifully landscaped Victorian cemetery with impressive monuments.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Brompton+Cemetery+London'
      },
      {
        title: 'Leighton House Conservatory',
        description: 'Visit the Arab Hall and gardens in this artist\'s home and studio.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Leighton+House+London'
      },
      {
        title: 'Chelsea Physic Garden',
        description: 'Explore London\'s oldest botanical garden with medicinal and rare plants.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Chelsea+Physic+Garden+London'
      },
      {
        title: 'Garden Museum Courtyard',
        description: 'Sit in this former church\'s peaceful courtyard next to Lambeth Palace.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Garden+Museum+London'
      },
      {
        title: 'River Walk from Greenwich',
        description: 'Follow the Thames path eastward past historic ships and modern architecture.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Greenwich+London'
      },
      {
        title: 'Borough Market Quiet Corner',
        description: 'Visit early to beat the crowds and enjoy a peaceful food market experience.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Borough+Market+London'
      },
      {
        title: 'Neasden Temple',
        description: 'Visit this magnificent Hindu temple with its intricate marble carvings and peaceful atmosphere.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Neasden+Temple+London'
      },
      {
        title: 'Finsbury Park Rose Garden',
        description: 'Spend time in this beautifully maintained garden with over 100 rose varieties.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Finsbury+Park+London'
      },
      {
        title: 'Clapham Common Windmill',
        description: 'Visit the restored windmill and enjoy the common\'s open spaces.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Clapham+Common+Windmill+London'
      },
      {
        title: 'St James\'s Park Lake',
        description: 'Watch pelicans and swans while feeding on the park\'s island.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=St+James\'s+Park+London'
      },
      {
        title: 'Holland Park Kyoto Walk',
        description: 'Wander through the Japanese garden and peaceful woodland paths.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Holland+Park+Kyoto+Walk+London'
      },
      {
        title: 'Crystal Palace Park Dinosaurs',
        description: 'Visit the historic Victorian dinosaur sculptures in the park.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Crystal+Palace+Park+Dinosaurs+London'
      },
      {
        title: 'Morden Hall Park',
        description: 'Explore this former estate with meadows, wetlands, and heritage rose garden.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Morden+Hall+Park+London'
      },
      {
        title: 'Canary Wharf Winter Garden',
        description: 'Sit in the indoor tropical garden surrounded by skyscrapers.',
        time: '30 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Canary+Wharf+Winter+Garden+London'
      }
    ],
    adventurous: [
      {
        title: 'Hampstead Heath to Highgate',
        description: 'Hike through ancient woodlands and famous landmarks with stunning views.',
        time: '90 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Hampstead+Heath+London'
      },
      {
        title: 'Thames Path Adventure',
        description: 'Walk from Tower Bridge to Greenwich along the south bank.',
        time: '120 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Thames+Path+London'
      },
      {
        title: 'Hyde Park Cycling',
        description: 'Rent a bike and explore the vast park including Kensington Gardens.',
        time: '60 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Hyde+Park+London'
      },
      {
        title: 'Regent\'s Canal Boat Walk',
        description: 'Follow the canal from Little Venice through to the Olympic Park.',
        time: '120 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Regent\'s+Canal+London'
      },
      {
        title: 'Borough Market Scavenger',
        description: 'Try three different street foods and identify three London cheese varieties.',
        time: '45 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Borough+Market+London'
      },
      {
        title: 'Highgate Cemetery Explore',
        description: 'Walk through Victorian graves and learn about London\'s history.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Highgate+Cemetery+London'
      },
      {
        title: 'Shoreditch Street Art Hunt',
        description: 'Discover famous murals while exploring East London\'s graffiti scene.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Shoreditch+London'
      },
      {
        title: 'Columbia Road Flower Market',
        description: 'Navigate the crowded Sunday morning flower market at peak hours.',
        time: '45 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Columbia+Road+Flower+Market+London'
      },
      {
        title: 'Primrose Hill Sunset Climb',
        description: 'Race to the top for golden hour views over the entire city.',
        time: '30 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Primrose+Hill+London'
      },
      {
        title: 'Spitalfields Market Explore',
        description: 'Browse vintage, crafts, and food in this historic covered market.',
        time: '45 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Spitalfields+Market+London'
      },
      {
        title: 'Maltby Street Market',
        description: 'Discover this under-the-rails food market in Bermondsey.',
        time: '30 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Maltby+Street+Market+London'
      },
      {
        title: 'Greenwich Park Viewpoint',
        description: 'Climb the hill for panoramic views of London and the Thames.',
        time: '45 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Greenwich+Park+London'
      },
      {
        title: 'Canary Wharf to Stratford',
        description: 'Walk through Docklands transformation and Olympic Park legacy.',
        time: '90 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Canary+Wharf+London'
      },
      {
        title: 'Brompton Cemetery Night Walk',
        description: 'Experience the atmospheric Victorian cemetery after dusk.',
        time: '30 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Brompton+Cemetery+London'
      },
      {
        title: 'Richmond Park Deer Watching',
        description: 'Spot red and fallow deer in London\'s largest royal park.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Richmond+Park+London'
      },
      {
        title: 'Kew Gardens Treetop Walkway',
        description: 'Experience views from 18 meters above the ground canopy walk.',
        time: '45 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Kew+Gardens+London'
      },
      {
        title: 'Leake Street Tunnel',
        description: 'Walk through Banksy\'s legal graffiti tunnel beneath Waterloo Station.',
        time: '15 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Leake+Street+Tunnel+London'
      },
      {
        title: 'Neasden Temple Exploration',
        description: 'Discover London\'s traditional Hindu temple with guided tour.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Neasden+Temple+London'
      },
      {
        title: 'Barbican Architecture Walk',
        description: 'Explore this brutalist masterpiece and its elevated walkways.',
        time: '45 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Barbican+London'
      },
      {
        title: 'Westminster Parliament Visit',
        description: 'Tour the Houses of Parliament and learn UK legislative history.',
        time: '90 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Palace+of+Westminster+London'
      },
      {
        title: 'Tower of London',
        description: 'Explore the fortress, tower, and see the Crown Jewels.',
        time: '120 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Tower+of+London'
      },
      {
        title: 'Sky Garden Viewpoint',
        description: 'Visit the free public garden with panoramic city views from the 35th floor.',
        time: '45 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Sky+Garden+London'
      },
      {
        title: 'HMS Belfast Ship',
        description: 'Explore this WWII naval museum ship moored on the Thames.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=HMS+Belfast+London'
      },
      {
        title: 'Tate Modern Turbine Hall',
        description: 'Visit the world\'s most visited modern art museum.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Tate+Modern+London'
      },
      {
        title: 'Natural History Museum',
        description: 'Discover the building\'s cathedral-like architecture and dinosaur exhibits.',
        time: '120 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Natural+History+Museum+London'
      },
      {
        title: 'British Museum Rosetta Stone',
        description: 'Visit the famous Egyptian gallery and see the Rosetta Stone.',
        time: '90 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=British+Museum+London'
      },
      {
        title: 'Greenwich Observatory',
        description: 'Stand on the Prime Meridian and enjoy the maritime museum.',
        time: '90 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Royal+Observatory+Greenwich'
      },
      {
        title: 'Victoria and Albert Museum',
        description: 'Explore the world\'s largest museum of decorative arts.',
        time: '120 min',
        energy: 'High',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Victoria+and+Albert+Museum+London'
      },
      {
        title: 'Science Museum Wonderlab',
        description: 'Interactive displays and historic scientific artifacts.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Science+Museum+London'
      },
      {
        title: 'Imperial War Museum',
        description: 'Learn about British military history through powerful exhibitions.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Imperial+War+Museum+London'
      },
      {
        title: 'Design Museum Kensington',
        description: 'Explore contemporary design and architecture exhibitions.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Design+Museum+London'
      }
    ],
    culture: [
      {
        title: 'British Museum',
        description: 'Experience world treasures from ancient Egypt, Greece, and beyond.',
        time: '120 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=British+Museum+London'
      },
      {
        title: 'Shakespeare\'s Globe Theatre',
        description: 'Visit this reconstructed Elizabethan playhouse by the Thames.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Shakespeare\'s+Globe+London'
      },
      {
        title: 'Tate Modern',
        description: 'Explore contemporary art in the converted Bankside Power Station.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Tate+Modern+London'
      },
      {
        title: 'National Gallery',
        description: 'View masterpieces from Van Gogh to Da Vinci in Trafalgar Square.',
        time: '120 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=National+Gallery+London'
      },
      {
        title: 'Westminster Abbey',
        description: 'Visit the coronation site of British monarchs and royal tombs.',
        time: '60 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Westminster+Abbey+London'
      },
      {
        title: 'Tower of London',
        description: 'Discover medieval history, the Crown Jewels, and the White Tower.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Tower+of+London'
      },
      {
        title: 'British Library',
        description: 'See the Magna Carta, Shakespeare\'s First Folio, and literary treasures.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=British+Library+London'
      },
      {
        title: 'Victoria & Albert Museum',
        description: 'Explore decorative arts, fashion, and design through the centuries.',
        time: '120 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Victoria+and+Albert+Museum+London'
      },
      {
        title: 'Natural History Museum',
        description: 'Visit the cathedral-like architecture and dinosaur skeletons.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Natural+History+Museum+London'
      },
      {
        title: 'Imperial War Museum',
        description: 'Experience WWI and WWII history through powerful exhibits.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Imperial+War+Museum+London'
      },
      {
        title: 'National Portrait Gallery',
        description: 'See historical portraits of Britain\'s most famous figures.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=National+Portrait+Gallery+London'
      },
      {
        title: 'Courtauld Gallery',
        description: 'View Impressionist masterpieces in Somerset House.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Courtauld+Gallery+London'
      },
      {
        title: 'Sir John Soane\'s Museum',
        description: 'Explore this eccentric architect\'s house and collections.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Sir+John+Soane\'s+Museum+London'
      },
      {
        title: 'Wallace Collection',
        description: 'Enjoy 18th-century French art and armor in Hertford House.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Wallace+Collection+London'
      },
      {
        title: 'Dulwich Picture Gallery',
        description: 'Visit England\'s oldest public art gallery with masterworks.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Dulwich+Picture+Gallery+London'
      },
      {
        title: 'Horniman Museum',
        description: 'Discover natural history and musical instruments in Forest Hill.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Horniman+Museum+London'
      },
      {
        title: 'Museum of London',
        description: 'Trace London\'s history from Roman times to present day.',
        time: '90 min',
        energy: 'Medium',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Museum+of+London'
      },
      {
        title: 'Foundling Museum',
        description: 'Learn about London\'s first children\'s charity and Georgian art.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Foundling+Museum+London'
      },
      {
        title: 'Jewish Museum',
        description: 'Explore Jewish heritage and Holocaust memorial in Camden.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Jewish+Museum+London'
      },
      {
        title: 'Garden Museum',
        description: 'Discover British gardening history in Lambeth.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Garden+Museum+London'
      },
      {
        title: 'Fashion and Textile Museum',
        description: 'Explore fashion design and textile exhibitions.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Fashion+and+Textile+Museum+London'
      },
      {
        title: 'Cartoon Museum',
        description: 'Enjoy British cartoons, comics, and graphic novel art.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Cartoon+Museum+London'
      },
      {
        title: 'Freud Museum',
        description: 'Visit Sigmund Freud\'s former home in Hampstead.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Freud+Museum+London'
      },
      {
        title: 'Handel & Hendrix House',
        description: 'Explore the homes of two musical legends on Brook Street.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Handel+and+Hendrix+House+London'
      },
      {
        title: 'Charles Dickens Museum',
        description: 'Visit this author\'s beautifully preserved Bloomsbury home.',
        time: '60 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Charles+Dickens+Museum+London'
      },
      {
        title: 'Benjamin Franklin House',
        description: 'Learn about this founding father\'s London residence.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Benjamin+Franklin+House+London'
      },
      {
        title: 'Sherlock Holmes Museum',
        description: 'Visit the recreated Victorian detective\'s home on Baker Street.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Sherlock+Holmes+Museum+London'
      },
      {
        title: 'Keats House',
        description: 'Explore the romantic poet\'s home in Hampstead Heath.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Keats+House+London'
      },
      {
        title: '2 Willow Road',
        description: 'Visit Ernö Goldfinger\'s modernist home in Hampstead.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=2+Willow+Road+London'
      },
      {
        title: 'Ragged School Museum',
        description: 'Discover Victorian East London education history.',
        time: '45 min',
        energy: 'Low',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Ragged+School+Museum+London'
      }
    ]
};

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  let currentMode = 'chill';
  let lastSuggestions = [];
  let isThinking = false;

  // ========================================
  // DOM ELEMENTS
  // ========================================
  const generateBtn = document.getElementById('generateBtn');
  const outputCard = document.getElementById('outputCard');
  const cardContent = document.querySelector('.card-content');
  const confettiContainer = document.getElementById('confetti');
  const modePills = document.querySelectorAll('.mode-pill');

  // ========================================
  // HELPER FUNCTIONS
  // ========================================
  
  // Get random item from array
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Get suggestion that hasn't been shown recently
  function getSuggestion(mode) {
    const suggestions = SUGGESTIONS[mode];
    const available = suggestions.filter(s => !lastSuggestions.includes(s));
    
    if (available.length === 0) {
      lastSuggestions = [];
      return getRandomItem(suggestions);
    }
    
    return getRandomItem(available);
  }

  // Generate confetti particles
  function createConfetti() {
    const colors = ['#e94560', '#6b9080', '#a8dadc', '#e07a5f', '#ffd166'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '-10px';
      particle.style.background = getRandomItem(colors);
      particle.style.width = Math.random() * 10 + 5 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      
      confettiContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 3000);
    }
  }

  // Get random London twist
  function getLondonTwist() {
    return Math.random() < TWIST_CHANCE ? getRandomItem(TWISTS) : null;
  }

  // Display thinking state
  function showThinking() {
    isThinking = true;
    const message = getRandomItem(THINKING_MESSAGES);
    
    cardContent.innerHTML = `
      <div class="thinking-state">
        <span class="thinking-text">${message}</span>
        <div class="thinking-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    outputCard.classList.add('visible');
  }

  // Display suggestion
  function showSuggestion(suggestion) {
    isThinking = false;
    
    const twist = getLondonTwist();
    const twistHtml = twist ? `<div class="twist">✨ ${twist}</div>` : '';
    const mapLinkHtml = suggestion.mapLink ? `
      <a href="${suggestion.mapLink}" target="_blank" rel="noopener noreferrer" class="map-link">
        <span class="map-icon">📍</span> View on Google Maps
      </a>
    ` : '';
    
    cardContent.innerHTML = `
      <h3>${suggestion.title}</h3>
      <p class="description">${suggestion.description}</p>
      <div class="meta">
        <div class="meta-item">
          <span class="icon">⏱️</span>
          <span>${suggestion.time}</span>
        </div>
        <div class="meta-item">
          <span class="icon">⚡</span>
          <span>${suggestion.energy}</span>
        </div>
      </div>
      ${mapLinkHtml}
      ${twistHtml}
    `;
    
    outputCard.classList.add('visible');
    createConfetti();
  }

  // Main generate function
  function generateSuggestion() {
    if (isThinking) return;
    
    const suggestion = getSuggestion(currentMode);
    lastSuggestions.push(suggestion);
    
    if (lastSuggestions.length > MAX_HISTORY) {
      lastSuggestions.shift();
    }
    
    showThinking();
    
    setTimeout(() => {
      showSuggestion(suggestion);
    }, THINKING_DURATION_MS);
  }

  // Switch mode
  function switchMode(mode) {
    currentMode = mode;
    
    modePills.forEach(pill => {
      pill.classList.remove('active');
      if (pill.dataset.mode === mode) {
        pill.classList.add('active');
      }
    });
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================
  
  // Generate button click
  generateBtn.addEventListener('click', generateSuggestion);

  // Mode pills click
  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      switchMode(pill.dataset.mode);
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      generateSuggestion();
    } else if (e.key === '1') {
      switchMode('chill');
    } else if (e.key === '2') {
      switchMode('adventurous');
    } else if (e.key === '3') {
      switchMode('culture');
    }
  });

  // ========================================
  // INITIALIZATION
  // ========================================
  console.log('London Activity Generator loaded! Press Enter/Space to generate, or 1/2/3 for modes.');
})();