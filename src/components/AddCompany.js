import { Button, Table, Modal } from "antd";
import { useState } from "react";
import companyInfo from "../data";
import {
  AiOutlineEye,
  AiFillDelete,
  AiOutlineCheckCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsThreeDots, BsFillPencilFill, BsSearch } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import "../styles.css";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

import { Dropdown, Menu, Space } from "antd";

const columns = [
  {
    title: "Company Name",
    dataIndex: "CompanyName",

    render: (txt) => {
      return (
        <span className="center-row " style={{ cursor: "pointer" }}>
          <AiOutlineEye
            size={18}
            style={{
              marginRight: "5px",
            }}
          />{" "}
          {txt}
        </span>
      );
    },
  },
  {
    title: "Website",
    dataIndex: "CompanyWebsite",
    render: (txt) => (
      <a href={txt} style={{ textDecoration: "underline", color: "black" }}>
        {txt}
      </a>
    ),
  },
  {
    title: "Phone",
    dataIndex: "CompanyPhone",
    // defaultSortOrder: "descend",
    sorter: (a, b) => +a.CompanyPhone - +b.CompanyPhone,
  },
  {
    title: "Email",
    dataIndex: "CompanyEmail",
  },
  {
    title: "ACTION",
    key: "operation",
    fixed: "left",
    width: 100,
    render: () => (
      <Dropdown overlay={menu} placement="bottom">
        <a
          onClick={(e) => e.preventDefault()}
          className="center"
          style={{ color: "gray" }}
        >
          <BsThreeDots />
        </a>
      </Dropdown>
    ),
  },
];

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <p style={{ marginLeft: "5px" }}>View</p>,
        icon: <AiOutlineEye size={20} />,
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            style={{ marginLeft: "5px" }}
          >
            Edit
          </a>
        ),
        icon: <BsFillPencilFill size={20} />,
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            style={{ marginLeft: "5px" }}
          >
            Delete
          </a>
        ),
        icon: <AiFillDelete size={20} />,
      },
      {
        key: "4",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            style={{ marginLeft: "5px" }}
          >
            Approve
          </a>
        ),
        icon: <AiOutlineCheckCircle size={20} />,
      },
    ]}
  />
);

const App = ({ handleShow, datas }) => {
  const data = [];
  const [visible, setVisible] = useState(false);
  datas.forEach((company, index) => {
    console.log(company);
    data.push({
      key: index,
      CompanyName: company?.CompanyMaster?.CompanyName,
      CompanyWebsite: company?.CompanyMaster?.CompanyWebsite,
      CompanyPhone: +company?.CompanyMaster?.CompanyPhone.replace(/ /g, ""),
      CompanyEmail: company?.CompanyMaster?.CompanyEmail,
      CompanyAddressList: company?.CompanyAddressList,
    });
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [compData, setCompData] = useState(data);
  const [tempData, setTempData] = useState(data);
  const [currentInfo, setCurrentInfo] = useState({});

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const filterData = () => {
    setTempData(
      compData.filter((d) => d.CompanyName.toLowerCase().includes(text.toLowerCase()))
    );
    console.log(tempData,compData);
  };
  return (
    <div className="main">
      <div className="center-conatiner">
        <div className="containers">
          <div className="input-container">
            <input
              placeholder="Enter Company Name"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="search"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "#000642",
                border: "none",
                borderRadius: "5px",
                padding: "9px 20px",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={filterData}
            >
              <BsSearch /> Search
            </button>
            <button
              className="clear"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                gap: "10px",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setText("");
                setTempData(compData);
              }}
            >
              <ImCross size="8" />
              Clear
            </button>
          </div>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              backgroundColor: "#000642",
              border: "none",
              borderRadius: "5px",
              padding: "9px 20px",
              gap: "10px",
              width: "250px",
            }}
            onClick={() => handleShow(true)}
          >
            <AiOutlinePlus size="18" /> Add New Company
          </button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tempData}
          columnWidth={10}
          className="table"
          pagination={{
            total: tempData.length,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 8,
            defaultCurrent: 1,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setCurrentInfo(tempData[rowIndex]);
                setVisible(true);
              },
            };
          }}
        />
      </div>

      <Modal
        title="Company Details"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <div className="input-section">
          <div>
            <label>Company Name: </label>
            <p>{currentInfo?.CompanyName}</p>
          </div>
          <div>
            <label>Website: </label>
            <p> {currentInfo?.CompanyWebsite}</p>
          </div>
          <div>
            <label>Email: </label>
            <p>{currentInfo?.CompanyEmail} </p>
          </div>
          <div>
            <label>Phone: </label>
            <p>{currentInfo?.CompanyPhone} </p>
          </div>
        </div>
        <div>
          <br />
          <h4>Address 1</h4>
          <div className="address-section">
            <div>
              <label>Office Type: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.OfficeType}</p>
            </div>

            <div>
              <label>Country: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.Country || "---"}</p>
            </div>

            <div>
              <label>Address 1: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.Address1 || "---"}</p>
            </div>

            <div>
              <label>Address 2: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.Address2 || "---"}</p>
            </div>

            <div>
              <label>Zip/Postal Code: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.ZipCode || "---"}</p>
            </div>

            <div>
              <label>City: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.City || "---"}</p>
            </div>

            <div>
              <label>State: </label>
              <p>{currentInfo?.CompanyAddressList?.[0]?.State || "---"}</p>
            </div>

            <div></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
