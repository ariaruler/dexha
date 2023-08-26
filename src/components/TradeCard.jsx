import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ButtonTrade from "./ButtonTrade";

import ButtonChooze from "./ButtonChooze";
import { useEffect, useState, createContext } from "react";

import PopUpCC from "./PopUpCC";

import InputTrade from "./InputTrade";

import { useTheme } from "@emotion/react";
import SmButton from "./SmButton";
import Buttonfee from "./Buttonfee";
import PopUpTrade from "./PopUpTrade";

import SettingsIcon from "@mui/icons-material/Settings";
import PopUpSetting from "./PopUpSetting.";
import { Button, CircularProgress } from "@mui/material";



const inputHieght = 54;

const pages = [
  {
    content: "نرخ استاندارد",
  },
  {
    content: "بهترین قیمت",
  },
  {
    content: "نرخ ثابت",
  },
];
export const UserContext = createContext();

export default function Tradecard(props) {
  const theme = useTheme();
  console.log( "YYYYYYYYYYYYYYYYYY")
  
  const [fromAmount, setFromAmount] = useState(1);

  const [toAmount, setToAmount] = useState({});

  const [selectedCC, setselecctedCC] = useState({
    currencies: ["btc", "eth"],
    currencyImg: [
      "https://content-api.bamanchange.com/uploads/btc_1_527dc9ec3c.svg",
      "https://content-api.bamanchange.com/uploads/eth_f4ebb54ec0.svg",
    ],
    network: ["btc", "eth"],
    putCC: (id, currency, network, currencyImg) => {

      console.log(id);
      if (id === 0) {
        setselecctedCC((prev) => {
          return {
            ...prev,
            currencies: { ...prev.currencies, 0: currency },
            network: { ...prev.network, 0: network },
            currencyImg: { ...prev.currencyImg, 0: currencyImg },
          };
        });
        // console.log(selectedCC);
      }
      if (id === 1) {
        setselecctedCC((prev) => {
          return {
            ...prev,
            currencies: { ...prev.currencies, 1: currency },
            network: { ...prev.network, 1: network },
            currencyImg: { ...prev.currencyImg, 1: currencyImg },
          };
        });
      }
      handleClose();
    },
    fromAmount : fromAmount,
    toAmount : toAmount?.toAmount,
  });

  const [minData, setMinData] = useState([]);

  const [checkData, setCheckData] = useState([]);

  const [isError, setIsError] = useState("");

  const minUrl = `https://bamanchange.com/exchange/api/min-amount?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=fixed-rate&=`;

  const checkUrl = `https://bamanchange.com/exchange/api/available-pairs?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=`;

  const amountUrl = `https://bamanchange.com/exchange/api/estimated-amount?fromCurrency=${selectedCC.currencies[0]}&toCurrency=${selectedCC.currencies[1]}&fromAmount=${fromAmount}&toAmount=&fromNetwork=${selectedCC.network[0]}&toNetwork=${selectedCC.network[1]}&flow=fixed-rate&type=&useRateId=`;


  useEffect(() => {



    fetch(amountUrl)
    .then((res) => res.json())
    .then((res) => {
      setToAmount(res?.toAmount);
    });



    fetch(minUrl)
    .then((res) => res.json())
    .then((res) => {
      setMinData(res);
    });

  fetch(checkUrl)
    .then((res) => res.json())
    .then((res) => {
      setCheckData(res);
    });


    if (fromAmount < minData.minAmount && fromAmount.length > 0) {
      setIsError(true);
    }
    if (fromAmount > minData.minAmount || fromAmount.length < 1) {
      setIsError(false);
    }



      // console.log(pay);
    }, [fromAmount ]);

  // useEffect(() => {


    
  
  //     // console.log(pay);
  //   }, [ fromAmount ]);

    
    
    console.log(toAmount?.toAmount);

    // console.log(selectedCC.toAmount);


  //   useEffect(() => {
  //     // console.log(minData.minAmount);
  //     // console.log(min);

  //       //
  //       //
  //   }
  // , []);

  const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = useState(-1);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = (value) => {
    setOpen(-1);
    setSelectedValue(value);
  };

  const cardBox = {
    display: "flex",
    padding: "20px",
    backgroundColor: "rgba(256,256,256,0.1)",
    borderRadius: props.borderRadius,
    justifyContent: "center",
  };

  const iconCircle = {
    transition: "transform .2s ease-in-out",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%",
    "&:hover": {
      transform: "rotate(180deg)",
    },
  };

  const [active, setActive] = useState(0);
  const changeColor = (id) => {
    setActive(id);
  };



  return (
    <UserContext.Provider value={ { selectedCC , setselecctedCC ,  toAmount , setToAmount}  }>
      <Box sx={cardBox}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              {pages.map((page, index) => (
                <ButtonChooze
                  key={index}
                  id={index}
                  content={page.content}
                  active={active === index}
                  changeColor={changeColor}
                />
              ))}
            </div>
            <Button
              onClick={() => {
                handleClickOpen(3);
              }}
              color="common"
              sx={{ minWidth: 0 }}
            >
              <SettingsIcon />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <InputTrade
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value);   
              }}
              error={isError}
              label={
                isError
                  ? `حداقل میزان معامله ${minData.minAmount} می باشد`
                  : "پرداخت"
              }
              type="number"
              height={inputHieght}
              borderRadius={theme.shape.borderRadius["1"]}
              endAdornment={
                <SmButton
                  dropDownIcon={true}
                  id={0}
                  handleClickOpen={() => {
                    handleClickOpen(0);
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <KeyboardArrowDownIcon sx={iconCircle} />
          </Grid>

          <Grid item xs={12}>
            <InputTrade
              lable={true}
              value={ toAmount }
              label="دریافت"
              type="number"
              height={inputHieght}
              borderRadius={theme.shape.borderRadius["1"]}
              endAdornment={
                <SmButton
                  dropDownIcon={true}
                  id={1}
                  handleClickOpen={() => {
                    handleClickOpen(1);
                  }}
                />
              }
            />
          </Grid>
          <PopUpCC
            id={0}
            borderRadius={props.borderRadius}
            open={open}
            onClose={handleClose}
          />
          <PopUpCC
            id={1}
            borderRadius={props.borderRadius}
            open={open}
            onClose={handleClose}
          />
          <PopUpSetting
            id={3}
            borderRadius={props.borderRadius}
            open={open}
            onClose={handleClose}
          />

          <Grid item xs={12}>
            <ButtonTrade
              handleClickOpen={() => {
                handleClickOpen(2);
                fetch(amountUrl)
                .then((res) => res.json())
                .then((res) => {
                  setToAmount(res?.toAmount);
                });
              }}
              id={2}
              borderRadius={theme.shape.borderRadius["1"]}
              content={
                checkData[0]?.flow.standard === false
                  ? "جفت ارز مورد نظر موجود نیست"
                  : "تبادل"
              }
              width="100%"
              fontSize="1.2em"
              height={50}
              disabled={!checkData[0]?.flow.standard}
            />
          </Grid>

          <PopUpTrade
          toAmount={toAmount?.toAmount}
            id={2}
            borderRadius={props.borderRadius}
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />

          <Grid item xs={12}>
            <Buttonfee inputHieght={inputHieght} />
          </Grid>
        </Grid>
      </Box>
    </UserContext.Provider>
  );
}
