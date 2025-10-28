"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Observer,
  CustomEase,
  CustomWiggle,
  Physics2DPlugin,
  ScrollTrigger,
} from "gsap/all";

gsap.registerPlugin(
  Observer,
  CustomEase,
  CustomWiggle,
  Physics2DPlugin,
  ScrollTrigger
);

export default function PetCannon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [showBackground, setShowBackground] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideBackgroundAndInstructions = () => {
    setShowBackground(false);
    setShowInstructions(false);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set timeout to show again after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setShowBackground(true);
      setShowInstructions(true);
    }, 5000);
  };

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    class PetSlingshot {
      hero: HTMLElement;
      el: any;
      explosionMap: { [key: string]: HTMLImageElement } = {};
      explosionKeys: string[] = [];
      imageMap: { [key: string]: HTMLImageElement } = {};
      imageKeys: string[] = [];
      
      isDrawing: boolean = false;
      currentLine: SVGLineElement | null = null;
      startImage: SVGImageElement | null = null;
      circle: SVGCircleElement | null = null;
      startX: number = 0;
      startY: number = 0;
      lastDistance: number = 0;
      animationIsOk: boolean = false;
      wiggle: any;
      clamper: any;
      xSetter: any;
      ySetter: any;

      constructor(el: HTMLElement) {
        this.hero = el;
      }

      init() {
        const hero = this.hero;

        const el = {
          hand: hero.querySelector(".pet-cannon__hand"),
          instructions: hero.querySelector(".pet-cannon__instructions"),
          rock: hero.querySelector(".pet-cannon__rock"),
          drag: hero.querySelector(".pet-cannon__drag"),
          handle: hero.querySelector(".pet-cannon__handle"),
          canvas: hero.querySelector(".pet-cannon__canvas"),
          proxy: hero.querySelector(".pet-cannon__proxy"),
          preloadImages: hero.querySelectorAll(".image-preload img"),
          xplodePreloadImages: hero.querySelectorAll(".explosion-preload img")
        };
        this.el = el;

        // Load preload images for slingshot projectiles
        this.el.preloadImages?.forEach((img: HTMLImageElement) => {
          const key = img.dataset.key;
          if (key) {
            this.imageMap[key] = img;
            this.imageKeys.push(key);
          }
        });

        // Load explosion images
        this.el.xplodePreloadImages?.forEach((img: HTMLImageElement) => {
          const key = img.dataset.key;
          if (key) {
          this.explosionMap[key] = img;
          this.explosionKeys.push(key);
          }
        });

        this.animationIsOk = window.matchMedia(
          "(prefers-reduced-motion: no-preference)"
        ).matches;

        this.wiggle = CustomWiggle.create("petWiggle", { wiggles: 6 });
        this.clamper = gsap.utils.clamp(1, 100);

        if (this.el.hand) {
          this.xSetter = gsap.quickTo(this.el.hand, "x", { duration: 0.1 });
          this.ySetter = gsap.quickTo(this.el.hand, "y", { duration: 0.1 });
        }

        this.setInitialMotion();
        this.initObserver();
        this.initEvents();
        
        // Test: thêm event listener đơn giản để debug
        this.hero.addEventListener('click', (e) => {
          console.log('Hero clicked!', e);
          const rect = this.hero.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          this.createExplosion(x, y, 300);
          
          // Call the hide function from parent component
          hideBackgroundAndInstructions();
        });
      }

      setInitialMotion() {
        if (this.el.hand) {
          gsap.set(this.el.hand, { xPercent: -50, yPercent: -50 });
        }
      }

      initEvents() {
        if (!this.animationIsOk || ScrollTrigger.isTouch === 1) return;

        if (this.el.hand && this.xSetter && this.ySetter) {
          this.hero.style.cursor = "none";

          this.hero.addEventListener("mouseenter", (e: MouseEvent) => {
            gsap.set(this.el.hand, { opacity: 1 });
            const rect = this.hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.xSetter(x, x);
            this.ySetter(y, y);
          });

          this.hero.addEventListener("mouseleave", () => {
            gsap.set(this.el.hand, { opacity: 0 });
          });

          this.hero.addEventListener("mousemove", (e: MouseEvent) => {
            const rect = this.hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.xSetter(x);
            this.ySetter(y);
          });
        }
      }

      initObserver() {
        if (!this.animationIsOk) return;

        // Sử dụng proxy element hoặc fallback về hero element
        const targetElement = this.el.proxy || this.hero;

        if (ScrollTrigger.isTouch === 1) {
          Observer.create({
            target: targetElement,
            type: "touch",
            onPress: (e: any) => {
              this.createExplosion(e.x, e.y, 400);
              hideBackgroundAndInstructions();
            }
          });
        } else {
          Observer.create({
            target: targetElement,
            type: "pointer",
            onPress: (e: any) => this.startDrawing(e),
            onDrag: (e: any) => this.isDrawing && this.updateDrawing(e),
            onDragEnd: (e: any) => this.clearDrawing(),
            onRelease: (e: any) => this.clearDrawing()
          });
        }

        console.log('Observer initialized with target:', targetElement);
      }

      startDrawing(e: any) {
        this.isDrawing = true;

        if (this.el.instructions) {
          gsap.set(this.el.instructions, { opacity: 0 });
        }
        
        // Hide background and instructions when starting to draw
        hideBackgroundAndInstructions();

        // Sử dụng tọa độ từ event trực tiếp (như code mẫu)
        const rect = this.hero.getBoundingClientRect();
        this.startX = e.x - rect.left;
        this.startY = e.y - rect.top;

        if (!this.el.canvas) return;

        // Create line
        this.currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.currentLine.setAttribute("x1", this.startX.toString());
        this.currentLine.setAttribute("y1", this.startY.toString());
        this.currentLine.setAttribute("x2", this.startX.toString());
        this.currentLine.setAttribute("y2", this.startY.toString());
        this.currentLine.setAttribute("stroke", "#7B4F35");
        this.currentLine.setAttribute("stroke-width", "3");
        this.currentLine.setAttribute("stroke-dasharray", "5,5");

        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.circle.setAttribute("cx", this.startX.toString());
        this.circle.setAttribute("cy", this.startY.toString());
        this.circle.setAttribute("r", "15");
        this.circle.setAttribute("fill", "#D4A574");
        this.circle.setAttribute("stroke", "#7B4F35");
        this.circle.setAttribute("stroke-width", "2");

        // Create pet image at start point
        if (this.imageKeys.length > 0) {
          const randomKey = gsap.utils.random(this.imageKeys);
          const original = this.imageMap[randomKey];
          const clone = document.createElementNS("http://www.w3.org/2000/svg", "image");

          clone.setAttribute("x", (this.startX - 15).toString());
          clone.setAttribute("y", (this.startY - 15).toString());
          clone.setAttribute("width", "30");
          clone.setAttribute("height", "30");
          clone.setAttributeNS("http://www.w3.org/1999/xlink", "href", original.src);

          this.startImage = clone;
          this.el.canvas.appendChild(this.startImage);
        }

        this.el.canvas.appendChild(this.currentLine);
        this.el.canvas.appendChild(this.circle);

        if (this.el.drag) gsap.set(this.el.drag, { opacity: 1 });
        if (this.el.handle) gsap.set(this.el.handle, { opacity: 1 });
        if (this.el.rock) gsap.set(this.el.rock, { opacity: 0 });
      }

      updateDrawing(e: any) {
        if (!this.currentLine || !this.startImage) return;

        // Theo code mẫu: sử dụng tọa độ trực tiếp từ event
        const rect = this.hero.getBoundingClientRect();
        let cursorX = e.x - rect.left;
        let cursorY = e.y - rect.top;

        let dx = cursorX - this.startX;
        let dy = cursorY - this.startY;

        let distance = Math.sqrt(dx * dx + dy * dy);
        let shrink = (distance - 30) / distance;

        let x2 = this.startX + dx * shrink;
        let y2 = this.startY + dy * shrink;

        if (distance < 30) {
          x2 = this.startX;
          y2 = this.startY;
        }

        let angle = Math.atan2(dy, dx) * (180 / Math.PI);

        gsap.to(this.currentLine, {
          attr: { x2, y2 },
          duration: 0.1,
          ease: "none"
        });

        // Eased scale (starts fast, slows down)
        let raw = distance / 100;
        let eased = Math.pow(raw, 0.5);
        let clamped = this.clamper(eased);

        gsap.set([this.startImage, this.circle], {
          scale: clamped,
          rotation: `${angle + -45}_short`,
          transformOrigin: "center center"
        });

        // Move & rotate hand
        if (this.el.hand) {
          gsap.to(this.el.hand, {
            rotation: `${angle + -90}_short`,
            duration: 0.1,
            ease: "none"
          });
        }

        this.lastDistance = distance;
      }

      createExplosion(x: number, y: number, distance = 100) {
        const count = Math.round(gsap.utils.clamp(3, 15, distance / 20));
        const angleSpread = Math.PI * 2;
        const explosion = gsap.timeline();
        const speed = gsap.utils.mapRange(0, 500, 0.3, 1.5, distance);
        const sizeRange = gsap.utils.mapRange(0, 500, 20, 60, distance);

        for (let i = 0; i < count; i++) {
          const randomKey = gsap.utils.random(this.explosionKeys);
          const original = this.explosionMap[randomKey];
          const img = original.cloneNode(true) as HTMLImageElement;

          img.className = "explosion-img";
          img.style.position = "absolute";
          img.style.pointerEvents = "none";
          img.style.height = `${gsap.utils.random(20, sizeRange)}px`;
          img.style.left = `${x}px`;
          img.style.top = `${y}px`;
          img.style.zIndex = "4";
          img.style.transform = "translate(-50%, -50%)";

          this.hero.appendChild(img);

          const angle = Math.random() * angleSpread;
          const velocity = gsap.utils.random(500, 1500) * speed;

          explosion
            .to(img, {
                physics2D: {
                  angle: angle * (180 / Math.PI),
                  velocity: velocity,
                gravity: 3000
              },
              rotation: gsap.utils.random(-180, 180),
              duration: 1 + Math.random()
            }, 0)
            .to(img, {
                opacity: 0,
                duration: 0.2,
                ease: "power1.out",
              onComplete: () => img.remove()
            }, 1);
        }

        return explosion;
      }

      clearDrawing() {
        if (!this.isDrawing) return;
        
        this.createExplosion(this.startX, this.startY, this.lastDistance);

        if (this.el.drag) gsap.set(this.el.drag, { opacity: 0 });
        if (this.el.handle) gsap.set(this.el.handle, { opacity: 0 });
        if (this.el.rock) gsap.set(this.el.rock, { opacity: 1 });

        if (this.el.rock) {
          gsap.to(this.el.rock, {
            duration: 0.4,
            rotation: "+=30",
            ease: "petWiggle",
            onComplete: () => {
              if (this.el.rock) gsap.set(this.el.rock, { opacity: 0 });
              if (this.el.hand) gsap.set(this.el.hand, { rotation: 0, overwrite: "auto" });
              if (this.el.instructions) gsap.to(this.el.instructions, { opacity: 1 });
              if (this.el.drag) gsap.set(this.el.drag, { opacity: 1 });
            }
          });
        }

        this.isDrawing = false;

        // Clear all elements from SVG
        if (this.el.canvas) {
          this.el.canvas.innerHTML = "";
        }
        this.currentLine = null;
        this.startImage = null;
        this.circle = null;
      }
    }

    if (containerRef.current) {
      const slingshot = new PetSlingshot(containerRef.current);
      slingshot.init();
      
      // Debug: kiểm tra xem proxy element có tồn tại không
      console.log('Proxy element:', containerRef.current.querySelector('.pet-cannon__proxy'));
    }
  }, []);


  return (
    <div 
      ref={containerRef} 
      className={`w-[400px] ${showBackground ? "bg-[url('/assets/iconAnimate/cat-playing.gif')] bg-no-repeat bg-center bg-cover" : ""} h-[300px] overflow-visible relative rounded-[20px] border-[3px] border-[#7B4F35] shadow-[0_4px_15px_rgba(123,79,53,0.3)] transition-all duration-300`}
      >
      {/* Pet Love cursor */}
      <img 
        ref={handRef}
        className="pet-cannon__hand absolute w-[50px] h-[50px] opacity-0 pointer-events-none z-20 -translate-x-1/2 -translate-y-1/2"
        src="/assets/iconAnimate/pet-love.gif"
        alt="Pet Love"
      />




      {/* SVG Canvas for drawing */}
      <svg 
        ref={svgRef}
        className="pet-cannon__canvas absolute top-0 left-0 w-full h-full pointer-events-none z-[5]"
      />

      {/* Proxy for interaction */}
      <div 
        className="pet-cannon__proxy absolute top-0 left-0 w-full h-full z-[15]"
      />

      {/* Instructions */}
      {showInstructions && (
        <div 
          className="pet-cannon__instructions absolute bottom-[5px] left-1/2 -translate-x-1/2 text-white text-xs font-bold text-center z-[16] max-w-[90%] transition-opacity duration-300"
          style={{
            textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
          }}
        >
          Nhấn và Kéo để bắn thú cưng!
        </div>
      )}

      {/* Preload images for slingshot projectiles */}
      <div className="image-preload hidden">
        <img src="/assets/icon/dog1.png" data-key="dog1" alt="" />
        <img src="/assets/icon/dog2.png" data-key="dog2" alt="" />
        <img src="/assets/icon/cat1.png" data-key="cat1" alt="" />
        <img src="/assets/icon/cat2.png" data-key="cat2" alt="" />
      </div>

      {/* Preload images for explosion */}
      <div className="explosion-preload hidden">
        <img src="/assets/icon/dog3.png" data-key="dog3" alt="" />
        <img src="/assets/icon/dog4.png" data-key="dog4" alt="" />
        <img src="/assets/icon/cat3.png" data-key="cat3" alt="" />
        <img src="/assets/icon/dog5.png" data-key="pet1" alt="" />
      </div>
    </div>
  );
}
