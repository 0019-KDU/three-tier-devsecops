import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showCansel, setShowCansel] = useState(false);

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    roleNumber: "",
  });

  const columns = useMemo(
    () => [
      {
        Header: "StudentId",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "RoleNumber",
        accessor: "roleNumber",
      },
      {
        Header: "Edit",
        id: "edit",
        accessor: "edit",
        Cell: (props) => (
          <button
            className="editBtn"
            onClick={() => populateStudent(props.cell.row.original)}
          >
            Edit
          </button>
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: "delete",
        Cell: (props) => (
          <button
            className="deleteBtn"
            onClick={() => handleDelete(props.cell.row.original.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => students, [students]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const getAllStudents = () => {
    axios
      .get(
        "http://k8s-threetie-threetie-93f89d5f7a-301963302.us-east-1.elb.amazonaws.com/api/api/users/"
      )
      .then((res) => {
        setStudents(res.data);
      });
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();
    try {
      if (studentData.id) {
        await axios.put(
          `http://k8s-threetie-threetie-93f89d5f7a-301963302.us-east-1.elb.amazonaws.com/api/api/users/${studentData.id}/`,
          studentData
        );
      } else {
        await axios.post(
          "http://k8s-threetie-threetie-93f89d5f7a-301963302.us-east-1.elb.amazonaws.com/api/api/users/",
          studentData
        );
      }
      clearAll();
    } catch (error) {
      console.error("Error adding/updating student:", error);
    }
  };

  const clearAll = () => {
    setStudentData({
      name: "",
      email: "",
      roleNumber: "",
    });
    getAllStudents();
    setShowCansel(false);
  };

  const populateStudent = (std) => {
    setShowCansel(true);
    setStudentData({
      id: std.id,
      name: std.name,
      email: std.email,
      roleNumber: std.roleNumber,
    });
  };

  const handleCansel = () => {
    clearAll();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(
          `http://k8s-threetie-threetie-93f89d5f7a-301963302.us-east-1.elb.amazonaws.com/api/api/users/${id}/`
        );
        setStudents((prevStudents) =>
          prevStudents.filter((std) => std.id !== id)
        );
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="std-container">
      <h3>Three-tire Application</h3>
      <div className="main-layout">
        <div className="form-section">
          <div className="addeditpndiv">
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="addeditinput"
              type="text"
              value={studentData.name}
              onChange={handleChange}
              name="name"
              id="name"
            />
          </div>
          <div className="addeditpndiv">
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="addeditinput"
              type="text"
              value={studentData.email}
              onChange={handleChange}
              name="email"
              id="email"
            />
          </div>
          <div className="addeditpndiv">
            <label htmlFor="roleNumber">RoleNumber</label>
            <br />
            <input
              className="addeditinput"
              type="text"
              value={studentData.roleNumber}
              onChange={handleChange}
              name="roleNumber"
              id="roleNumber"
            />
          </div>
          <button className="addBtn" onClick={handleAddEdit}>
            {studentData.id ? "Update" : "Add"}
          </button>
          <button
            className="cancelBtn"
            disabled={!showCansel}
            onClick={handleCansel}
          >
            Cancel
          </button>
        </div>

        <div className="table-section">
          <input
            className="insearch"
            type="search"
            name="inputsearch"
            id="inputsearch"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Students Here"
          />
          <table className="std-table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.id}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<"}
            </button>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
