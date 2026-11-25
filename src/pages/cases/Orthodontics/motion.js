import { useLayoutEffect } from "react";
import gsap from "gsap";

// Use the homepage's GSAP runtime, scoped to this case. CSS stays visible by
// default; missing observers and reduced motion leave a fully readable page.
export function useCaseMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const completed = new WeakSet();
    let release = () => {};

    const update = () => {
      release();
      release = () => {};
      if (preference.matches) return;
      const nodes = [...root.querySelectorAll("[data-case-motion]")].filter(
        (node) => !completed.has(node),
      );
      const targets = (node) =>
        node.dataset.caseMotion === "roles" ? [...node.children] : node;
      const distance = (node) =>
        node.dataset.caseMotion === "heading"
          ? 16
          : node.dataset.caseMotion === "roles"
            ? 0
            : 10;
      const context = gsap.context(() => {
        nodes.forEach((node) =>
          gsap.set(targets(node), { opacity: 0, y: distance(node) }),
        );
      }, root);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting || completed.has(target)) return;
            completed.add(target);
            observer.unobserve(target);
            context.add(() => {
              gsap.to(targets(target), {
                opacity: 1,
                y: 0,
                duration: target.dataset.caseMotion === "image" ? 0.55 : 0.45,
                ease: "power2.out",
                ...(target.dataset.caseMotion === "roles"
                  ? { stagger: 0.12 }
                  : {}),
                clearProps: "opacity,transform",
              });
            });
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px -24px 0px" },
      );
      nodes.forEach((node) => observer.observe(node));
      release = () => {
        observer.disconnect();
        context.revert();
      };
    };

    update();
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      release();
    };
  }, [rootRef]);
}
