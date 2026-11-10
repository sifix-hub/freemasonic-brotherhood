"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery, imageSource } from "@/content/site";
import { Icon } from "./icon";

export function Gallery({ items }: { items: readonly (typeof gallery)[number][] }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const active = items[index];

  function move(direction: number) {
    setIndex((current) => (current + direction + items.length) % items.length);
  }

  return <>
    <ul className={items.length === 4 ? "gallery-grid gallery-preview" : "gallery-grid"}>
      {items.map((item, position) => <li key={item.file}>
        <button type="button" onClick={(event) => {
          trigger.current = event.currentTarget;
          setIndex(position);
          dialog.current?.showModal();
        }} aria-label={"View " + item.title}>
          <span className="gallery-picture"><Image src={imageSource(item.file)} alt={item.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1000px) 34vw, 29vw" /></span>
          <span className="gallery-caption"><span>{item.category}</span><strong>{item.title}</strong></span>
        </button>
      </li>)}
    </ul>
    <dialog className="lightbox" ref={dialog} aria-label="Lodge photograph viewer" onClose={() => trigger.current?.focus()}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}>
      <div className="lightbox-controls">
        <button type="button" aria-label="Previous photo" onClick={() => move(-1)}><Icon name="previous" /></button>
        <button type="button" aria-label="Next photo" onClick={() => move(1)}><Icon name="next" /></button>
        <button type="button" aria-label="Close photo viewer" onClick={() => dialog.current?.close()}><Icon name="close" /></button>
      </div>
      <Image className="lightbox-image" src={imageSource(active.file)} alt={active.alt} width={1200} height={800} />
      <p aria-live="polite">{active.title} · {index + 1} of {items.length}</p>
    </dialog>
  </>;
}
