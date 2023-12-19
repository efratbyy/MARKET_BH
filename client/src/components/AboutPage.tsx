import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { CssBaseline, Grid, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <>
      <Navbar showSearchBar={false} showDataFilter={false} />
      <CssBaseline />
      <Grid
        sx={{
          backgroundImage: 'url("/assets/images/about.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          zIndex: -1,
          minHeight: "100vh",
          opacity: 0.3,
        }}
      ></Grid>
      <Grid
        sx={{
          maxWidth: "800px",
          margin: "auto",
          padding: 3,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "50px",
            fontWeight: "bold",
            marginBottom: 2,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          אודות מינימרקט גבעת בית הכרם
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          ברוכים הבאים למינימרקט גבעת בית הכרם! ממוקם ברחוב החלוץ 72 בירושלים,
          אנו מתגאים להיות המקום המוביל של השכונה בכל הקשור לצרכים היומיומיים
          שלך.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          במינימרקט שלנו, אנו מחויבים לספק מוצרים טריים ואיכותיים לקהל המקומי.
          ממגוון רחב של ירקות טריים, דרך מוצרי מזון בסיסיים ועד למוצרים לבית,
          אנו כאן כדי לספק לך את כל הצרכים.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          במינימרקט גבעת בית הכרם, אנו מאמינים בבניית קהילה חזקה. צוות העובדים
          הידידותי שלנו כאן לעזור לך, ואנו שואפים ליצור סביבה חמה ומזמינה לכולם.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          אנו גאים להציע לכם גם את החוויה המקוונת שלנו! באמצעות אתר האינטרנט
          שלנו, תוכלו לגלוש ולקנות בקלות מביתכם. האתר שלנו נבנה ומתוחזק על פי
          דרישות גבוהות ומאפשר חוויה נוחה לכל משתמש.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          אתרנו מספק ממשק ידידותי ופשוט לשימוש. הניווט באתר נעשה בצורה ברורה
          ומותאמת לכל פלטפורמה - ממחשבים נייחים ועד למכשירים סלולריים. ניתן לחפש
          מוצרים, לראות מבצעים ולהוסיף מוצרים לסל הקניות בקלות.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          באמצעות החשבון האישי שלך, תוכל לעקוב אחרי ההיסטוריה של קניותיך, לשמור
          רשימות מוצרים מועדפים ולנהל את הפרטים האישיים שלך בקלות. כמו כן, האתר
          יספק לך מידע מעודכן על מבצעים, הזמנות קודמות והצעות מותאמות אישית לפי
          ההעדפות שלך.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          יש לנו צוות תמיכה זמין שיעזור לך בכל שאלה או בעיה שתיתקל בה במהלך
          השימוש באתר. אנו כאן כדי להבטיח שחוויית הקנייה שלך תהיה חיובית ונעימה
          ביותר.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          אנו מודים לך על בחירתך לקנות במינימרקט גבעת בית הכרם ומזמינים אותך
          להמשיך וליהנות מהמגוון הרחב של המוצרים והשירותים שלנו.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          נשמח לשמוע מכם ולסייע בכל שאלה או בקשה. תודה רבה על ביקורכם!
        </Typography>{" "}
      </Grid>

      <Footer />
    </>
  );
};

export default AboutPage;
