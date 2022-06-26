import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Form.css";
import * as Yup from "yup";
import Address from "./Address";
import { AiOutlineDelete } from "react-icons/ai";

function Formpage({ handleShow, setCompData, compData }) {
  const ref = useRef(null);

  const initalValues = {
    CompanyName: "",
    Website: "",
    Email: "",
    Phone: "",
  };

  const validation = Yup.object().shape({
    CompanyName: Yup.string().required("Enter Company"),
    Website: Yup.string().required("Enter Website"),
    Email: Yup.string().email().required("Enter Email Address"),
    Phone: Yup.number().positive().integer().required("Enter Phone Number"),
  });

  const [address, setAddress] = useState([]);

  const filterAddress = () => {
    const addressList = address.filter();
  };
  const addHandler = () => {
    console.log("1address", address);

    setAddress(
      address.concat(
        <Address
          val={address.length + 2}
          address={address}
          handleAddress={setAddress}
          key={address.length}
        />
      )
    );
    console.log("address", address);
  };

  const filterData = (index) => {
    console.log(index, address);
    setAddress(address.filter((add, indx) => indx !== index));
  };

  const [addressInfo, setAddressInfo] = useState({
    0: {
      OfficeType: "",
      Country: "",
      Address1: "",
      Address2: "",
      ZipCode: "",
      City: "",
      State: "",
    },
  });

  const handleChange = (e, txt) => {
    let x = { ...addressInfo };

    x["0"][txt] = e.target.value;

    setAddressInfo(x);
  };

  const saveData = (data) => {
    const x = {
      CompanyMaster: {
        CompanyTypeId: compData.length,
        CompanyCode: "xx",
        CompanyName: data.CompanyName,
        CompanyWebsite: data.Website,
        CompanyEmail: data.Email,
        CompanyPhone: data.Phone,
        IsActive: true,
        CompanyId: compData.length,
        CreatedDate: new Date(),
      },
      CompanyAddressList: {
        ...addressInfo,
      },
    };
    setCompData((add) => {
      return [...add, x];
    });
    console.log(x);
    handleShow(false);
  };

  return (
    <div className="form">
      <h3>Company Details</h3>
      <Formik
        initialValues={initalValues}
        validationSchema={validation}
        onSubmit={saveData}
      >
        <Form>
          <div className="input-section">
            <div>
              <label>Company Name*</label>
              <Field name="CompanyName" placeholder="Enter Company Name" />
              <ErrorMessage name="CompanyName" component="span" />
            </div>
            <div>
              <label>Website</label>
              <Field name="Website" placeholder="Enter Website" />
              <ErrorMessage name="Website" component="span" />
            </div>
            <div>
              <label>Email</label>
              <Field name="Email" placeholder="Enter Email" />
              <ErrorMessage name="Email" component="span" />
            </div>
            <div>
              <label>Phone</label>
              <Field name="Phone" placeholder="Enter Phone" />
              <ErrorMessage name="Phone" component="span" />
            </div>
          </div>
          <div>
            <br />
            <h4>Address 1</h4>
            <div className="address-section">
              <div>
                <label>Office Type*</label>
                <input
                  name="a1"
                  placeholder="e.g. HQ, Branch, etc."
                  value={addressInfo["0"].OfficeType}
                  onChange={(e) => {
                    let x = { ...addressInfo };
                    console.log(x);
                    x["0"].OfficeType = e.target.value;
                    setAddressInfo(x);
                  }}
                  required
                />
              </div>

              <div>
                <label>Country</label>
                <input
                  name="a2"
                  placeholder="Enter Country"
                  value={addressInfo["0"].Country}
                  onChange={(e) => handleChange(e, "Country")}
                />
              </div>

              <div>
                <label>Address 1</label>
                <input
                  name="a3"
                  placeholder="Enter Address 1"
                  value={addressInfo["0"].Address1}
                  onChange={(e) => handleChange(e, "Address1")}
                />
              </div>

              <div>
                <label>Address 2</label>
                <input
                  name="a4"
                  placeholder="Enter Address 2"
                  value={addressInfo["0"].Address2}
                  onChange={(e) => handleChange(e, "Address2")}
                />
              </div>

              <div>
                <label>Zip/Postal Code</label>
                <input
                  name="a5"
                  placeholder="Enter Zip/Postal Code"
                  value={addressInfo["0"].ZipCode}
                  onChange={(e) => handleChange(e, "ZipCode")}
                />
              </div>

              <div>
                <label>City</label>
                <input
                  name="a6"
                  placeholder="Enter City"
                  value={addressInfo["0"].City}
                  onChange={(e) => handleChange(e, "City")}
                />
              </div>

              <div>
                <label>State</label>
                <input
                  name="a7"
                  placeholder="Enter State"
                  value={addressInfo["0"].State}
                  onChange={(e) => handleChange(e, "State")}
                />
              </div>

              <div></div>
            </div>
          </div>
          {/* <button type="submit">Save</button> */}
          <div className="abc">
            {address.map((add, index) => (
              <>
                <br></br>

                <div style={{ position: "relative" }}>
                  <h4>Address {index + 2}</h4>
                  {add}
                  <AiOutlineDelete
                    size={20}
                    className="deleteIcon"
                    style={{
                      position: "absolute",
                      top: "20px",
                      color: "red",
                      zIndex: 100,
                    }}
                    onClick={() => filterData(index)}
                  />
                </div>
              </>
            ))}
            {/* <Address /> */}
          </div>
          <button className="add-address" onClick={addHandler} type="button">
            + Add new Address
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "70px",
            }}
          >
            <div className="cancel-save-btns">
              <button className="cancel-btn" onClick={() => handleShow(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Formpage;
