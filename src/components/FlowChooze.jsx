import { styled } from "@mui/system";
import * as React from 'react';
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ButtonChooze from "./ButtonChooze";


const pages = [
    {
      content: "نرخ متغیر",
      tooltip: `نرخ متغیر: مبادله با نرخ متغیر یعنی در این لحظه، تبادل شما با بهترین نرخ ممکن انجام می‌شود.توجه داشته باشید در مبادله با نرخ شناور نوسان قیمت روی دریافت مبلغ نهایی مبادله شده تاثیر دارد.`,
    },
    {
      content: "نرخ ثابت",
      tooltip: `نرخ ثابت:
      مبادله با نرخ ثابت یعنی در این لحظه، تبادل شما با نرخ تثبیت شده انجام می‌شود و دقیقا همین مقدار رمزارز را دریافت خواهید کرد.توجه داشته باشید در مبادله با نرخ ثابت، نوسان قیمت روی دریافت مبلغ نهایی مبادله شده تاثیر ندارد.`,
    },
  ];
  

export default function FlowChooze(props) {

  const theme = useTheme();



    return (
        <div style={{ display: "flex" }}>
        {pages.map((page, index) => (
          <Tooltip
            title={page.tooltip}
            // sx={{' .MuiTooltip-popper' : {backgroundColor : theme.palette.secondary.main} ,backgroundColor : theme.palette.secondary.main}}
            arrow
          >
            <div>
              <ButtonChooze
                key={index}
                id={index}
                content={page.content}
                active={props.active === index}
                changeColor={props.changeColor}
              />
            </div>
          </Tooltip>
        ))}
      </div>
    );
}