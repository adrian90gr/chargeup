import React, { useEffect } from "react";

const WidgetComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app2.weatherwidget.org/js/?id=ww_a82a43879fe97";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="ww_a82a43879fe97"
      v="1.3"
      loc="id"
      a='{"t":"responsive","lang":"es","sl_lpl":1,"ids":["wl4484"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'
    >
      Más previsiones:{" "}
      <a
        href="https://oneweather.org/es/madrid/25_days/"
        id="ww_a82a43879fe97_u"
        target="_blank"
        rel="noreferrer"
      >
        Tiempo en 25 días Madrid
      </a>
    </div>
  );
};

export default WidgetComponent;
