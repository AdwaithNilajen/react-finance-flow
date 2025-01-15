import { Table as BootstrapTable } from "react-bootstrap";

const Table = ({ expenses, showBudget = true , handleDelete }) => (
  <BootstrapTable striped bordered hover responsive>
    <thead>
      <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
        {showBudget && <th>Budget</th>}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {expenses.length > 0 ? (
        expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.name}</td>
            <td>${expense.amount}</td>
            <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
            {showBudget && <td>{expense.budgetName || "N/A"}</td>}
            <td>
            <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={showBudget ? 5 : 4} className="text-center">
            No expenses found.
          </td>
        </tr>
      )}
    </tbody>
  </BootstrapTable>
);

export default Table;
