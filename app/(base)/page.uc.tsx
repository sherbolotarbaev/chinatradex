'use client';

import React from 'react';

import Button from '@/components/ui/button';

import { EditSvg } from '@/public/svg';
import scss from '@/components/scss/page.module.scss';
import Modal from '@/components/ui/modal';

export default function HomeClient() {
  const [content, setContent] = React.useState<string | undefined>();
  const [text, setText] = React.useState<string | null>(null);
  const [show, setShow] = React.useState<boolean>(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleShow = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    if (text) {
      localStorage.setItem('content', text);
      setContent(text);
    }
  }, [text]);

  React.useEffect(() => {
    const contentStorage = localStorage.getItem('content');
    setContent(contentStorage || 'Добро пожаловать 🚀');
  }, []);

  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.container}>
          <h2 className={scss.title}>
            {content}

            {!show && (
              <Button
                width={128}
                size="small"
                style="white"
                onClick={handleShow}
                icon={{
                  svg: <EditSvg />,
                  position: 'left',
                }}
              >
                изменить текст
              </Button>
            )}
          </h2>
        </div>

        <Modal open={show} handleOpen={handleShow}>
          {show && (
            <textarea onChange={handleChangeText} defaultValue={content}></textarea>
          )}
        </Modal>
      </section>
    </>
  );
}
