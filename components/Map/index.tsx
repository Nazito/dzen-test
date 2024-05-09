import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

import { useUserState } from '@/store/user/hooks';

import classes from './style.module.scss';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const { user } = useUserState();

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapboxgl.accessToken =
      'pk.eyJ1Ijoidml0YWxpeWx1a2luOTEiLCJhIjoiY2xrdHJ6MTluMGdtZDNkcG5nd2kxODV0eiJ9.2dBaChUWEsag1iGXAClrNw';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 0,
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const goToMarker = (center: [number, number], isInitialZoom?: boolean) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center,
        zoom: isInitialZoom ? 0 : 17,
      });
    }
  };

  useEffect(() => {
    const map = mapRef.current;

    if (user?.coords && map) {
      goToMarker(user?.coords, false);
    } else {
      goToMarker([0, 0], true);
    }
  }, [user?.coords]);

  return (
    <div className={classes.map}>
      <div className={classes.map__cover} ref={mapContainerRef} />
    </div>
  );
};

export default Map;
