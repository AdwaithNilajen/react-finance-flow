import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, ProgressBar } from "react-bootstrap"; 

import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <ProgressBar
        now={(spent / amount) * 100} // Percentage of the budget spent
        label={`${formatPercentage(spent / amount)} spent`}
        variant="info" // modify this depending on the budget status (info, danger, success)
        max={100}
      />
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="d-flex justify-content-between">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <Button variant="danger" type="submit">
              <TrashIcon width={20} />
              Delete Budget
            </Button>
          </Form>
        </div>
      ) : (
        <div className="d-flex justify-content-between">
          <Link to={`/budget/${id}`} className="btn btn-info">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
