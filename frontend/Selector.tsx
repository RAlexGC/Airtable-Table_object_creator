import { base } from "@airtable/blocks";
import {
  FormField,
  Button,
  Box,
  Text,
  TablePicker,
  FieldPicker,
} from "@airtable/blocks/ui";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Selector.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Selector = () => {
  const [buttonStatus, setButton] = useState(false);
  const [table, setTable] = useState(null);
  const [field, setField] = useState(null);
  const [fields, setFields] = useState([]);
  const [fieldsStr, setFieldsStr] = useState("");
  const tableObjectStr = `// Table Object${""}\nconst ${table?.name.replace(
    / /g,
    ""
  )} = {\ntable: base.getTable('${table?.id}'),\nfields: {\n${fieldsStr}}}`;

  const tableSelected = (newTable) => {
    const tableInfo = base.getTableByIdIfExists(newTable._id);
    setTable(tableInfo);
    setButton(false);
    setFields([]);
  };

  const fieldSelected = (newField) => {
    const fieldInfo = table.getFieldByIdIfExists(newField._id);
    setField(fieldInfo);
    setButton(true);
  };

  const addField = () => {
    const updatedField = [{ name: field.name.replace(/ /g, ""), id: field.id }];
    const updatedFields = [...fields, ...updatedField];
    setFields(updatedFields);
    let str = "";
    updatedFields.forEach(
      (field) => (str = str + "\t" + field.name + ": '" + field.id + "',\n")
    );
    setFieldsStr(str);
  };

  const removeField = () => {
    const filteredFields = fields.filter((fld) => fld.id != field.id);
    setFields(filteredFields);
    let str = "";
    filteredFields.forEach(
      (field) => (str = "\t" + str + field.name + ": '" + field.id + "',\n")
    );
    setFieldsStr(str);
  };

  const clear = () => {
    setTable(null);
    setField(null);
    setButton(false);
    setFields([]);
  };

  const copy = () => {
    toast.success("Copied!", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  return (
    <div className="selector">
      <FormField label="Table">
        <TablePicker
          table={table}
          onChange={(newTable) => tableSelected(newTable)}
        />
      </FormField>
      <FormField label="Field" marginBottom={0}>
        <FieldPicker
          table={table}
          field={field}
          onChange={(newField) => fieldSelected(newField)}
        />
      </FormField>
      <div className="buttons">
        <Button
          variant="primary"
          onClick={() => addField()}
          disabled={!buttonStatus}
        >
          Add field
        </Button>
        <Button
          variant="danger"
          onClick={() => removeField()}
          disabled={!buttonStatus}
          marginLeft={2}
        >
          Remove field
        </Button>
        <CopyToClipboard text={tableObjectStr}>
          <Button
            variant="default"
            disabled={!buttonStatus}
            marginLeft={2}
            onClick={() => copy()}
          >
            Copy to clipboard
          </Button>
        </CopyToClipboard>
        <ToastContainer autoClose={1000} hideProgressBar />
        <Button variant="default" onClick={() => clear()} marginLeft={2}>
          Clear
        </Button>
      </div>
      <Text marginTop={2} size="large">
        Code
      </Text>
      <Box
        border="default"
        backgroundColor="white"
        padding={2}
        marginTop={1}
        height={300}
        overflow="hidden"
        id="code"
      >
        {table ? (
          <Text>
            {"// Table Object"}
            <br />
            {`const ${table?.name.replace(/ /g, "")} = {`}
            <br />
            {`table: base.getTable('${table?.id}'),`}
            <br />
            {`fields: {`}
            {fields?.map((field) => (
              <div key={field.id}>{`${field.name}: '${field.id}',`}</div>
            ))}
            {"}}"}
          </Text>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default Selector;