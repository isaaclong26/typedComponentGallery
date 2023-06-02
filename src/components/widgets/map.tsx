import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import styled from "styled-components";
import chroma from "chroma-js";
import { Col, Row } from "react-bootstrap";
import { HSLAColor, Theme, useEloise } from "../..";

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

function assignThemeColors(theme: Theme): MapFeatures {
  const themeColors = {
    primary: chroma(theme.primary),
    secondary: chroma(theme.secondary),
    accent: chroma(theme.accent),
  };

  const perceivedColors: { [key: string]: string } = {
    primary: getPerceivedColor(theme.primary),
    secondary: getPerceivedColor(theme.secondary),
    accent: getPerceivedColor(theme.accent),
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
        mapColors.roadsArterial = themeColors[colorKey].darken(1.5).saturate();
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
  | { path: string; manual?: never; clickable?: boolean; Expand?: React.FC<{location:any}> }
  | { manual: Array<{ [key: string]: any }>; path?: never; clickable?: boolean; Expand?: React.FC<{location:any}> };

export const Map:React.FC<MapProps> = ({path, manual, clickable = false, Expand}) => {
  const { logic, theme } = useEloise();
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    (async () => {

        if(path){
      const listings = await logic.fb.getUserCollection(path);
      setLocations(listings.map((listing: any) => listing.data));
        }
        else if(manual){
            setLocations(manual)
        }
    })();
  }, [logic]);

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


  useEffect(()=>{

    console.log(locations)
  },[locations])

  return (
    <div>
      <Row>
        <Col lg={8} className="mx-auto">
          <MapWrapper>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={{
                  lat: 40.712776,
                  lng: -74.005974, // Initial map center coordinates, replace with yours
                }}
                zoom={10}
                options={{
                  styles: mapStyles,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                {locations.map((location, index) => (
                    location.addy?
                    <Marker 
                    icon={"./home.svg"}
                    key={index} 
                    position={{ 
                        lat: location.addy.lat, 
                        lng: location.addy.lng
                    }} 
                    onClick={clickable ? () => { setSelectedLocation(location); } : undefined}
                >
                    {clickable && selectedLocation === location && Expand && (
                      <InfoWindow
                        position={{
                          lat: location.addy.lat, 
                          lng: location.addy.lng
                        }}
                        onCloseClick={() => {
                          setSelectedLocation(null);
                        }}
                      >
                        {<Expand location={location} />}
                      </InfoWindow>
                    )}
                </Marker>
          
                :

                    <></>
                        
                    ))}

              </GoogleMap>
          </MapWrapper>
        </Col>
      </Row>
    </div>
  );
};
