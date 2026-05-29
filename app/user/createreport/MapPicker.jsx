"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function LocationMarker({
  setLocation,
  setSelectedPosition,
}) {

  useMapEvents({
    click(e) {

      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setSelectedPosition([lat, lng]);

      setLocation(
        `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      );
    },
  });

  return null;
}

export default function MapPicker({
  selectedPosition,
  setSelectedPosition,
  setLocation,
}) {

  return (
    <MapContainer
      center={selectedPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-[300px] rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={selectedPosition} />

      <LocationMarker
        setLocation={setLocation}
        setSelectedPosition={setSelectedPosition}
      />
    </MapContainer>
  );
}