import React from "react";
import "./Form.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { AiOutlineDelete } from "react-icons/ai";

function Address({ val, address, handleAddress }) {
  const clickHandler = () => {
    // const filteredList = address.filter((item, index) => index !== val - 1);
    handleAddress((add) => add);

    console.log(address, val);

    // handleAddress(filteredList);
  };
  return (
    <div>
      <Formik>
        <Form>
          <div>
            {/* <h4>Address {val}</h4>
            <AiOutlineDelete className="deleteIcon " onClick={clickHandler} /> */}
            <div className="address-section">
              <div>
                <label>Office Type*</label>
                <input name="Email" placeholder="e.g. HQ, Branch, etc." />
              </div>

              <div>
                <label>Country</label>
                <input name="Email" placeholder="Enter Country" />
              </div>

              <div>
                <label>Address 1</label>
                <input name="Email" placeholder="Enter Address 1" />
              </div>

              <div>
                <label>Address 2</label>
                <input name="Email" placeholder="Enter Address 2" />
              </div>

              <div>
                <label>Zip/Postal Code</label>
                <input name="Email" placeholder="Enter Zip/Postal Code" />
              </div>

              <div>
                <label>City</label>
                <input name="Email" placeholder="Enter City" />
              </div>

              <div>
                <label>State</label>
                <input name="Email" placeholder="Enter State" />
              </div>

              <div></div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Address;
