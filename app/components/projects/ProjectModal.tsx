"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiLock,
  FiX,
} from "react-icons/fi";
import type { projects } from "../data/portfolio";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);
  const next = useCallback(
    (direction: number) =>
      setImageIndex(
        (index) =>
          (index + direction + project.images.length) % project.images.length,
      ),
    [project.images.length],
  );

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    if (!element) return;
    element.showModal();
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        next(-1);
      }
    };
    element.addEventListener("keydown", handleKey);
    return () => {
      element.removeEventListener("keydown", handleKey);
      element.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [next]);

  return createPortal(
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={() => closeRef.current()}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeRef.current();
      }}
    >
      <div className="project-dialog-inner">
        <button
          className="dialog-close icon-button"
          onClick={onClose}
          aria-label="Close project details"
          autoFocus
        >
          <FiX aria-hidden />
        </button>
        <div className="dialog-gallery">
          <div className="dialog-image">
            <Image
              src={project.images[imageIndex]}
              alt={`${project.title} — screenshot ${imageIndex + 1} of ${project.images.length}`}
              fill
              sizes="(max-width: 900px) 95vw, 650px"
              className="object-contain"
            />
          </div>
          <div className="dialog-gallery-controls">
            <button
              className="icon-button"
              onClick={() => next(-1)}
              aria-label="Previous screenshot"
            >
              <FiChevronLeft aria-hidden />
            </button>
            <span role="status">
              {String(imageIndex + 1).padStart(2, "0")} /{" "}
              {String(project.images.length).padStart(2, "0")}
            </span>
            <button
              className="icon-button"
              onClick={() => next(1)}
              aria-label="Next screenshot"
            >
              <FiChevronRight aria-hidden />
            </button>
          </div>
          <div className="dialog-thumbnails">
            {project.images.map((src, index) => (
              <button
                key={src}
                onClick={() => setImageIndex(index)}
                aria-label={`View screenshot ${index + 1}`}
                aria-pressed={index === imageIndex}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="dialog-details">
          <p className="eyebrow">{project.category}</p>
          <h2 id="project-title">{project.title}</h2>
          <p className="dialog-description">{project.detailedDescription}</p>
          <h3>What went into it</h3>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h3>The toolkit</h3>
          <div className="gallery-tags">
            {project.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="dialog-links">
            {project.demo ? (
              <a
                className="button-primary"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                Visit project <FiArrowUpRight aria-hidden />
              </a>
            ) : (
              <span className="private-label">
                <FiLock aria-hidden /> Private deployment
              </span>
            )}
            {project.github && (
              <a
                className="button-secondary"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub aria-hidden /> View code
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
