"use client";

import React from "react";

import { LoadSvg } from "@/public/svg";
import scss from "@/components/scss/redirect.module.scss";

export default function RedirectClient() {
  React.useEffect(() => {
    const redirectTo = decodeURIComponent(
      window?.location?.href?.split("to=")?.[1] || "/"
    );

    window?.location?.assign(redirectTo);
  }, []);

  return (
    <>
      <div className={scss.wrapper}>
        <div className={scss.box}>
          <LoadSvg className={scss.load} />

          <h2 className={scss.title}>Переадресация...</h2>
        </div>
      </div>
    </>
  );
}
