/**
 * This file contains code derived from @googlemaps/js-api-loader,
 * which is licensed under the Apache License, Version 2.0. See the
 * section block below for specific copyright and license details.
 * 
 * Copyright 2026 Bract Technologies
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface LoaderOptions {
    key: string;
    v?: string;
    language?: string;
    region?: string;
    libraries?: string[];
    authReferrerPolicy?: string;
    mapIds?: string[];
    channel?: string;
    solutionChannel?: string;
    [key: string]: any;
}

declare global {
    interface Window {
        google: any;
    }
}

/**
 * Initializes the Google Maps JavaScript API bootstrap loader.
 * This function is safe to call multiple times; it will only initialize once.
 *
 * The code inside this function is intentionally left as the obfuscated,
 * minified snippet provided directly by Google.
 *
 * Do not deobfuscate or refactor the IIFE below. Keeping the snippet as a
 * 1:1 copy makes it trivial to copy-paste future upstream updates from the
 * official Google Maps Platform documentation.
 *
 * Google Maps Dynamic Library Loader
 * Native implementation based on Google's recommended dynamic loading pattern.
 * https://developers.google.com/maps/documentation/javascript/load-maps-js-api
 *
 * More Control Loading the Maps JavaScript API with flexible library loading
 * and performance improvements.
 * https://mapsplatform.google.com/resources/blog/more-control-loading-maps-javascript-api/
 */
export const loadGoogleMaps = (options: LoaderOptions) => {
    if (typeof window === 'undefined') return;
    if (window.google?.maps?.importLibrary) return;

    ((g: any) => {
        var h: any, a: any, k: any, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b: any = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g) e.set(k.replace(/[A-Z]/g, (t: string) => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = (m.querySelector("script[nonce]") as any)?.nonce || "";
            m.head.append(a);
        }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f: any, ...n: any) => r.add(f) && u().then(() => d[l](f, ...n));
    })({
        v: "weekly",
        ...options
    });
};
