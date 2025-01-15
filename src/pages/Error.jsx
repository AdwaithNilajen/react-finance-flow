import { useRouteError, Link, useNavigate } from "react-router-dom";

// library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button, Container, Row, Col } from "react-bootstrap";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-3 text-danger">Uh oh! We’ve got a problem.</h1>
          <p className="lead">{error.message || error.statusText}</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              variant="outline-danger"
              onClick={() => navigate(-1)}
              className="d-flex align-items-center"
            >
              <ArrowUturnLeftIcon width={20} />
              <span className="ms-2">Go Back</span>
            </Button>

            <Link to="/" className="btn btn-outline-primary d-flex align-items-center">
              <HomeIcon width={20} />
              <span className="ms-2">Go home</span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
