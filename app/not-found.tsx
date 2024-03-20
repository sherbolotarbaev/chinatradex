import type { Metadata } from "next";

import Button from "@/components/ui/button";

import scss from "@/components/scss/not-found.module.scss";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <>
      <div className={scss.wrapper}>
        <div className={scss.text}>
          <h2 className={scss.title}>Что-то ищете? 🔍</h2>

          <p className={scss.desc}>
            Мы не смогли найти страницу, которую вы ищете!
          </p>

          <Button adaptive redirect="/" width={240}>
            Назад на главную страницу
          </Button>
        </div>
      </div>
    </>
  );
}
