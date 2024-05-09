import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

import { useUserAction, useUserState } from '@/store/user/hooks';
// import { LocationGeo } from 'src/pages/DashboardPages/MapPages/types';

// interface GeocoderInputProps {
//   // className?: string;
//   // label?: string;
//   // name: string;
//   // errorMessage?: FieldError;
//   onSelect?: (val: { result: LocationGeo }) => void;
// }

export interface GeocoderContext {
  id: string;
  mapbox_id: string;
  text?: string;
}

export interface LocationValue {
  place_type: string[];
  context?: GeocoderContext[];
  city?: string;
  index?: string;
}

function InputGeocoder() {
  const geocoderContainerRef = useRef<HTMLDivElement | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);
  const { onSetUser } = useUserAction();
  const { user } = useUserState();

  const initializeGeocoder = () => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoidml0YWxpeWx1a2luOTEiLCJhIjoiY2xrdHJ6MTluMGdtZDNkcG5nd2kxODV0eiJ9.2dBaChUWEsag1iGXAClrNw';
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      types: 'poi, address',
    });

    geocoderRef.current = geocoder;

    geocoder.on('result', (event) => {
      onSetUser({ ...user, coords: event.result.geometry.coordinates });
      console.log(event.result.geometry.coordinates);
    });

    if (geocoderContainerRef.current) {
      geocoder.addTo(geocoderContainerRef.current);
    }
  };

  useEffect(() => {
    if (geocoderRef.current) {
      geocoderRef.current.onRemove();
    }

    initializeGeocoder();
  }, []);

  return (
    <div ref={wrapper}>
      <div ref={geocoderContainerRef} />
    </div>
  );
}

export default InputGeocoder;
