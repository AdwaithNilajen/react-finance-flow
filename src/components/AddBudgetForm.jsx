import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom";

// library imports
import { Button, Form as BootstrapForm, Col, Row } from "react-bootstrap";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper p-4 mb-4" style={{border:'solid',borderRadius:'10%',borderColor:'blue'}}>
      <h2 className="h3 mb-4">Create Budget</h2>
      <fetcher.Form method="post" ref={formRef}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <BootstrapForm.Group controlId="newBudget">
              <BootstrapForm.Label>Budget Name</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                name="newBudget"
                id="newBudget"
                placeholder="e.g., Groceries"
                required
                ref={focusRef}
              />
            </BootstrapForm.Group>
          </Col>
          <Col xs={12} md={6}>
            <BootstrapForm.Group controlId="newBudgetAmount">
              <BootstrapForm.Label>Amount</BootstrapForm.Label>
              <BootstrapForm.Control
                type="number"
                step="0.01"
                name="newBudgetAmount"
                id="newBudgetAmount"
                placeholder="e.g., ₹350"
                required
                inputMode="decimal"
              />
            </BootstrapForm.Group>
          </Col>
        </Row>

        <input type="hidden" name="_action" value="createBudget" />

        <Button
          type="submit"
          variant="dark"
          disabled={isSubmitting}
          className="d-flex align-items-center gap-2 mb-4"
        >
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Create Budget</span>
              <i class="fa-solid fa-indian-rupee-sign" width={20}></i>
            </>
          )}
        </Button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
