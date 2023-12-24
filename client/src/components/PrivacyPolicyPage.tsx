import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Grid } from "@mui/material";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Grid
        sx={{
          backgroundImage: 'url("/assets/images/privacy_policy.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          zIndex: -1,
          minHeight: "100vh",
          opacity: 0.5,
        }}
      ></Grid>
      <Navbar showSearchBar={false} />
      <Grid
        sx={{
          maxWidth: "800px",
          margin: "auto",
          padding: 3,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* <p>
          <p>
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <strong>
                        <u>
                          <span
                            lang="HE"
                            style='font-family:"Arial","sans-serif"'
                          >
                            מדיניות פרטיות
                          </span>
                        </u>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:center">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <strong>
                        <u>
                          <span
                            lang="HE"
                            style='font-family:"Arial","sans-serif"'
                          ></span>
                        </u>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        ראובני מרקט (להלן: "<strong>הקמעונאי</strong>" ו/או
                        "אחים ראובני" ו/או "<strong>אנו</strong>") רואה חשיבות
                        בשמירה על פרטיות הגולשים ועושה מאמצים להגן ולשמור כיאות
                        על המידע של הגולשים ועל פרטיותם
                      </span>
                      <span dir="LTR" style='font-family:"Arial","sans-serif"'>
                        .
                      </span>
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        {" "}
                        השימוש באתר (להלן: "<strong>האתר</strong>"), כפוף
                        למדיניות הפרטיות המפורסמת להלן (להלן: "
                        <strong>מדיניות הפרטיות</strong>").
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          dir="LTR"
                          style='font-family:"Arial","sans-serif"'
                        ></span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        מדיניות הפרטיות מנוסחת בלשון זכר אך מיועדת לכל אדם הגולש
                        באתר, נשים וגברים כאחד (להלן: "<strong>אתה</strong>", "
                        <strong>המשתמש/ים</strong>" או "
                        <strong>הגולש/ים</strong>"). גלישה ו/או שימוש על ידך
                        באתר מכל סוג, לרבות הסתמכות על מחירים ו/או רכישת ו/או
                        הזמנת מוצרים ו/או שירותים, מהווה את הסכמתך ואישורך לאמור
                        למדיניות הפרטיות להלן. אם אינך מסכים למדיניות הפרטיות של
                        האתר, כולה או חלקה, אינך רשאי לעשות שימוש באתר לכל מטרה
                        שהיא ולא תהיה לך כל טענה, תביעה ו/או דרישה כלפי
                        הקמעונאי.
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span
                        lang="HE"
                        style='font-family:"Arial","sans-serif"'
                      ></span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        אם הנך מתחת לגיל 18, אנא קרא את מדיניות הפרטיות בעיון
                        ובקפידה יחד עם הוריך או אפוטרופוס אחר. אם אתה או הוריך
                        אינכם מסכימים למדיניות הפרטיות כולה או חלקה, אינך רשאי
                        לעשות שימוש באתר זה לכל מטרה שהיא.
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span
                        lang="HE"
                        style='font-family:"Arial","sans-serif"'
                      ></span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        הנהלים אשר על פיהם פועל הקמעונאי באיסוף ובשימוש המידע
                        מפורטים להלן:
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          lang="HE"
                          style='font-family:"Arial","sans-serif"'
                        ></span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <strong>
                          <u>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              מידע שאנו אוספים
                            </span>
                          </u>
                        </strong>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <strong>
                        <u>
                          <span
                            lang="HE"
                            style='font-family:"Arial","sans-serif"'
                          ></span>
                        </u>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li>
              <ol>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              מדיניות הפרטיות חלה על: (א) הנתונים שתמסור כחלק
                              מתהליך ההרשמה לאתר (כדוגמת שם, מין, תאריך לידה,
                              כתובת, דרכי התקשרות שונות, לרבות טלפון ודואר
                              אלקטרוני). במידה שתירשם דרך הפייסבוק או דרך כל צד
                              שלישי אחר, תהיה לנו גישה גם לנתונים שלך הידועים
                              לצד השלישי דרכו נרשמת לאתר
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              ;
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              (ב) הנתונים המועברים על ידך בזמן השימוש באתר
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              ;
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              (ג) הנתונים הנאספים אודות הגולשים, לרבות במהלך
                              הגלישה באתר ו/או במהלך השימוש בשירותים המוצעים
                              דרכו, כגון מידע הנוגע למחשב האישי של הגולש, כתובת
                              ה-
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              IP
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              , המכשיר הנייד, מערכת ההפעלה ומיקום גיאוגרפי,
                              ו-(ד) היסטוריית החיפושים של הגולשים באתר לרבות
                              צפייה ובחירה של מוצרים ורכישתם. כל המידע המצוין
                              בסעיף זה יקרא להלן "<strong>המידע</strong>". המידע
                              (כפי שיעודכן מעת לעת) יישמר במאגר מידע המנוהל על
                              ידי סלף פוינט בע"מ מטעם הקמעונאי
                              <span style="color:#0070c0">. </span>
                              <a name="_Ref470454780">
                                אינך נדרש על-פי חוק למסור את המידע, והעברת המידע
                                על ידך לקמעונאי נעשית על אחריותך בלבד, מרצונך
                                ובהסכמתך ולא תהיה לך כל טענה ו/או תביעה כלפי
                                הקמעונאי ונציגיו. בכל עת תוכל לפנות לקמעונאי
                                בדואר אלקטרוני בכתובת:{" "}
                              </a>
                            </span>
                            <a
                              href="mailto:mikir1010@gmail.com"
                              style="color:blue; text-decoration:underline"
                            >
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              >
                                mikir1010@gmail.com
                              </span>
                            </a>
                            <span style='font-family:"Arial","sans-serif"'>
                              {" "}
                              ולבקש לעיין ו/או לתקן את המידע הנוגע אליך השמור
                              במאגר המידע. הנך מצהיר כי ידוע לך כי בלא מסירת
                              הפרטים המופיעים בשדות החובה, לא תוכל להשתמש
                              בשירותים הטעונים הרשמה. המידע שתמסור בעת ההרשמה לא
                              יימסר לצדדים שלישיים למעט כמפורט במדיניות הפרטיות
                              להלן
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              .
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              במידה והנך מזמין שירות באמצעות כרטיס אשראי באתר,
                              הנך מסכים שארבעת הספרות האחרונות של כרטיס האשראי
                              שלך, אם וככל שמסרת אותם, יאוחסנו באופן מאובטח על
                              ידי הקמעונאי.
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ol>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          dir="LTR"
                          style='font-family:"Arial","sans-serif"'
                        ></span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <strong>
                          <u>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              העברת מידע
                            </span>
                          </u>
                        </strong>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <strong>
                        <u>
                          <span
                            dir="LTR"
                            style='font-family:"Arial","sans-serif"'
                          ></span>
                        </u>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li>
              <ol>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              הנך מאשר כי ידוע לך שאנו עשויים להעביר את המידע
                              שאנו אוספים, לרבות היסטוריית הרכישות וההזמנות שלך,
                              לספקי שירותים, שותפים עסקיים, לקבלני משנה, לקבוצת
                              יוניליוור ישראל וחברות בנות של הקבוצה, לסלף פוינט
                              בע"מ ולחברות בנות שלה (להלן: "
                              <strong>צדדים שלישיים</strong>"), אשר עשויים
                              להשתמש במידע זה כדי: (1) לעזור לנו לספק לך שירותים
                              ו/או להפעיל את האתר; (2) לסייע בהבנת אופן השימוש
                              של הגולשים באתר ובשירותים שלנו; (3) לספק לך פרסום
                              ממוקד מטרה לאור העדפותיך האישיות באתר שלנו ובאתרים
                              אחרים בהם תבחר לבקר.
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              אנו עשויים להשתמש ולשלוח מידע שאנו מקבלים לקבלני
                              משנה הנמצאים במדינות שאינן מדינתך. כל קבלני המשנה
                              שלנו כפופים לחובות סודיות ואיסור שימוש במידע. עם
                              זאת, ייתכן שרמת ההגנה על המידע אינה גבוהה בחלק
                              מהמדינות כמו במקום מגוריך או עסקיך.{" "}
                            </span>
                            <u>
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              ></span>
                            </u>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              אנו עשויים להעביר את מאגרי המידע שלנו המכילים מידע
                              אם נמכור את עסקנו או חלק ממנו.
                            </span>
                            <u>
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              ></span>
                            </u>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              הקמעונאי יימנע ככל האפשר מלמסור את הנתונים שלך
                              לצדדים שלישיים נוספים, אלא במקרים בהם ימצא
                              הקמעונאי כי איזו מפעולותיך באתר מפרות את תנאי
                              השימוש, או נעשו לשם ביצוע תרמית מכל סוג שהוא, או
                              אם הוא יהיה מחויב לעשות כן על פי צו שיפוטי ו/או
                              רשות
                            </span>{" "}
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              אכיפה כלשהי (כגון רשות המיסים, משטרת ישראל, וכו')
                              ו/או על פי כל דין, או אם תעמוד בפני איום שיינקטו
                              כנגדה צעדים משפטיים (פליליים או אזרחיים) בגין
                              פעולות שביצעת באתר ו/או מסיבות אחרות. במקרים אלו
                              רשאי הקמעונאי למסור את פרטיך לצד הטוען כי נפגע ממך
                              או בהתאם להוראות צו שיפוטי ו/או רשות האכיפה, לפי
                              העניין
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              .
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              בנוסף, אנו נשתף פעולה באופן מלא עם רשויות האכיפה
                              או עם צו בית משפט הדורשים מאתנו להסגיר את זהותו/ה
                              או התנהגותו/ה של כל משתמש/ת הנחשד/ת בהתנהגות
                              בלתי-חוקית.{" "}
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ol>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          lang="HE"
                          style='font-family:"Arial","sans-serif"'
                        ></span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <strong>
                          <u>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              כיצד אנו משתמשים במידע
                            </span>
                          </u>
                        </strong>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <strong>
                        <u>
                          <span
                            dir="LTR"
                            style='font-family:"Arial","sans-serif"'
                          ></span>
                        </u>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li>
              <ol>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              הקמעונאי, כמו גם צדדים שלישיים, רשאי לנהוג במאגרי
                              המידע בהתאם להוראות הדין ולעשות במאגרי המידע
                              שימוש, לצורך שיפור האתר, השירותים והתכנים שהוא
                              מציע, וכן לצורך יצירת קשר עם הגולשים. הנך מסכים
                              ומאשר, בעצם מסירת מידע, כי הקמעונאי יהיה רשאי
                              לשמור במאגריו (או במאגר מידע המנוהל מטעמו, כאמור
                              לעיל) את הפרטים שנמסרו על-ידך ומידע נוסף שיצטבר
                              אודותיך, לשם שימוש כאמור וכמפורט להלן: (א) עשיית
                              עסקאות מכל סוג עם צדדים שלישיים
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              ;
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              (ב) צרכים מסחריים אחרים, ללא תשלום כל תמורה
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              ;
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              (ג) מענה לשאלות, יצירת קשר תיאומי מועד משלוח
                              ושליחת הודעות למשתמשים (לרבות עבור בדיקת שביעות
                              רצון מטעם שירות לקוחות); (ד) עיבוד והשלמת הזמנות,
                              משלוחים ותשלומים של משתמשים; (ה) צורכי פיתוח
                              מוצרים או שירותים חדשים, ניתוח מידע סטטיסטי (כאמור
                              בסעיף 3.3 להלן) ומסירתו לצדדים שלישיים לצורכי
                              שיפור התכנים הקיימים, פילוח וניתוחי מדיה דיגיטלית;
                              (ו) שיווק מכוון משתמש, המספק תוכן מותאם אישית
                              למשתמש, הצעות ממוקדות ופרסומות בהתאם להעדפותיו
                              האישיות, הצעות ממוקדות ופרסומות של אתרי צדדים
                              שלישיים בהם המשתמש עשוי לבקר; (ז) יצירת קשר עם
                              ידיעונים וחומרי קידום מכירות הקשורים לאתר
                              ולשירותים, ו-(ח) מניעת הונאות, הגנה על אבטחת האתר
                              והשירותים, וטיפול בכל בעיה אחרת בקשר עם האתר.
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span class="MsoHyperlink" style="color:blue">
                              <span style="text-decoration:underline">
                                <span style='font-family:"Arial","sans-serif"'>
                                  <span style="text-decoration:none"></span>
                                </span>
                              </span>
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              הקמעונאי יהיה רשאי להשתמש במידע, בין היתר, לצורך
                              דיוור מידע ותכנים אל הגולשים (באמצעות דואר
                              אלקטרוני ו/או התראות{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Push Notifications
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              ו/או הודעות טקסט לטלפון הנייד ו/או דרך הרשתות
                              החברתיות, ו/או דרך דואר ישראל), לרבות דברי פרסומת,
                              מבצעים והנחות של האתר ו/או של צדדים שלישיים.
                              מדיניות פרטיות זו מהווה הסכמתך לשליחת דברי דוא"ל
                              ופרסומות. ככל שאינך מעוניין להמשיך ולקבל דברי
                              דוא"ל אלו, הינך יכול להסיר את כתובת הדואר
                              האלקטרוני שלך בכל עת בעזרת הלינק הבא{" "}
                            </span>
                            <a
                              href="mailto:mikir1010@gmail.com"
                              style="color:blue; text-decoration:underline"
                            >
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              >
                                mikir1010@gmail.com
                              </span>
                            </a>{" "}
                            &nbsp;
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              או דרך חשבונך באתר.
                            </span>
                            <span class="MsoHyperlink" style="color:blue">
                              <span style="text-decoration:underline">
                                <span
                                  dir="LTR"
                                  style='font-family:"Arial","sans-serif"'
                                >
                                  <span style="text-decoration:none">
                                    <span style="text-underline:none"></span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              על ידי ניתוח המידע שאנו מקבלים, אנו ו/או ספקי
                              השירותים שלנו ו/או קבלני משנה עשויים לאסוף נתונים
                              סטטיסטיים ממגוון משתמשים (להלן: "
                              <strong>הנתונים הסטטיסטיים</strong>"). הנתונים
                              הסטטיסטיים עוזרים לנו לבחון מגמות וצרכי משתמש, כך
                              שנוכל לבחון מתן שירותים חדשים ולהתאים את המערכת
                              והשירותים הנלווים לרצונות המשתמש. אנו עשויים לחלוק
                              את הנתונים הסטטיסטיים עם שותפינו, בהתאם לתנאים
                              מסחריים שאנו קובעים לפי שיקול דעתנו הבלעדי. כמו
                              כן, אנו עשויים לנתח את הנתונים הסטטיסטיים באמצעות
                              תוכנות המספקות שירותי מידע וניתוח סטטיסטי כדוגמת{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Google Analytics
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              . אנו משתמשים במידע שאנו מקבלים מ{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Google Analytics
                            </span>
                            <span style='font-family:"Arial","sans-serif"'>
                              {" "}
                              לשיפור המערכת. המידע אשר{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Google Analytics
                            </span>
                            <span style='font-family:"Arial","sans-serif"'>
                              {" "}
                              אוסף לגבי שימושך במערכת הינו כפוף לתנאי השימוש
                              ומדיניות הפרטיות של{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Google Analytics
                            </span>
                            <span style='font-family:"Arial","sans-serif"'>
                              {" "}
                              להלן:
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ol>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span dir="LTR" style='font-family:"Arial","sans-serif"'>
                        http://www.google.com/analytics/terms/us.html
                      </span>
                      <span style='font-family:"Arial","sans-serif"'>
                        {" "}
                        <a
                          href="http://www.google.com/policies/privacy"
                          style="color:blue; text-decoration:underline"
                        >
                          http://www.google.com/policies/privacy
                        </a>
                        .
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        3.4 הקמעונאי אינו נושא בכל אחריות בגין שימוש במידע
                        אודותיך המתקבל שלא באמצעותו אלא על-ידי צדדים שלישיים
                        לרבות חברות ו/או מותגים של מוצרים אשר משתמשים או מופיעים
                        באתר, ואשר אינם בשליטתו של הקמעונאי.
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          lang="HE"
                          style='font-family:"Arial","sans-serif"'
                        ></span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <span style='font-family:"Arial","sans-serif"'></span>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:black">Cookies</span>
                            </span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          lang="HE"
                          style='font-family:"Arial","sans-serif"'
                        >
                          <span style="color:black"></span>
                        </span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li>
              <ol>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              הקמעונאי משתמש ב-
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Cookies
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              לצורך תפעול שוטף ותקין של האתר, ובכלל זה כדי לאסוף
                              נתונים סטטיסטיים אודות השימוש באתר, כדי להתאים את
                              האתר להעדפותיך האישיות, לצורכי אבטחת מידע ולאימות
                              פרטים.{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Cookies
                            </span>
                            <span style='font-family:"Arial","sans-serif"'>
                              {" "}
                              הם קבצי טקסט קטנים אשר מאוחסנים על ידי השרת של
                              הקמעונאי, על הכונן הקשיח של המחשב בו המשתמש משתמש
                              באמצעות הדפדפן שלו על מנת לספק למשתמש שירות מהיר
                              ויעיל ולחסוך ממנו את הצורך להזין את פרטיו האישיים
                              בכל כניסה לאתר. אנו משתמשים ב-
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Cookies
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              לצורך תפעולו של האתר, לדוגמה, כדי לשפר את ביצועי
                              האתר וכדי לתעד את כניסתך ויציאתך מהאתר. אלה הם{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Session Cookies
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              והם נמחקים בכל פעם שתסגור את הדפדפן שלך. ההגדרות
                              של כל דפדפן כוללות אפשרות שלא להסכים לקבל{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Cookies
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              ולמחוק{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              Cookies
                            </span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              {" "}
                              קיימים. יש לקחת בחשבון שפעולה כזו עלולה להקשות על
                              היכולת שלך להשתמש באתר. אם אינך יודע כיצד לעשות
                              זאת, בדוק בקובץ העזרה של הדפדפן שבו אתה משתמש.
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="tab-stops:41.35pt">
                        <span style="direction:rtl">
                          <span style="unicode-bidi:embed">
                            <span style="font-family:Calibri,sans-serif">
                              <span
                                lang="HE"
                                style='font-family:"Arial","sans-serif"'
                              >
                                הקמעונאי רשאי להתיר לחברות אחרות לנהל את מערך
                                הפרסומות באתר. יתכן שהמודעות שבהן תצפה בעת
                                הביקור באתר מגיעות ממחשביהן של אותן חברות. כדי
                                לנהל את הפרסומות שלהן, חברות אלה תהינה רשאיות
                                להציב קבצי{" "}
                              </span>
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              >
                                Cookies
                              </span>
                              <span
                                lang="HE"
                                style='font-family:"Arial","sans-serif"'
                              >
                                {" "}
                                במחשבך. ה-
                              </span>
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              >
                                Cookies
                              </span>
                              <span
                                lang="HE"
                                style='font-family:"Arial","sans-serif"'
                              >
                                {" "}
                                מאפשרים להן לאסוף מידע על האתרים שבהם צפית
                                בפרסומות שהציבו ועל אילו פרסומות הקשת. השימוש
                                שחברות אלה עושות ב-
                              </span>
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              >
                                Cookies
                              </span>
                              <span
                                lang="HE"
                                style='font-family:"Arial","sans-serif"'
                              >
                                {" "}
                                כפוף למדיניות הפרטיות שלהן ולא למדיניות הפרטיות
                                של הקמעונאי.{" "}
                              </span>
                              <span
                                dir="LTR"
                                style='font-family:"Arial","sans-serif"'
                              ></span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ol>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span
                        dir="LTR"
                        style='font-family:"Arial","sans-serif"'
                      ></span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <strong>
                          <span style='font-family:"Arial","sans-serif"'></span>
                        </strong>
                        <strong>
                          <u>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:#222222">
                                כיצד אנו מגנים על מידע
                              </span>
                            </span>
                          </u>
                        </strong>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:#222222"></span>
                            </span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          dir="LTR"
                          style='font-family:"Arial","sans-serif"'
                        >
                          <span style="color:black"></span>
                        </span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li>
              <ol>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span style='font-family:"Arial","sans-serif"'></span>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              אנו פועלים לפי הסטנדרטים המקובלים בתעשייה על מנת
                              להגן על המידע, הן בזמן מסירתו והן מרגע קבלת המידע.
                              עם זאת, מסירה באמצעות האינטרנט או אחסון אלקטרוני
                              אינם מאובטחים לחלוטין. לכן, בעוד שאנו שואפים
                              להשתמש בסטנדרטיים המסחריים המקובלים על מנת להגן על
                              המידע שלך, איננו יכולים להבטיח את אבטחתו המוחלטת
                              <span style="color:black">.</span>
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:black"></span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
                <li dir="RTL" style="text-align:justify">
                  <span style="font-size:11pt">
                    <span style="line-height:normal">
                      <span style="direction:rtl">
                        <span style="unicode-bidi:embed">
                          <span style="font-family:Calibri,sans-serif">
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              אנו נתקן ו/או נמחק כל מידע שניתן לנו על ידי משתמש
                              בהתאם לבקשה בכתב מהמשתמש לכתובת{" "}
                            </span>
                            <span style='font-family:"Arial","sans-serif"'>
                              <a
                                href="mailto:mikir1010@gmail.com"
                                style="color:blue; text-decoration:underline"
                              >
                                mikir1010@gmail.com
                              </a>{" "}
                              &nbsp;מרגע שמידע נמחק, איננו יכולים להשיבו.{" "}
                            </span>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            ></span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </li>
              </ol>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span
                        dir="LTR"
                        style='font-family:"Arial","sans-serif"'
                      ></span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <strong>
                          <span style='font-family:"Arial","sans-serif"'></span>
                        </strong>
                        <strong>
                          <u>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:#222222">שינויים</span>
                            </span>
                          </u>
                        </strong>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:#222222"></span>
                            </span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <strong>
                        <u>
                          <span
                            dir="LTR"
                            style='font-family:"Arial","sans-serif"'
                          >
                            <span style="color:#222222"></span>
                          </span>
                        </u>
                      </strong>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        <span style="color:#222222">
                          מדיניות פרטיות&nbsp;זו עודכנה לאחרונה בנובמבר 2017.
                          הקמעונאי שומר לעצמו את הזכות לעדכן את מדיניות הפרטיות
                          מעת לעת, לפי שיקול דעתו הבלעדי וללא צורך בהודעה מראש.
                          תוקפו של שינוי יחל מרגע פרסומו באתר. חובתך להתעדכן
                          במדיניות הפרטיות בכל כניסה לאתר. נוסח מדיניות
                          הפרטיות&nbsp;כפי שהוא מפורסם באתר הינו הנוסח הקובע בכל
                          עת.
                        </span>
                      </span>
                      <span dir="LTR">
                        <span style="color:#222222"></span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span dir="LTR" style='font-family:"Arial","sans-serif"'>
                        <span style="color:#222222"></span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <ol>
            <li dir="RTL" style="text-align:justify">
              <span style="font-size:11pt">
                <span style="line-height:normal">
                  <span style="direction:rtl">
                    <span style="unicode-bidi:embed">
                      <span style="font-family:Calibri,sans-serif">
                        <strong>
                          <span style='font-family:"Arial","sans-serif"'></span>
                        </strong>
                        <strong>
                          <u>
                            <span
                              lang="HE"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:#222222">הערות ושאלות</span>
                            </span>
                          </u>
                        </strong>
                        <strong>
                          <u>
                            <span
                              dir="LTR"
                              style='font-family:"Arial","sans-serif"'
                            >
                              <span style="color:#222222"></span>
                            </span>
                          </u>
                        </strong>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </li>
          </ol>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <span lang="HE" style='font-family:"Arial","sans-serif"'>
                        <span style="color:#222222">
                          אם יש לך שאלות או הערות לגבי מדיניות הפרטיות שלנו, אנא
                          צור קשר בכתובת{" "}
                        </span>
                      </span>
                      <span style='font-family:"Arial","sans-serif"'>
                        <span style="color:#222222">
                          <a
                            href="mailto:mikir1010@gmail.com"
                            style="color:blue; text-decoration:underline"
                          >
                            mikir1010@gmail.com
                          </a>{" "}
                        </span>
                      </span>
                      <span dir="LTR" style='font-family:"Arial","sans-serif"'>
                        <span style="color:#222222"></span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>

          <p dir="RTL" style="text-align:justify">
            <span style="font-size:11pt">
              <span style="line-height:normal">
                <span style="direction:rtl">
                  <span style="unicode-bidi:embed">
                    <span style="font-family:Calibri,sans-serif">
                      <u>
                        <span
                          lang="HE"
                          style='font-family:"Arial","sans-serif"'
                        ></span>
                      </u>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </p>
        </p> */}
      </Grid>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
