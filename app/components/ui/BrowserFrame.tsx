import Image from "next/image";

export default function BrowserFrame({
  src,
  alt,
  url,
  sizes,
  preload = false,
  className = "",
  style,
}: {
  src: string;
  alt: string;
  url?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`browser ${className}`} style={style}>
      <div className="browser-bar" aria-hidden>
        <i />
        <i />
        <i />
        {url ? <span>{url}</span> : null}
      </div>
      <div className="browser-view">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} />
      </div>
    </div>
  );
}
