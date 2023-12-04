import { useEffect, useRef, useState } from "react";
import CCodeEditor from "../component/ceditor";
import CJsonViewer from "../component/cjsonviewer";
import {
  beautifyJSON,
  isJsonString,
  strToJson,
  toOneLineJSON,
} from "../utility/jsonUtil";
import {
  Grid,
  GridItem,
  Button,
  HStack,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function JsonViewer() {
  const [data, setData] = useState("");
  const CCodeEditorRef = useRef<any>();
  const CJsonViewerRef = useRef<any>();
  useEffect(() => {
    console.log(data);
    console.log(JSON.stringify(data));
  }, [data]);

  function handleChangeEditor(newValue: string | undefined) {
    setData(String(newValue || ""));
    if (CJsonViewerRef.current) {
      CJsonViewerRef.current.setContent(strToJson(newValue || ""));
    }
  }
  function handleChangeViewer(newValue: string) {
    setData(String(newValue));
    if (CCodeEditorRef.current) {
      CCodeEditorRef.current.setContent(beautifyJSON(newValue));
    }
  }
  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%">
          <Button
            colorScheme="blue"
            onClick={() => {
              if (isJsonString(data)) {
                CCodeEditorRef.current.setContent(toOneLineJSON(data));
              }
            }}
          >
            one line
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (isJsonString(data)) {
                CCodeEditorRef.current.setContent(beautifyJSON(data));
              }
            }}
          >
            format
          </Button>
          <HStack display="flex">
            <FormLabel>Space:</FormLabel>
            <NumberInput
              defaultValue={2}
              min={0}
              placeholder="level"
              onChange={(valueString: string) => {
                if (isJsonString(data)) {
                  CCodeEditorRef.current.setContent(
                    beautifyJSON(data, valueString)
                  );
                }
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </GridItem>
        <GridItem w="100%" h="10"></GridItem>
        <GridItem w="100%">
          <CCodeEditor
            defaultValue={""}
            onChange={handleChangeEditor}
            value={data}
            ref={CCodeEditorRef}
          />
        </GridItem>
        <GridItem w="100%">
          <CJsonViewer
            defaultValue={{}}
            onChange={handleChangeViewer}
            ref={CJsonViewerRef}
          ></CJsonViewer>
        </GridItem>
      </Grid>
    </div>
  );
}
