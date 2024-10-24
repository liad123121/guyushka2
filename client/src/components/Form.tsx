import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import DialogCustom from "./Dialog";
import { useAxios } from "../utils/hooks";

type InputOrButton = "Input" | "Button" | "";

const Form = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [inputOrButton, setInputOrButton] = useState<InputOrButton>("");
  const [steps, setSteps] = useState<
    {
      type: string;
      attribute: string;
      value: string;
    }[]
  >([]);
  const [url, setUrl] = useState("");
  const [fetch, loading] = useAxios();

  const handleOnClose = () => {
    setOpen(false);
    setSelect("");
    setSelectValue("");
  };
  const handleOnClick = (type: InputOrButton) => {
    setOpen(true);
    setInputOrButton(type);
  };
  const handleOnSubmitForm = async () => {
    await fetch({
      url: "http://localhost:4000/api/steps/add-steps",
      method: "POST",
      data: {
        url,
        steps,
      },
    });

    setSteps([]);
    setUrl("");
  };

  const handleOnSubmit = () => {
    if (inputOrButton === "") {
      handleOnClose();
      return;
    }

    setSteps((prev) => [
      ...prev,
      {
        type: inputOrButton,
        attribute: select,
        value: selectValue,
      },
    ]);
    handleOnClose();
  };
  return (
    <Stack display="flex" justifyContent="center" alignItems="center">
      <Stack sx={{ border: "lightgray 1px solid" }} p={3}>
        <TextField
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
          label="Url"
          value={url}
        />
        {steps.map((step) => (
          <Typography>
            Type: {step.type} | {step.attribute}: {step.value}
          </Typography>
        ))}
        <Button
          onClick={handleOnSubmitForm}
          disabled={steps.length === 0 || !url}
          sx={{ mt: 1 }}
        >
          Submit
        </Button>
        {loading && (
          <Box display="flex" justifyContent="center" mt="0.7rem">
            <CircularProgress />
          </Box>
        )}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => handleOnClick("Button")}>Add Step Button</Button>
        <Button onClick={() => handleOnClick("Input")}>Add Step Input</Button>
      </Box>
      {open && (
        <DialogCustom open={open} onClose={handleOnClose}>
          <Box p={3}>
            <FormControl sx={{ width: "20rem" }}>
              <InputLabel id="labelSelect">Select mf</InputLabel>

              <Select
                labelId="labelSelect"
                label="Select mf"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="ID">ID</MenuItem>
                <MenuItem value="ClassName">ClassName</MenuItem>
                <MenuItem value="CSSSelector">CSSSelector</MenuItem>
              </Select>
              {select && (
                <TextField
                  onChange={(e) => setSelectValue(e.target.value)}
                  label="Put a value to yea"
                />
              )}
              <Button
                onClick={handleOnSubmit}
                disabled={!select || !selectValue}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </DialogCustom>
      )}
    </Stack>
  );
};

export default Form;
