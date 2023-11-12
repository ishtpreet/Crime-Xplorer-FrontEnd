import Head from 'next/head';

import Map from '@components/Map';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [33.419069, -111.921064]

export default function Home() {
  return (
    <>
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
