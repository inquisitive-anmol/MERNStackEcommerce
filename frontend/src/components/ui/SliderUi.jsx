import React from "react";
import { Slider } from "@nextui-org/react";

export default function SliderUi({ handler, value, label, minVal, maxVal, step }) {
  return (
    <Slider
      onChangeEnd={(val) => handler(val)}
      value={value}
      showTooltip
      size="sm"
      label={label}
      minValue={minVal}
      maxValue={maxVal}
      step={step}
      formatOptions={label === "price" && { style: "currency", currency: "IND" }}
      classNames={{
        base: "max-w-md w-full gap-1",
        filler:
          "bg-gradient-to-r from-accentColor rounded-full to-secAccentColor dark:from-accentColor dark:to-secAccentColor",
        label: "font-medium text-default-900 text-medium ml-1",
        value: "font-medium text-default-700 text-small mr-1",
        track: "w-full border-none"
      }}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: [
            // arrow color
            "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
          ],
          content: [
            "py-2 shadow-xl",
            "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
          ],
        },
      }}
      renderThumb={({ index, ...props }) => (
        <div
          {...props}
          className="group p-[7px] top-1/2 bg-accentColor border-small border-secAccentColor shadow-medium rounded-full cursor-grab"
        >
          {/* <span
            className={
              "transition-transform bg-gradient-to-br shadow-small rounded-full block group-data-[dragging=true]:scale-80"
            }
          /> */}
        </div>
      )}
    />
  );
}
