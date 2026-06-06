# google-maps-dll

A native implementation of the new bootstrap loader for the Maps JavaScript API based on Google's recommended dynamic loading pattern.

Follow the links below for more information:
- [Official loader documentation](https://developers.google.com/maps/documentation/javascript/load-maps-js-api)
- [The new bootstrap loader blog post](https://mapsplatform.google.com/resources/blog/more-control-loading-maps-javascript-api/)

If you have trouble using the official `@googlemaps/js-api-loader` package, this may just work for you.

## Installation

```shell
npm install @bract-tech/google-maps-dll
```

## Usage

### Import bootstrap loader

```js
import { loadGoogleMaps } from '@bract-tech/google-maps-dll';
```

### Initialize bootstrap loader parameters

```js
loadGoogleMaps({
  key: GOOGLE_MAPS_API_KEY
  // Optional parameters...
});
```

### Import Google Maps API libraries

```js
const [
  { ... },
] = await Promise.all([
  google.maps.importLibrary("..."),
]) as any; // Remove types for JavaScript
```

### TypeScript stuff ([docs](https://developers.google.com/maps/documentation/javascript/using-typescript))

#### Install the Google Maps JavaScript declaration files

```
npm i -D @types/google.maps
```

#### Declare the type in `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["google.maps"]
  }
}
```

### Complete boilerplate code

```html
<div id="map" style="width: 300px; height: 300px;"></div>
```

```js
import { loadGoogleMaps } from '@bract-tech/google-maps-dll';

const GOOGLE_MAPS_API_KEY = /* ... */;
if (!GOOGLE_MAPS_API_KEY) {
  console.error("Google Maps API key is missing.");
}

export async function initMap(): Promise<void> { // Remove types for JavaScript

  const mapElement = document.getElementById("map");
  const center = { lat: 37.4218066, lng: -122.085917 }

  try {
    loadGoogleMaps({
      key: GOOGLE_MAPS_API_KEY
      // Optional parameters...
    });

    const [
      { Map },
      { AdvancedMarkerElement },
      // { ... },
    ] = await Promise.all([
      google.maps.importLibrary("maps"),
      google.maps.importLibrary("marker"),
      // google.maps.importLibrary("..."),
    ]) as any; // Remove types for JavaScript

    google.maps.Map = new Map(mapElement, {
      center,
      zoom: 18,
      mapId: '...', // Required for AdvancedMarkerElement (https://developers.google.com/maps/documentation/javascript/map-ids/get-map-id)
      // Other params...
    });

    google.maps.marker.AdvancedMarkerElement = new AdvancedMarkerElement({
      map: google.maps.Map,
      position: center,
    });

    // Other maps component initialization...

  } catch (e) {
    console.error("Failed to load Google Maps", e);
  }
}

initMap();
```
