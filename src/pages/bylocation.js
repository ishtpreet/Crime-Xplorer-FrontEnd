import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Map from '@components/Map';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [33.419069, -111.921064]

export default function CrimeByLocation() {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CrimeXplorer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/heatmap">HeatMap of Crimes</Nav.Link>
            <Nav.Link href="/bylocation" active>Crime By Location</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
          <Map className={styles.homeMap}  center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    Your current location
                  </Popup>
                </Marker>
              </>
            )}
          </Map>
    </>
  )
}
