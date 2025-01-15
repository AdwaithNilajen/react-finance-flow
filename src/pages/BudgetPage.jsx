// rrd imports
import { useLoaderData, useSubmit } from "react-router-dom";

// library
import { toast } from "react-toastify";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const submit = useSubmit();

  // Handle delete button click
  const handleDelete = (expenseId) => {
    const formData = new FormData();
    formData.append("_action", "deleteExpense");
    formData.append("expenseId", expenseId);
    submit(formData, { method: "post" });
  };

  return (
    <div
      className="container-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="display-4 text-center my-4">
        <span style={{ color: budget.color }}>{budget.name}</span> Overview
      </h1>

      <div className="row mb-4 w-100 p-5">
        <div className="col-lg-6 mb-5 p-5" style={{ border: "solid", borderRadius: "10%" }}>
          <BudgetItem budget={budget} showDelete={true} />
        </div>
        <div className="col-lg-6">
          <AddExpenseForm budgets={[budget]} />
        </div>
      </div>

      <div style={{ backgroundColor: "lightBlue", width: "100%", height: "3px" }}></div>

      {expenses && expenses.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center mb-4">
            <span style={{ color: budget.color }}>{budget.name}</span> Expenses
          </h2>
          <div className="d-flex justify-content-center">
            <Table
              expenses={expenses}
              showBudget={false}
              handleDelete={handleDelete} // Pass delete handler to Table
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
