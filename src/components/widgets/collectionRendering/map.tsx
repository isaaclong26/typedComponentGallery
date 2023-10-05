import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

import chroma from "chroma-js";
import styled from "styled-components";
import { HSLAColor, Theme, useEloise } from "../../..";

const MapWrapper = styled.div`
  width: 100%;
  height: 400px; // Adjust the height as needed
`;

function getPerceivedColor(hsla: HSLAColor): string {
  let color = chroma(hsla);
  let hue = color.get("hsl.h");
  let lightness = color.get("hsl.l");

  let dominantColor = "";
  if (hue <= 30 || hue > 330) {
    dominantColor = "red";
  } else if (hue > 30 && hue <= 90) {
    dominantColor = "yellow";
  } else if (hue > 90 && hue <= 150) {
    dominantColor = "green";
  } else if (hue > 150 && hue <= 210) {
    dominantColor = "cyan";
  } else if (hue > 210 && hue <= 270) {
    dominantColor = "blue";
  } else if (hue > 270 && hue <= 330) {
    dominantColor = "magenta";
  }

  let perceivedBrightness = lightness < 0.5 ? "dark" : "light";

  return `${perceivedBrightness} ${dominantColor}`;
}

interface MapFeatures {
  water: any;
  roadsHighway: any;
  roadsArterial: any;
  roadsLocal: any;
  parks: any;
  transit: any;
  poi: any;
  administrative: any;
  landscape: any;
}

export type MapProps =
  | {
      path: string;
      manual?: never;
      clickable?: boolean;
      Expand?: React.FC<{ location: any }>;
    }
  | {
      manual: Array<{ [key: string]: any }>;
      path?: never;
      clickable?: boolean;
      Expand?: React.FC<{ location: any }>;
    };

export const Map: React.FC<MapProps> = ({
  path,
  manual,
  clickable = false,
  Expand,
}) => {
  const { logic, theme } = useEloise();
  const [locations, setLocations] = useState<any[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 40.712776,
    lng: -74.005974,
  });
  const [zoom, setZoom] = useState<number>(10);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      if (path) {
        const listings = await logic.fb.docs.getUserCollection(path);
        setLocations(listings.map((listing: any) => listing.data));
      } else if (manual) {
        setLocations(manual);
      }
    })();
  }, [logic]);

  const onMapLoad = React.useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => {
        if (location.addy) {
          bounds.extend({ lat: location.addy.lat, lng: location.addy.lng });
        }
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [locations]);
  function assignThemeColors(theme: Theme): MapFeatures {
    const themeColors = {
      primary: chroma(theme.colors[0]),
      secondary: chroma(theme.colors[1]),
      accent: chroma(theme.colors[2]),
    };

    const perceivedColors: { [key: string]: string } = {
      primary: getPerceivedColor(logic.color.convertToHSLA(theme.colors[0])),
      secondary: getPerceivedColor(logic.color.convertToHSLA(theme.colors[1])),
      accent: getPerceivedColor(logic.color.convertToHSLA(theme.colors[2])),
    };

    let mapColors: MapFeatures = {
      water: null,
      roadsHighway: null,
      roadsArterial: null,
      roadsLocal: null,
      parks: null,
      transit: null,
      poi: null,
      administrative: null,
      landscape: null,
    };

    // Assign theme colors to appropriate features
    for (let color in perceivedColors) {
      const colorKey = color as keyof typeof themeColors;
      switch (perceivedColors[color]) {
        case "light blue":
        case "dark blue":
          mapColors.water = themeColors[colorKey];
          break;
        case "light green":
        case "dark green":
          mapColors.parks = themeColors[colorKey];
          mapColors.landscape = themeColors[colorKey];
          break;
        case "light red":
        case "dark red":
        case "light yellow":
        case "dark yellow":
          mapColors.roadsHighway = themeColors[colorKey].darken().saturate();
          mapColors.roadsArterial = themeColors[colorKey]
            .darken(1.5)
            .saturate();
          mapColors.roadsLocal = themeColors[colorKey].darken(2).saturate();
          break;
        // Add more cases as needed
        // default:
        // default color assignment
      }
    }

    // Generate new colors for remaining features
    for (let feature in mapColors) {
      const colorKey = feature as keyof MapFeatures;
      if (!mapColors[colorKey]) {
        mapColors[colorKey] = chroma.mix(
          themeColors.primary,
          themeColors.secondary,
          0.5,
          "lab"
        );
      }
    }

    return mapColors;
  }

  const adjustedColors = assignThemeColors(theme);

  const mapStyles = [
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: adjustedColors.landscape.hex() }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: adjustedColors.roadsHighway.hex() }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: adjustedColors.roadsArterial.hex() }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: adjustedColors.roadsLocal.hex() }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: adjustedColors.parks.hex() }],
    },
    // ... add more features as required
  ];
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  return (
    <div className="p-3">
      <MapWrapper>
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={center} // Use the center state variable here
          zoom={zoom}
          options={{
            styles: mapStyles,
            mapTypeControl: false,
            streetViewControl: false,
          }}>
          {locations.map((location, index) =>
            location.addy ? (
              <Marker
                key={index}
                position={{
                  lat: location.addy.lat,
                  lng: location.addy.lng,
                }}
                onClick={
                  clickable
                    ? () => {
                        setSelectedLocation(location);
                      }
                    : undefined
                }>
                {clickable && selectedLocation === location && Expand && (
                  <InfoWindow
                    position={{
                      lat: location.addy.lat,
                      lng: location.addy.lng,
                    }}
                    onCloseClick={() => {
                      setSelectedLocation(null);
                    }}>
                    {<Expand location={location} />}
                  </InfoWindow>
                )}
              </Marker>
            ) : (
              <></>
            )
          )}
        </GoogleMap>
      </MapWrapper>
    </div>
  );
};
