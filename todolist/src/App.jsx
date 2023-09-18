import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const availableSalesforceOptions = [
  "Contact Id",
  "Deleted",
  "Master Record Id",
  "Account Id",
  "Salutation",
  "Other Street",
  "Other City",
  "Other State/Province",
  "Other Zip/Postal Code"
];

const availableCallhubOptions = [
  "End_Date",
  "test1",
  "Frequency_of_giving",
  "Account Id",
  "test",
  "VANID105147",
  "WARD",
  "Dummy 1",
  "Test User"
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  tableContainer: {
    margin: "20px 0",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  tableHeader: {
    background: "#f2f2f2",
  },
  tableHeaderCell: {
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    border: "1px solid #ccc",
  },
  tableRow: {
    backgroundColor: "#fff",
  },
  tableRowCell: {
    padding: "10px",
    border: "1px solid #ccc",
  },
}));

function App() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), selectedSalesforceOption: "", selectedCallhubOption: "" },
  ]);
  const [tableData, setTableData] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleSelectChange = (id, event, field) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[field] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
    // Check if any select box has a value selected
    setIsSubmitDisabled(!newInputFields.some((field) => field.selectedSalesforceOption || field.selectedCallhubOption));
  };

  const handleAddFields = () => {
    const newInputField = {
      id: uuidv4(),
      selectedSalesforceOption: "",
      selectedCallhubOption: "",
    };

    setInputFields([...inputFields, newInputField]);
  };

  const handleRemoveFields = (id) => {
    const removedField = inputFields.find((field) => field.id === id);

    if (removedField) {
      const { selectedSalesforceOption, selectedCallhubOption } = removedField;

      setInputFields((prevFields) => {
        const newFields = prevFields.filter((field) => field.id !== id);
        return newFields.map((field) => {
          if (field.selectedSalesforceOption === selectedSalesforceOption) {
            field.selectedSalesforceOption = "";
          }
          if (field.selectedCallhubOption === selectedCallhubOption) {
            field.selectedCallhubOption = "";
          }
          return field;
        });
      });
    }
    // Check if any select box has a value selected
    setIsSubmitDisabled(!inputFields.some((field) => field.selectedSalesforceOption || field.selectedCallhubOption));
  };

  const handleTableSubmit = () => {
    const mappedFields = inputFields.map((field) => ({
      SalesforceField: field.selectedSalesforceOption,
      CallhubField: field.selectedCallhubOption,
    }));

    setTableData(mappedFields);
    toast.success("Data Mapped successfully!");
  };

  return (
    <Container>
      <br />
      <form className={classes.root}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <div>
              <h6>Salesforce fields</h6>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <h6>Callhub custom fields</h6>
            </div>
          </Grid>
          <Grid item xs={1}>
            {/* Empty grid cell for alignment */}
          </Grid>
        </Grid>

        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={5}>
                <div>
                  <FormControl sx={{ m: 1 }} fullWidth>
                    <Select
                      value={inputField.selectedSalesforceOption}
                      onChange={(e) =>
                        handleSelectChange(inputField.id, e, "selectedSalesforceOption")
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>Choose</em>
                      </MenuItem>
                      {availableSalesforceOptions
                        .filter(
                          (option) =>
                            !inputFields.some(
                              (field) =>
                                field.id !== inputField.id &&
                                field.selectedSalesforceOption === option
                            )
                        )
                        .map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <FormControl sx={{ m: 1 }} fullWidth>
                    <Select
                      value={inputField.selectedCallhubOption}
                      onChange={(e) =>
                        handleSelectChange(inputField.id, e, "selectedCallhubOption")
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="">
                        <em>Choose</em>
                      </MenuItem>
                      {availableCallhubOptions
                        .filter(
                          (option) =>
                            !inputFields.some(
                              (field) =>
                                field.id !== inputField.id &&
                                field.selectedCallhubOption === option
                            )
                        )
                        .map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  <DeleteIcon style={{marginTop:"12px"}} />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddFields}
          style={{
            textTransform: "lowercase",
            margin: "10px",
            border: "1px dashed #000",
          }}
        >
          map another field
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleTableSubmit}
          style={{ textTransform: "lowercase", margin: "10px" }}
          disabled={isSubmitDisabled} // Disable the button when no select box is selected
        >
          Submit
        </Button>

        {/* Display the table */}
        {tableData.length > 0 && (
          <div className={classes.tableContainer}>
            <h2>Mapped Fields</h2>
            <table className={classes.table}>
              <thead className={classes.tableHeader}>
                <tr>
                  <th className={classes.tableHeaderCell}>Salesforce Field</th>
                  <th className={classes.tableHeaderCell}>Callhub Field</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className={classes.tableRow}>
                    <td className={classes.tableRowCell}>{row.SalesforceField}</td>
                    <td className={classes.tableRowCell}>{row.CallhubField}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </form>
      
    </Container>
  );
}

export default App;







