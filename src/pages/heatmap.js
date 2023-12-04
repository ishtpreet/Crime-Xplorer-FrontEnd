import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Map from '@components/Map';

import styles from '@styles/Home.module.scss';


const DEFAULT_CENTER = [33.419069, -111.921064]

export default function Heatmap() {
    const center = [51.505, -0.09]
    const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
    ]
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CrimeXplorer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/heatmap" active>HeatMap of Crimes</Nav.Link>
            <Nav.Link href="/bylocation">Crime By Location</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Map className={styles.homeMap}  center={DEFAULT_CENTER} zoom={12}>
      {({ TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle, FeatureGroup, Rectangle }) => (
              <>
               <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LayersControl position="topright">
      <LayersControl.Overlay name="Marker with popup">
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LayersControl.Overlay>
      <LayersControl.Overlay checked name="Layer group with circles">
        <LayerGroup>
          <Circle
            center={center}
            pathOptions={{ fillColor: 'blue' }}
            radius={200}
          />
          <Circle
            center={center}
            pathOptions={{ fillColor: 'red' }}
            radius={100}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={[33.419069, -120.921064]}
              pathOptions={{ color: 'green', fillColor: 'green' }}
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Feature group">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
      </LayersControl.Overlay>
    </LayersControl>
              </>
            )}

      </Map>
      
    </>
  )
}
