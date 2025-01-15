// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

// helper functions
import { fetchData } from "../helpers";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

// React Bootstrap-based redesign
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Main = () => {
  const { userName } = useLoaderData();

  return (
    <Container fluid className="p-0 layout">
      {/* Navigation */}
      <Row>
        <Col>
          <Nav userName={userName} />
        </Col>
      </Row>

      {/* Main Content */}
      <Row as="main" className="justify-content-center mt-4">
        <Col xs={12} md={10} lg={8}>
          <Outlet />
        </Col>
      </Row>

      {/* Wave image */}
      <Row>
        <Col>
          <img src={wave} alt="" className="w-100 mt-4" />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
