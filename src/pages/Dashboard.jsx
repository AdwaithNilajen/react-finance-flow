// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";
import { Container, Row, Col, Button, Card, Table as BootstrapTable } from "react-bootstrap";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <Container>
      {userName ? (
        <>
          <Row className="my-4 text-center">
            <Col>
              <h1>
                Welcome <span className="text-primary">{userName}</span>
              </h1>
            </Col>
          </Row>
          {budgets && budgets.length > 0 ? (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <AddBudgetForm />
                </Col>
                <Col md={6}>
                  <AddExpenseForm budgets={budgets} />
                </Col>
              </Row>
              <Row className="p-4" style={{border:'solid',borderRadius:'10%'}}>
                <Col>
                  <h2>Existing Budgets</h2>
                  <Row>
                    {budgets.map((budget) => (
                      <Col md={4} key={budget.id}>
                        <BudgetItem budget={budget} />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
              {expenses && expenses.length > 0 && (
                <Row className="mt-4">
                  <Col>
                    <h2>Recent Expenses</h2>
                    <BootstrapTable striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Budget</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses
                          .sort((a, b) => b.createdAt - a.createdAt)
                          .slice(0, 8)
                          .map((expense) => (
                            <tr key={expense.id}>
                              <td >{expense.name}</td>
                              <td>{expense.amount}</td>
                              <td>
                                {budgets.find((budget) => budget.id === expense.budgetId)?.name ? (
                                  <Link to={`/budget/${expense.budgetId}`} className="btn btn-primary">
                                    {budgets.find((budget) => budget.id === expense.budgetId)?.name}
                                 </Link>
                               ) : (
                                  "Unknown Budget"
                                )}
                              </td>                              
                              <td>{new Date(expense.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                      </tbody>
                    </BootstrapTable>
                    {expenses.length > 8 && (
                      <Button
                        as={Link}
                        to="expenses"
                        variant="dark"
                        className="mt-3"
                      >
                        View all expenses
                      </Button>
                    )}
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <Row className="text-center">
              <Col>
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Intro />
      )}
    </Container>
  );
};

export default Dashboard;
