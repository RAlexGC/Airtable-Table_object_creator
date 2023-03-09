import {
  ColorPalette,
  colors,
  colorUtils,
  FormField,
  useGlobalConfig,
} from "@airtable/blocks/ui";
import React, { useEffect } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import { Sliders } from "react-bootstrap-icons";
import Header from "./Header";
import "./Settings.scss";

const Settings = () => {
  const globalConfig = useGlobalConfig();
  // Color config example
  const backgroundColor = globalConfig.get("backgroundColor") as string;
  useEffect(() => {
    const root = window.document.documentElement;
    if (backgroundColor) {
      root.style.setProperty(
        "--backgroundColor",
        colorUtils.getHexForColor(backgroundColor)
      );
    }
  }, [backgroundColor]);
  const headerColor = globalConfig.get("headerColor") as string;
  useEffect(() => {
    const root = window.document.documentElement;
    if (headerColor) {
      root.style.setProperty(
        "--headerColor",
        colorUtils.getHexForColor(headerColor)
      );
    }
  }, [headerColor]);
  // -- End color config example

  return (
    <>
      <Header title="App Settings" icon={<Sliders color="#5577AA" />} />
      <Tabs defaultActiveKey="configuration" className="configuration-tabs">
        <Tab eventKey="colors" title="Colors">
          {/* Color config example */}
          <Card className="configuration colors">
            <FormField label="Background Color">
              <ColorPalette
                onChange={(newColor) =>
                  globalConfig.setAsync("backgroundColor", newColor)
                }
                allowedColors={Object.values(colors)}
                width="150px"
              />
            </FormField>
            <FormField label="Header Color">
              <ColorPalette
                onChange={(newColor) =>
                  globalConfig.setAsync("headerColor", newColor)
                }
                allowedColors={Object.values(colors)}
                width="150px"
              />
            </FormField>
          </Card>
          {/* End color config example */}
        </Tab>
        <Tab eventKey="about" title="About">
          <Card className="configuration">
            <p>
              Custom extension to generate code snippets for the selected Tables
              and Fields.
            </p>
          </Card>
        </Tab>
        <Tab eventKey="license" title="License">
          <Card className="configuration">
            &copy; {new Date().getFullYear()} InAir Studio
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

export default Settings;
