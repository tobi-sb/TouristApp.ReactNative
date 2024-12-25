// You can store images in your assets folder and import them
import alleyPalaceImage from "../images/d.png";
import musée1 from "../images/musée.jpg";
import musée2 from "../images/musée2.jpg";
import artisant from "../images/artisant.jpg";
import artisant2 from "../images/artisant2.jpg";
import béziers from "../images/béziers.jpg";
import parachute from "../images/parachute.jpg";
import plongé from "../images/plongé.jpg";
import shoot from "../images/shoot.jpg";
import view from "../images/view.jpg";
import jetski from "../images/jetski.jpg";
import subsurf from "../images/subsurf.jpg";
// Import other restaurant images similarly

export const recommandeds = [
  {
    id: "1", // Always include a unique identifier
    name: "Alley Palace",
    rating: 4.1,
    image: subsurf,
    distance: "1.2 km",
  },
  {
    id: "2",
    name: "Golden Dragon",
    rating: 4.3,
    image: plongé,
    distance: "2.0 km",
  },
  {
    id: "3", // Always include a unique identifier
    name: "Sub Surf",
    rating: 4.1,
    image: view,
    cuisine: "Italian",
    deliveryTime: "20-30 min",
    distance: "1.2 km",
  },
  {
    id: "4",
    name: "Golden Dragon",
    rating: 4.3,
    image: musée2,
    distance: "2.0 km",
  },
  {
    id: "5", // Always include a unique identifier
    name: "Plonger Soumarine",
    rating: 4.1,
    image: musée1,
    distance: "1.2 km",
  },
  {
    id: "6",
    name: "Golden Dragon",
    rating: 4.3,
    image: view,
    distance: "2.0 km",
  },
];
