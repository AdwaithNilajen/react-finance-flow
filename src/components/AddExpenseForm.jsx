import { useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Button, Form as BootstrapForm, Col, Row } from "react-bootstrap";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();
      // reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper p-4" style={{border:'solid',borderRadius:'10%',borderColor:'blue'}}>
      <h2 className="h3 mb-4 text-center">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" ref={formRef}>
        <Row  className="mb-3  ">
          <Col xs={12} lg={6}>
            <BootstrapForm.Group controlId="newExpense">
              <BootstrapForm.Label>Expense Name</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                name="newExpense"
                id="newExpense"
                placeholder="e.g., Coffee"
                required
                ref={focusRef}
              />
            </BootstrapForm.Group>
          </Col>
          <Col xs={12} lg={6}>
            <BootstrapForm.Group controlId="newExpenseAmount">
              <BootstrapForm.Label>Amount</BootstrapForm.Label>
              <BootstrapForm.Control
                type="number"
                step="0.01"
                inputMode="decimal"
                name="newExpenseAmount"
                id="newExpenseAmount"
                placeholder="e.g., 3.50"
                required
              />
            </BootstrapForm.Group>
          </Col>
        </Row>

        {/* Only show this select if there are multiple budgets */}
        <Row className="mb-3" hidden={budgets.length === 1}>
          <Col xs={12}>
            <BootstrapForm.Group controlId="newExpenseBudget">
              <BootstrapForm.Label>Budget Category</BootstrapForm.Label>
              <BootstrapForm.Control as="select" name="newExpenseBudget" required>
                {budgets
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((budget) => (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  ))}
              </BootstrapForm.Control>
            </BootstrapForm.Group>
          </Col>
        </Row>

        <input type="hidden" name="_action" value="createExpense" />

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
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </Button>
      </fetcher.Form>
      
    </div>
  
  );
};

export default AddExpenseForm;
