import { Form } from "react-router-dom"

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/Budget_plan.png"

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
        Master  <span className="accent">Your Finances</span>
        </h1>
        <p>
        Unlock the path to wealth with smart personal budgeting. Begin your transformation now.
        </p>
  
        <Form method="post">
          <input
            className="form-control"
            type="text"
            name="userName"
            required
            placeholder="What is your name?" aria-label="Your Name" autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn-primary d-flex mt-3">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img className="img-fluid" src={illustration} alt="Person with money" width={300} />
  
    </div>
  )
}
export default Intro