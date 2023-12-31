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
  Flex,
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
    try {
      let newJSONValue = strToJson(newValue || "");
      setData(newValue || "");
      if (CJsonViewerRef.current) {
        CJsonViewerRef.current.setContent(newJSONValue);
      }
    } catch (e) {
      console.log(e);
    }
  }
  function handleChangeViewer(newValue: object) {
    let newValueStr = JSON.stringify(newValue);
    setData(newValueStr);
    if (CCodeEditorRef.current) {
      CCodeEditorRef.current.setContent(beautifyJSON(newValueStr));
    }
  }
  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem w="100%">
          <Flex>
            <Button
              colorScheme="blue"
              onClick={() => {
                let jsonData = JSON.stringify(strToJson(data));
                console.log(jsonData);
                if (
                  isJsonString(jsonData) &&
                  !jsonData.endsWith(" is not valid JSON or object")
                ) {
                  CCodeEditorRef.current.setContent(toOneLineJSON(jsonData));
                  // setData(toOneLineJSON(jsonData));
                }
              }}
            >
              one line
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                let jsonData = beautifyJSON(JSON.stringify(strToJson(data)));
                if (isJsonString(jsonData)) {
                  CCodeEditorRef.current.setContent(jsonData);
                  setData(beautifyJSON(jsonData));
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
          </Flex>
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
        <GridItem w="100%" style={{ textAlign: "left" }}>
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
