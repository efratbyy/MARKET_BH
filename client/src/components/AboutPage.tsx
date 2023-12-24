import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { CssBaseline, Grid, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <>
      {/* <CssBaseline /> */}
      <Grid
        sx={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2022/12/30/12/39/flowers-7686890_1280.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          zIndex: -1,
          minHeight: "100vh",
          opacity: 0.7,
        }}
      ></Grid>
      <Navbar showSearchBar={false} showDataFilter={false} />
      <Grid
        spacing={3}
        direction="column"
        justifyContent="center"
        sx={{
          position: "relative",
          minHeight: "70vh",
          width: "100%",
          height: "30%",
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
          אודות מינימרקט גבעת בית הכרם ואתר האינטרנט שלנו :)
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
          דרישות גבוהות ומאפשר חוויה נוחה ומהנה .
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          אתרנו מספק ממשק ידידותי ופשוט לשימוש. הניווט באתר נעשה בצורה ברורה
          ומותאמת לכל פלטפורמה - ממחשבים נייחים ועד למכשירים סלולריים.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>חיפוש מוצרים: </span>
          ניתן לחפש מוצרים לפי שם המוצר, שם הספק או ברקוד המוצר, ניתן למיין
          מוצרים לפי מחיר: מהגבוה לנמוך או מהנמוך לגבוה, ניתן לסנן מוצרים לפי
          מותג ו/או לפי מדבקות סימון המוצר, במצב תצוגת מובייל האפשרויות יופיעו
          בתפריט הצד שיפתח בלחיצה על ההמבורגר שנמצא על סרגל הניווט העליון בצד
          ימין, בנוסף ניתן לחפש מוצרים בעזרת סרגל הקטגוריות שבתוכו תת-קטגוריות,
          במצב תצוגת מובייל האפשרויות יופיע במרכז סרגל הניווט התחתון, ניתן לראות
          מבצעים ולהוסיף מוצרים לסל הקניות בקלות ובפשטות. לנוחייותכם, ניתן לשנות
          את האופן שבו מוצגים הכרטיסים.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          לחיצה על התמונה תפתח חלון ובו פרטים נוספים על המוצר, עדכון במידה וחסר
          במלאי וכן אפשרות להוסיפו לסל.
        </Typography>

        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          בצד הימני של סרגל הניווט העליון מופיע עיגול ובו האות הראשונה של שם
          המשתמש המחובר. בלחיצה עליו יפתח תפריט ובו מספר אפשרויות: עריכת הפרטים
          האישיים של המשתמש המחובר, מעקב אחר ההיסטוריית ההזמנות שלו והתנתקות
          מהחשבון האישי המחובר. במידה והמשתמש הוא מסוג אדמין יפתחו באפשרותו מספר
          אפשרויות נוספות: הוספת מוצר חדש, עריכת משתמשים וניהול מלאי.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>משתמש רגיל:</span>
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>עריכת הפרטים האישיים-</span>
          בלחיצה על אפשרות זו יפתח בפניך מסך ובו טופס עם כל הפרטיים האישיים
          שהזנת כשנרשמת לאתר. תוכל לעדכן את כל הפרטים, מלבד המייל, ולאחר מכן
          ללחוץ על עדכון. במידה ואינך רוצה לשנות כלום פשוט לחץ על כפתור הביטול
          ותועבר ישירות לעמוד הבית.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>הסטוריית הזמנות-</span>
          בלחיצה על אפשרות זו תועבר לדף ובו מפורטות כל ההזמנות שביצעת בעבר.
          בלחיצה על אחת מהאפשרויות בראש הטבלה תוכל למיין את הסטוריית ההזמנות שלך
          לפי: מספר הזמנה, תאריך הזמנה, מספר פריטים או סכום ההזמנה. בלחיצה על
          אחת ההזמנות יפתח מסך ובו פירוט של כל ההזמנה כולל מספר ההזמנה והסכום
          שלה. כמו כן, במידה ותרצה לחזור לעמוד הקודם של הסטוריית ההזמנות או
          אפילו לחזור לעמוד הראשי פשוט תוכל ללחוץ על הקישור שבצדו הימני העליון
          של המסך.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>התנתקות-</span>
          בלחיצה על אפשרות זו תישאר באתר את תתנתק מהחשבון האישי שלך ולא תוכל
          לבצע הזמנות.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>מנהל-משתמש מסוג אדמין:</span>
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          בפני מנהל פתוחות מספר אפשרויות נוספות והן:
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>הוספת מוצר חדש-</span>
          בלחיצה על אפשרות זו תועבר לדף ובו תצטרך להכניס את פרטי המוצר החדש.
          ישנם 3 שדות שבצד הימני שלהם ישנו עיגול ובתוכו האות i שבלחיצה עליו יפתח
          חלון קטן עם הסבר לגבי התוכן שיש להכניס בשדה זה. כמו כן, ישנם 2 שדות
          שצריך לבחור אחת מהאפשרויות שיפתחו בלחיצה על החץ הקטן שבשדה. בסיום
          הכנסת כל פרטי המוצר יש ללחוץ על הכפתור הוסף מוצר. במידה וברצונכם לחזור
          לעמוד הבית יש ללחוץ על כפתור הביטול שיקח אתכם ישירות לשם.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>עריכת משתמשים-</span>
          בלחיצה על אפשרות זו תועבר לדף ובו טבלה עם כל המשתמשים הרשומים באתר.
          בלחיצה על <span style={{ fontWeight: "bold" }}>
            עריכת הלקוח{" "}
          </span>{" "}
          תועבר לדף ובו פרטי המשתמש למעט הסיסמה כמובן, שם תוכל לערוך את פרטיו,
          בנוסף תוכל להפוך משתמש רגיל למשתמש מסוג מנהל ע״י סימון וי בריבוע שבסוף
          הטופס שלידו כתוב מנהל ובכך לאפשר לו את כל ההרשאות שיש למנהל. בסיום
          העריכה יש ללחוץ על כפתור העדכון ופרטי הלקוח כפי שהזנת יתעדכנו במערכת,
          במידה ולא תרצה לעדכן יש ללחוץ על כפתור הביטול שיעביר אותך ישירות חזרה
          לדף ניהול הלקוחות . בנוסף, ע״י לחיצה על האייקון בצורת פח אדום ניתן
          <span style={{ fontWeight: "bold" }}> למחוק לקוח </span> מהמערכת.
          במידה ולחצת על מחיקת לקוח יפתח חלון המבקש אישור נוסף למחיקת הלקוח
          ולאחר לחיצה על האישור הלקוח ימחק מידית ולא ניתן יהיה לשחזרו. כמו כן,
          ניתן גם
          <span style={{ fontWeight: "bold" }}> ליצור לקוח חדש </span> ע״י לחיצה
          על הפלוס הכחול שמנצא בתחתית הצד הימני של המסך. בלחיצה על כפתור זה
          תועבר לדף ובו תצטרך למלא את פרטיו האישיים של הלקוח, כולל סיסמא, וללחוץ
          על הכפתור ״הוסף״. לחיצה על כפתור הביטול תוביל אותך חזרה לעמוד ניהול
          הלקוחות.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>ניהול מלאי-</span>
          בלחיצה על אפשרות זו תועבר לדף ובו טבלה עם כל המוצרים שבחנות. בכל מוצר
          מפורט שם הספק, מחיר המוצר, מלאי המוצר, ברקוד המוצר ובנוסף ניתן לערוך
          או למחוק את המוצר. במידה ותלחץ על כפתור עריכת המוצר תגיע לעמוד ובו כל
          פרטי המוצר ותוכל לערוך אותם כרצונך. בסיום עריכת המוצר יש ללחות על
          כפתור עדכן מוצר והעדכון ישמר במערכת. במידה ואין ברצונך לערוך את פרטי
          המוצר ניתן ללחוץ על כפתור הביטול ותועבר ישירות לדף הבית. בלחיצה על
          האייקון של הפח האדום תוכל למחוק מוצר, כאשר תלחץ עליו תפתח הודעה המבקשת
          ממך לאשר את המחיקה ובמידה ותאשר המוצר ימחק לצמיתות. בכדי לעדכן מחיר
          ו/או מלאי של מוצר אין צורך להיכנס לדף עריכת המוצר, ניתן לעשות זאת
          ישרות מתוך הטבלה! בראש הטבלה קיים שדה חיפוש שבו ניתן לחפש מוצר מסויים
          ע״פ שם המוצר, שם הספק או ברקוד המוצר.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          במידה והמשתמש הוא מנהל/אדמין, יופיעו על כל כרטיסי המוצרים אייקון של
          עיפרון לעריכת המוצר ואייקון של פח למחיקת המוצר.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>סיום הקנייה-</span>
          בסיום הקנייה יש ללחוץ על כפתור לתשלום. במידה ויש בעגלה מוצרים שחסרים
          במלאי יקפוץ חלון ובו המוצרים החסרים והכמות החסרה מהם. יש להוריד את
          הכמות המצויינת של אותו המוצר מהכמות שהכנסתם לעגלה וללחוץ שוב על לתשלום
          ומשם תועברו לדף התשלום.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          בדף התשלום יופיע הסכום לתשלום ותתבקשו להכניס את פרטי האשראי שלכם
          וללחוץ על כפתור לחץ לתשלום. לאחר השלמת הרכישה תועברו לדף המציין כי
          הרכישה התבצעה בהצלחה ויופיע גם מספר ההזמנה. במקביל ישלח מייל ללקוח עם
          פרטי ההזמנה ומייל לבעל החנות עם פרטי ההזמנה בכדי שיכין את ההזמנה
          למשלוח. במידה ונזכרתם במוצר נוסף שברצונכם להוסיף לעגלה תוכלו ללחוץ
          בחלקו הימני העליון של המסך על הקישור ל ״קופה״ שיחזיר אתכם לקופה או על
          הקישור ״מרקט בית הכרם״ שיוביל אתכם לעמוד הראשי. כל זאת כמובן לפני
          ביצוע התשלום.
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          <span style={{ fontWeight: "bold" }}>סרגל הניווט התחתון-</span>
          ישנם שני סרגלים שונים: האחד במצב מחשבים נייחים והשני במצב טאבלטים
          ומכשירים סלולריים.{" "}
          <span style={{ fontWeight: "bold" }}>מחשבים נייחים: </span> בסרגל זה
          יופיעו מספר אפשרויות והן: טלפון ופקס החנות שבלחיצה עליהם יבצע חיוג
          לחנות, דואר אלקטרוני של החנות שבלחיצה עליו יפתח מיידית מייל לחנות,
          יצירת קשר בווטספא שבלחיצה עליו יפתח את הווסטאפס עם המספר ווטסאפ של
          החנות, קישור לעמוד הפייסבוק שלנו, קישור לעמוד האינסטגרם שלנו,
          אודותינו-דף המספר עלינו ומסביר על אתר החנות, הצהרת נגישות, תנאי
          השימוש, מדיניות פרטיות וכתובתינו שבלחיצה עליה תפתח קישור ישיר לניווט
          בעזרת גוגל.{" "}
          <span style={{ fontWeight: "bold" }}>טלפונים סלולריים : </span> גם
          בסרגל זה יופיעו מספר אפשרויות והן: כפתור הבית שבלחיצה עליו תועברו
          ישירות לעמוד הבית, כפתור אודות שבלחיצה עליו תועברו לעמוד המספר אודות
          חנותינו והסברים על אתר האינטרנט שלנו. במרכז הסרגל מופיע עיגול ובתוכו 3
          קווים, לחיצה עליו תפתח את תפריט קטגוריית ותת-קטגוריית המוצרים שבעזרתו
          ניתן לסנן את המוצרים שיופיעו בדף. ניתן ללחוץ על ״חזור אחורה״ ובכך
          לחזור תפריט אחד אחורה וניתן גם ללחוץ על האיקס שבראש התפריט מצד שמאל
          ובכך לסגור את התפריט. משמאל ללחצן פתיחת תפריט הקטגוריות ישנו כפתור
          שבלחיצה עליו יעביר אותך לדף הפייסבוק שלנו ואחריו כפתור נוסף שיוביל
          אותך לעמוד האינסטגרם שלנו.
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
        </Typography>
      </Grid>
      <Footer />
    </>
  );
};

export default AboutPage;
