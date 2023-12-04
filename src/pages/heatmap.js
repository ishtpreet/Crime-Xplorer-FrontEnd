import {useState, useEffect} from 'react'

import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Map from '@components/Map';
import Link from 'next/link';

import styles from '@styles/Home.module.scss';


const DEFAULT_CENTER = [33.419069, -111.921064]

export default function Heatmap() {
    const [crimeData, setCrimeData] = useState(null);
    const [crimeDataLoaded, setCrimeDataLoaded] = useState(false);
    const countyCounts = {};
    // const countyCoords = new Set();

    const getCrimeData = async () => {
        const response = await fetch('http://localhost:3002/results');
        const data = await response.json();
        console.log(data.bindings);

        data.bindings.forEach((crime) => {    
            countyCounts[crime.countyStripped.value] = (countyCounts[crime.countyStripped.value] || 0) + 1;
            // countyCoords.add({county: crime.countyStripped.value, lat: crime.lat.value, long: crime.long});            
        });
        console.log(countyCounts)

        setCrimeData(data.bindings);
        setCrimeDataLoaded(true);

      }
    useEffect(() => {
        getCrimeData();

      }, [])

  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CrimeXplorer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/heatmap" active>HeatMap of Crimes</Nav.Link>
            <Nav.Link as={Link} href="/bylocation">Crime By Location</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Map className={styles.homeMap}  center={DEFAULT_CENTER} zoom={10}>
      {({ TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle, FeatureGroup, Rectangle }) => (
              <>
               <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LayersControl position="topright">
      <LayersControl.Overlay name="Marker with popup">
        {/* <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Layer group with circles">
        <LayerGroup>
            {Object.entries(countyCounts).map(([countyCount, count]) => (
                    <Circle pathOptions={{ fillColor: 'red' }} center={[37.601689, -121.719546]} radius={count * 100} />
                ))}
          <Circle
            center={[51.51, -0.08]}
            pathOptions={{ fillColor: 'red' }}
            radius={200}
          />
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Feature group">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>
              </>
            )}

      </Map>
      
    </>
  )
}
