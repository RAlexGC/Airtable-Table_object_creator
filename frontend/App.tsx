import React from "react";
import { useSettingsButton, Icon } from "@airtable/blocks/ui";
import { useState } from "react";
import Settings from "./Settings";
import Header from "./Header";
import "./App.scss";
import { globalConfig } from "@airtable/blocks";
import useCustomColors from "./useCustomColors";
import Selector from "./Selector";

const App = () => {
  // Show settings button
  const [isShowingSettings, setIsShowingSettings] = useState(false);
  useSettingsButton(function () {
    setIsShowingSettings(!isShowingSettings);
  });

  // Example of Bootstrap icons
  const icons = (
    <div className="icons">
      <Icon name="code" size={20} />
    </div>
  );

  // Example of Globalconfig and use of custom hook
  const backgroundColor = globalConfig.get("backgroundColor") as string;
  const headerColor = globalConfig.get("headerColor") as string;
  useCustomColors({ backgroundColor, headerColor });

  return (
    <div className="container">
      {isShowingSettings ? (
        <Settings />
      ) : (
        <>
          <Header title="InAir Table Object Generator" icon={icons} />
          <div className="selector">
            <Selector />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
