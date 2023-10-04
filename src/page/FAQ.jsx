import * as React from "react";

import { motion } from "framer-motion";
import { Container, Divider, Grid } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TransactionTracking() {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, width: 0 }}
    >
      <Container maxWidth="md">
      <Typography sx={{textAlign : 'center'}} variant="h2" gutterBottom>
      سوالات متداول
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
            صرافی غیرمتمرکز (غیر امانی) رمزارزی چیست و چه ویژگی هایی دارد؟ 
                </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            در صرافی غیر متمرکز (غیر امانی) تبادل ارزهای دیجیتال بدون در اختیار گذاشتن رمزارزهایتان به سایت می تونید آن هارا مبادله کنید و دیگر نیازی نیست که منتظر خریدار یا فروشنده باشید تا بتوانید مبادله خودتان راانجام بدهید. تمام مبادلات شما به صورت کاملا اتوماتیک با مکانیسم بازار ساز خودکار تهران اکسچنج انجام می شود.
            </Typography>
          </AccordionDetails>
        </Accordion>

        
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
            آیا در صرافی غیرمتمرکز تهران اکسچنج می توانم با تومان مبادله رمز ارز انجام بدهم؟ 
                </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            خیر، در صرافی تهران اکسچنج نمیتوانید با تومان مبادله رمزارزی انجام دهید، در صرافی تهران اکسچنج می توانید فقط تبادل رمزارز به رمزارز در شبکه های مختلف بلاکچین بدون محدودیت انجام دهید، در حال حاضر صرافی غیر متمرکز تهران اکسچنج بیش از ۸۰۰ رمزارز محبوب را برای تبادل بدون محدودیت پشتیبانی می کند.
            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
            چرا باید از صرافی غیرمتمرکز (غیر امانی) برای تبادل ارزهای دیجیتال استفاده کنم؟ 
                </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            دلایل مختلفی وجود دارد که شما ترجیح بدهید از صرافی های غیر امانی یا غیر متمرکز برای تبادل رمز ارز استفاده کنید اما مهمترین ویژگی که شما باید در نظر بگیرید این است که دارایی های شما همیشه در کیف پول شخصی خودتان است و در صرافی غیر امانی تهران اکسچنج، شما هیچ محدودیتی برای تبادل ندارید و می توانید از ۲ تتر تا  ۱۰۰۰ بیت کوین در یک مبادله تبادل کنید، نقدینگی تهران اکسچنج محدودیتی ندارد. از جمله ویژگی های دیگر که باعث می شود شما ترجیح بدهید از صرافی غیر امانتی تهران اکسچنج استفاده کنید این است که کارمزد تبادل و کارمزد انتقالات رمز ارز بسیار کمتر می شود و ویژگی های بسیار زیاد دیگری که شما می توانید از صفحه مرکز راهنمایی ها آن ها را مشاهده کنید.
            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
            چطور به صرافی تهران اکسچنج اعتماد کنم؟ 
                </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            تهران اکسچنج توسط گروهی از بهترین برنامه نویسان با تجربه در حوزه ارزهای دیجیتال و متخصصان امنیت سایبری توسعه داده شده است. ما تمام تلاش خود را کرده ایم تا بهترین نوآوری های روز خدمات ارزهای دیجیتال را به کاربران ارائه دهیم از این‌رو خدمات صرافی غیر متمرکز (غیر امانی) تبادل ارزهای دیجیتال را در اختیار شما عزیزان قرار داده ایم: ۱. بدون به امانت گذاشتن ارزهای دیجیتال در سایت می توانید به راحتی رمز ارزهای خودتان را در لحظه مبادله نمایید. ۲. برای اعتماد کردن به نحوه کارکرد تهران اکسچنج شما می توانید با کمترین مبلغ یعنی چیزی حدود کمتر از ۲ تتر مبادله خودتان را انجام دهید و مطمئن شوید که نحوه عملکرد تهران اکسچنج بینظیر است.
            </Typography>
          </AccordionDetails>
        </Accordion>

      </Container>
    </motion.div>
  );
}
