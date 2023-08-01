import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const AboutWin = () => {
  const { abOpen } = useSelector((state) => state.desktop);
  const { locked, booted } = useSelector((state) => state.wallpaper);
  const [open, setOpen] = useState(
    true && import.meta.env.MODE != "development",
  );
  const [timer, setTimer] = useState(
    localStorage.getItem("closeAbout") == "true" ? 0 : 5,
  );
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const action = () => {
    setOpen(false);
    localStorage.setItem("closeAbout", true);
    dispatch({ type: "DESKABOUT", payload: false });
  };

  useEffect(() => {
    if (timer > 0 && !locked && booted) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer, locked, booted]);

  return open || abOpen ? (
    <div className="aboutApp floatTab dpShad">
      <div className="content p-6">
        <div className="text-xl font-semibold">{t("about.title")}</div>
        <p>{t("about.opensource")}</p>
        <p>
          {t("about.licensed")}&nbsp;
          <a
            target="_blank"
            href="https://t.me/RichardLostLaptop"
            rel="noreferrer"
          >
            {t("about.Creative-Commons")}
          </a>
          .
        </p>
        <p className="pl-4">
          {t("about.contact")} :&nbsp;
          <a
            target="_blank"
            href="https://twitter.com/richard_lost_PC"
            rel="noreferrer"
          >
            @richard_lost_PC
          </a>
        </p>

        <p>{t("about.notmicrosoft")}</p>
        <p>
          {t("about.alsonot")}&nbsp;
          <a
            target="_blank"
            href="https://app.pulsex.com/swap?outputCurrency=0x1bcD2aF88C9A336783E813f4eD85746608fD2971&chain=pulsechain"
            rel="noreferrer"
          >
            Ape!
          </a>
          .
        </p>
        <p>{t("about.microsoftcopywrite")}.</p>
      </div>
      <div className="okbtn px-6 py-4">
        <div data-allow={timer == 0} onClick={timer == 0 && action}>
          {t("about.understand")}{" "}
          {timer > 0 ? <span>{`( ${timer} )`}</span> : null}
        </div>
      </div>
    </div>
  ) : null;
};
