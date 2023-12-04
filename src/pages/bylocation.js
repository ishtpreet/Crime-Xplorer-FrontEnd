import { useState, useEffect } from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Map from '@components/Map';
import { icon } from "leaflet"
import Link from 'next/link';

import styles from '@styles/Home.module.scss';

export default function CrimeByLocation() {
  const [location, setLocation] = useState({latitude: 33.419069, longitude: -111.921064});
  const [crimeData, setCrimeData] = useState(null);
  const [crimeDataLoaded, setCrimeDataLoaded] = useState(false);

  const getCrimeData = async () => {
    const response = await fetch('http://localhost:3001/results');
    const data = await response.json();
    console.log(data.bindings);
    setCrimeData(data.bindings);
    setCrimeDataLoaded(true);
  }

  const crimeIcon = icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  })

  useEffect(() => {
    handleLocationClick()
    getCrimeData();
  }, [])

const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
    setLocation({latitude: 33.419069, longitude: -111.921064})
  }
  function toRadians(deg) {
    return (deg * 3.14) / 180;
  }
  function calculateDistance(selfCord, user) {
    let lat1 = toRadians(selfCord.latitude);
    let lng1 = toRadians(selfCord.longitude);
    let lat2 = toRadians(user.latitude);
    let lng2 = toRadians(user.longitude);

    let dlat = Math.abs(lat1 - lat2);
    let dlng = Math.abs(lng1 - lng2);

    let ans =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);

    ans = 2 * Math.asin(Math.sqrt(ans));
    ans = ans * 6371;
    return Math.floor(ans);
  }
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CrimeXplorer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/heatmap">HeatMap of Crimes</Nav.Link>
            <Nav.Link as={Link} href="/bylocation" active>Crime By Location</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
          <Map className={styles.homeMap}  center={[location.latitude, location.longitude]} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={[location.latitude, location.longitude]}>
                  <Popup>
                    Your current location
                  </Popup>
                </Marker>
                {crimeDataLoaded && crimeData.map((crime, index) => (
                  <Marker key={index} position={[crime.latitudeStripped.value, crime.longitudeStripped.value]} icon={crimeIcon}>
                    <Popup>
                      <p><b>State: </b>{crime.stateStripped.value} </p> 
                      <p><b>Crime Type: </b>{ crime.typeStripped.value }</p>
                      <p><b>Weapon Used: </b>{ crime.weapon.value}</p>
                      <p><b>Distance: </b>{calculateDistance(location, {latitude: crime.latitudeStripped.value, longitude: crime.longitudeStripped.value})} km</p>
                    </Popup>
                  </Marker>
                ))}
              </>
            )}
          </Map>
    </>
  )
}
