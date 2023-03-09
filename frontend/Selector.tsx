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
import "./Selector.scss";

const Selector = () => {
  const [buttonStatus, setButton] = useState(false);
  const [table, setTable] = useState(null);
  const [field, setField] = useState(null);
  const [fields, setFields] = useState([]);

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
    setFields((fields) => [...fields, ...updatedField]);
  };

  const removeField = () => {
    const filteredFields = fields.filter((fld) => fld.id != field.id);
    setFields(filteredFields);
  };

  const clear = () => {
    setTable(null);
    setField(null);
    setFields([]);
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
