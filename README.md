# google-maps-dll

A lightweight wrapper for the new Maps JavaScript API bootstrap loader based on Google's [Dynamic Library Import](https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import) script. No dependencies. No instance management.

Follow the links below for more information:
- [Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/load-maps-js-api)
- [Blog post: More Control Loading the Maps JavaScript API](https://mapsplatform.google.com/resources/blog/more-control-loading-maps-javascript-api/)

## Installation

```shell
npm install @bract-tech/google-maps-dll
```

### Import bootstrap loader

```ts
import { loadGoogleMaps } from '@bract-tech/google-maps-dll';
```

### Initialize bootstrap loader parameters

```ts
loadGoogleMaps({ key: GOOGLE_MAPS_API_KEY });
```

### Import Google Maps API libraries

```js
const [
  { ... },
] = await Promise.all([
  google.maps.importLibrary("..."),
]);
```

### TypeScript stuff ([docs][tsdoc])

#### Install the types for the Google Maps JavaScript API

```
npm i -D @types/google.maps
```

#### Add the types to the `compilerOptions` in `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": ["google.maps"]
  }
}
```

#### Add the required types within the `initMap` function

```ts
async function initMap(): Promise<void> {

const [...] = await Promise.all([...]) as any;
```

## Usage

```html
<div id="map" style="width: 300px; height: 300px;"></div>
```

```html
<script type="module">
  import { loadGoogleMaps } from '@bract-tech/google-maps-dll';

  const GOOGLE_MAPS_API_KEY = '...';
  if (!GOOGLE_MAPS_API_KEY) {
    console.error("Google Maps API key is missing.");
  }

  async function initMap() {

    const mapElement = document.getElementById("map");
    const center = { lat: 37.4218066, lng: -122.085917 }

    try {
      loadGoogleMaps({
        key: GOOGLE_MAPS_API_KEY
        // ...
      });

      const [
        { Map, MapTypeId },
        { AdvancedMarkerElement },
        // { ... },
      ] = await Promise.all([
        google.maps.importLibrary("maps"),
        google.maps.importLibrary("marker"),
        // google.maps.importLibrary("..."),
      ]);

      google.maps.Map = new Map(mapElement, {
        center,
        zoom: 18,
        mapId: '...', // Required for AdvancedMarkerElement (https://developers.google.com/maps/documentation/javascript/map-ids/get-map-id)
        mapTypeId: MapTypeId.ROADMAP,
        // ...
      });

      google.maps.marker.AdvancedMarkerElement = new AdvancedMarkerElement({
        map: google.maps.Map,
        position: center,
        // ...
      });

      // ...

    } catch (e) {
      console.error("Failed to load Google Maps", e);
    }
  }

  initMap();
</script>
```

## `loadGoogleMaps(options: LoaderOptions): void`

- `key: string`: Your API key. This is the only required option.
- `v: string`: The API version to use.
- `language: string`: Language to use for controls, notices, and responses.
- `region: string`: Region code to alter API behavior.
- `libraries: string[]`: Additional API libraries to load.
- `authReferrerPolicy: string`: Limits which URLs can use the API key.
- `mapIds: string[]`: Preloads configuration for specific map IDs.
- `channel: string`: Tracks usage per channel.
- `solutionChannel: string`: Tracks usage per solution channel.

[tsdoc]: https://developers.google.com/maps/documentation/javascript/using-typescript
