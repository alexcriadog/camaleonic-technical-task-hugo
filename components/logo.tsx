import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function Logo({
  href = "/",
  className = "",
  imageClassName = "h-14 w-auto md:h-18",
  priority = false,
}: LogoProps) {
  const logoImage = (
    <Image
      src="/logofull.png"
      alt="Camaleonic Analytics"
      width={200}
      height={80}
      className={imageClassName}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link href={href} className={`flex items-center ${className}`}>
        {logoImage}
      </Link>
    );
  }

  return <div className={`flex items-center ${className}`}>{logoImage}</div>;
}
