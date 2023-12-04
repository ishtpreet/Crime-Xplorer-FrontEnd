import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

import styles from '@styles/Home.module.scss';
import Button  from 'react-bootstrap/Button';

const DEFAULT_CENTER = [33.419069, -111.921064]

export default function Home() {
  return (
    <>
     <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CrimeXplorer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" active>Home</Nav.Link>
            <Nav.Link as={Link} href="/heatmap">HeatMap of Crimes</Nav.Link>
            <Nav.Link as={Link} href="/bylocation">Crime By Location</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
          <Container className={styles.homeContainer}>
            <h1 className={styles.homeTitle}>CrimeXplorer</h1>
            <p className={styles.homeDescription}>
              CrimeXplorer is a web application that allows users to explore crime data in the Phoenix, AZ area.
            </p>
            <Button variant="info" href="/heatmap">HeatMap of Crimes</Button>{' '}
            <Button variant="dark" as={Link} href="/bylocation">View Crime By Location</Button>

          </Container>
            
    </>
  )
}
