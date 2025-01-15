import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "react-bootstrap"; 

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    
    
    <tr>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <Button
            variant="danger"
            type="submit"
            aria-label={`Delete ${expense.name} expense`}
            className="d-flex align-items-center"
          >
            <TrashIcon width={20} className="me-2" />
            Delete
          </Button>
        </fetcher.Form>
      </td>
    </tr>
  );
};

export default ExpenseItem;
