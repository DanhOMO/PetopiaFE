"use client";

import { useEffect } from "react";
import gsap from "gsap";
import styles from "./IconEffect.module.css";
export default function IconEffect() {
  useEffect(() => {
    let oldX = 0,
      oldY = 0,
      deltaX = 0,
      deltaY = 0;

    const root = document.querySelector(".mwg_effect000");
    if (!root) return;

    const handleMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener("mousemove", handleMove);

    root.querySelectorAll(".media").forEach((el) => {
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
        }).to(image, { x: 0, y: 0, duration: 0.5, ease: "power2.inOut" });

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
    <section className="mwg_effect000">
      <div className="header">
        <div>
          <p className="button button1">
            <img src="/assets/medias/01.png" alt="" />
            <span>3d & stuff</span>
          </p>
        </div>
        <div>12 items saved in your collection</div>
        <div>
          <p className="button button2">Add more</p>
        </div>
      </div>

      <div className="medias">
        {Array.from({ length: 12 }, (_, i) => (
          <div className="media" key={i}>
            <img
              src={`/assets/iconAnimate/${String(i + 1).padStart(2, "0")}.gif`}
              alt=""
            />
          </div>
        ))}
      </div>
    </section>
  );
}
