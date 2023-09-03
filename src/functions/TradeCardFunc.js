import { useContext, useEffect } from "react";
import { UserContext } from "../components/TradeCard";
import axios from "axios";





// export  const FetchAmount = (amountRef ,cc1 ,cc2 ,net1,net2) => {

//     const {
//         setToAmount
//       } = useContext(UserContext);
    
//     axios
//       .get(
//         `https://bamanchange.com/exchange/api/estimated-amount?fromCurrency=${cc1}&toCurrency=${cc2}&fromAmount=${amountRef}&fromNetwork=${net1}&toNetwork=${net2}&flow=standard`
//       )
//       .then((res) => {
//         setToAmount(res?.data.toAmount);
//         // console.log(cc1.current);
//       });


//   };


  export default function  FetchAmount(amountRef ,cc1 ,cc2 ,net1,net2) {

  
    const {
        setToAmount
      } = useContext(UserContext);
    
    axios
      .get(
        `https://bamanchange.com/exchange/api/estimated-amount?fromCurrency=${cc1}&toCurrency=${cc2}&fromAmount=${amountRef}&fromNetwork=${net1}&toNetwork=${net2}&flow=standard`
      )
      .then((res) => {
        setToAmount(res?.data.toAmount);
        // console.log(cc1.current);
      });
  
    // return [data];
  };
  
