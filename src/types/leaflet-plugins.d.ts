// src/leaflet-plugins.d.ts

import * as L from 'leaflet';
import 'leaflet-routing-machine';

declare module 'leaflet' {
  namespace Routing {
    // এই কোডটি TypeScript-কে বলছে যে L.Routing-এর ওপর graphhopper নামে একটি ফাংশন আছে
    function graphhopper(apiKey?: string, options?: object): L.Routing.IRouter;
  }
}