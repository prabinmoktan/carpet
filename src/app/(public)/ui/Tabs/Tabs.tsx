"use client";
import React, { useState } from "react";
import Button from "../Button/Button";

interface TabItem {
  value: string; // unique id for tab
  label: string; // title shown in header
  content: React.ReactNode; // content for this tab
}
interface TabTypes {
  tabs: TabItem[];
  defaultValue: string;
  className: string;
}

const Tabs: React.FC<TabTypes> = ({ tabs, defaultValue, className }) => {
  const initial = defaultValue ?? tabs[0]?.value;

  const [active, setActive] = useState(initial);

  const activeTab = tabs.find((tab)=> tab.value === active)


  console.log(tabs);
  return (
    <>
      <div className={`w-full ${className}`}>
        <div>
          { tabs && tabs?.map((tab, index) => (
            <Button
              key={index}
              title={tab.label}
              variant={"primary"}
              onClick={() => setActive(tab.value)}
            />
          ))}
        </div>
        <div>
          {activeTab?.content}
        </div>
      </div>
    </>
  );
};

export default Tabs;
