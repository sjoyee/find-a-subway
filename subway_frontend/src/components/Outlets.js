import React, { useState, useEffect } from "react";
import { listSubwayOutlets } from "../services/services";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];

const Outlets = () => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const handleMarkerClick = (outlet) => {
    setSelectedOutlet(outlet);
  };

  const handleCloseInfoWindow = () => {
    setSelectedOutlet(null);
  };

  // get subway outlet list from API (services.js)
  useEffect(() => {
    listSubwayOutlets(setOutlets);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <h1>Subway Outlets in Kuala Lumpur, Malaysia</h1>
      <div>
        {/* Center position get the googled KL latitude and longitude */}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          zoom={13}
          center={{ lat: 3.1319, lng: 101.6841 }}
        >
          {/* Render markers and circles */}
          {outlets.map((outlet) => (
            <React.Fragment key={outlet.id}>
              <Marker
                position={{ lat: outlet.latitude, lng: outlet.longitude }}
                title={outlet.name}
                onClick={() => handleMarkerClick(outlet)}
              />
            </React.Fragment>
          ))}
          {/* Render InfoWindow for selected outlet */}
          {selectedOutlet && (
            <>
              <InfoWindow
                position={{
                  lat: selectedOutlet.latitude,
                  lng: selectedOutlet.longitude,
                }}
                onCloseClick={handleCloseInfoWindow}
              >
                <div>
                  <h2>{selectedOutlet.name}</h2>
                  <div>
                    <h4>Address</h4>
                    <p>
                      {selectedOutlet.address
                        ? selectedOutlet.address
                        : "No information available"}
                    </p>
                  </div>
                  <div>
                    <h4>Operating Hours</h4>

                    {selectedOutlet.operating_hour ? (
                      selectedOutlet.operating_hour.split("\n").map((day) => {
                        return <p key={day.id}>{day}</p>;
                      })
                    ) : (
                      <p>No information available</p>
                    )}
                  </div>
                  <div>
                    <h4>Waze Link</h4>
                    <p>
                      <a
                        href={selectedOutlet.waze_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {selectedOutlet.waze_link}
                      </a>
                    </p>
                  </div>
                </div>
              </InfoWindow>
              <Circle
                center={{
                  lat: selectedOutlet.latitude,
                  lng: selectedOutlet.longitude,
                }}
                radius={5000} // 5km
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.1,
                }}
              />
              <Circle
                center={{
                  lat: selectedOutlet.latitude,
                  lng: selectedOutlet.longitude,
                }}
                radius={5000} // 5km
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#FF0000",
                  fillOpacity: 0.1,
                }}
              />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Outlets;
