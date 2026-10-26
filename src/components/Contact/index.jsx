import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import HomeIcon from "../HomeIcon";
import AnimatedContent from "../AnimatedContent";

const Contact = () => {
  const { t } = useLanguage();
  const [copyState, setCopyState] = useState("idle");
  const requestRef = useRef(0);
  const pendingRef = useRef(false);
  useEffect(
    () => () => {
      requestRef.current += 1;
    },
    [],
  );

  const copyText = async (text) => {
    if (pendingRef.current) return;
    if (!navigator.clipboard?.writeText) {
      setCopyState("unavailable");
      return;
    }
    pendingRef.current = true;
    const request = ++requestRef.current;
    setCopyState("pending");
    try {
      await navigator.clipboard.writeText(text);
      if (request === requestRef.current) setCopyState("success");
    } catch {
      if (request === requestRef.current) setCopyState("error");
    } finally {
      pendingRef.current = false;
    }
  };

  return (
    <section className="page-section contact-stage-section" id="contact">
      <div className="section-shell">
        <div className="contact-stage-card">
          <AnimatedContent className="contact-stage-head">
            <span className="contact-stage-kicker">
              {t("contact.stage.kicker") || "03 / CONTACT"}
            </span>
            <h2 className="contact-stage-title">
              {t("contact.stage.title") || "联系我"}
            </h2>
            <p className="contact-stage-intro">
              {t("contact.stage.body") || "欢迎直接交流。"}
            </p>
          </AnimatedContent>

          <AnimatedContent className="contact-stage-actions">
            {/* WeChat Button */}
            <div className="contact-action-group">
              <span className="contact-action-label">
                {t("contact.stage.wechatLabel") || "Phone / WeChat"}
              </span>
              <button
                type="button"
                onClick={() => copyText("wmeng219")}
                className="contact-action-btn"
                disabled={copyState === "pending"}
                aria-describedby="wechat-copy-status"
              >
                <span>wmeng219</span>
                <HomeIcon
                  name={copyState === "success" ? "check" : "copy"}
                  className="home-icon-control"
                />
              </button>
            </div>

            {/* Email Button */}
            <div className="contact-action-group">
              <span className="contact-action-label">
                {t("contact.stage.emailLabel") || "Email"}
              </span>
              <a
                href="mailto:wmeng0219@gmail.com"
                className="contact-action-btn"
              >
                <span>wmeng0219@gmail.com</span>
                <HomeIcon name="mail" className="home-icon-control" />
              </a>
            </div>
            <p
              id="wechat-copy-status"
              role="status"
              aria-live="polite"
              className="contact-copy-status"
            >
              {copyState !== "idle" && t(`contact.copy.${copyState}`)}
            </p>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default Contact;
