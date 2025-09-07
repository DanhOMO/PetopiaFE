"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./IconEffect.module.css";

export default function IconEffect() {
  useEffect(() => {

    let oldX = 0,
      oldY = 0,
      deltaX = 0,
      deltaY = 0;

    const root = document.querySelector(`.${styles.mwg_effect000}`);
    if (!root) return;

    const handleMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      deltaX = mouseEvent.clientX - oldX;
      deltaY = mouseEvent.clientY - oldY;
      oldX = mouseEvent.clientX;
      oldY = mouseEvent.clientY;
    };

    root.addEventListener("mousemove", handleMove);

    root.querySelectorAll(`.${styles.media}`).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill();
          },
        });
        tl.timeScale(1.2);

        const image = el.querySelector("img");
        if (!image) return;

        tl.to(image, {
          x: deltaX * 2,
          y: deltaY * 2,
          duration: 0.3,
          ease: "power2.out",
        }).to(image, { 
          x: 0, 
          y: 0, 
          duration: 0.5, 
          ease: "power2.inOut" 
        });

        tl.fromTo(
          image,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      });
    });

    return () => {
      root.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <section className={styles.mwg_effect000}>
    

      <div className={styles.medias}>
        {[
          "cat.gif",
          "clinic.gif",
          "dog.gif",
          "paw-print.gif",
          "pet-care.gif",
          "pet-love.gif",
          "veterinary.gif",
          "cat.gif",
          "dog.gif",
          "clinic.gif",
          "pet-care.gif",
          "paw-print.gif"
        ].map((filename, i) => (
          <div className={styles.media} key={i}>
            <Image
              src={`/assets/iconAnimate/${filename}`}
              alt={filename.replace('.gif', '')}
              width={200}
              height={200}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}