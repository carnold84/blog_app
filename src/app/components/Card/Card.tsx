import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  date: string;
  description: string;
  height: string;
  isActive: boolean;
  onMouseOut: () => void;
  onMouseOver: () => void;
  title: string;
  to: string;
  width: string;
}

const Card = ({
  className,
  date,
  description,
  height,
  isActive,
  onMouseOut,
  onMouseOver,
  title,
  to,
  width,
}: Props) => {
  const [contentWidth, setContentWidth] = useState<number | undefined>(
    undefined
  );
  const elContent = useRef<HTMLAnchorElement | null>(null);

  const updateContentWidth = () => {
    if (elContent.current) {
      setContentWidth(elContent.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateContentWidth();

    window.addEventListener("resize", updateContentWidth);

    return () => {
      window.removeEventListener("resize", updateContentWidth);
    };
  }, []);

  return (
    <div
      className={classNames(
        "flex h-full cursor-pointer flex-col justify-end gap-2 overflow-hidden p-3 transition-all duration-500",
        className
      )}
      style={{ height, width }}
    >
      <Link
        className="group relative h-full w-full overflow-hidden border border-solid border-neutral-100 bg-neutral-50"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        ref={elContent}
        to={to}
      >
        <div
          className="relative h-full overflow-hidden"
          style={{ width: contentWidth ? `${contentWidth}px` : undefined }}
        >
          <div className="absolute left-0 top-0 w-full origin-top-left">
            <div className="relative w-full">
              <h2
                className={classNames(
                  "mb-4 line-clamp-3 w-full origin-top-left px-10 pt-10 text-2xl transition-all duration-500",
                  {
                    "scale-75 text-text-200": !isActive,
                    "scale-100 text-text-500": isActive,
                  }
                )}
              >
                {title}
              </h2>
            </div>
            <p
              className={classNames(
                "line-clamp-4 origin-top-left px-10 text-lg text-text-300 transition-all delay-100 duration-500",
                {
                  "translate-y-10 text-base opacity-0": !isActive,
                  "translate-y-0 text-2xl opacity-100": isActive,
                }
              )}
            >
              {description}
            </p>
          </div>
          <p
            className={classNames(
              "absolute origin-top-left p-10 text-lg transition-all delay-100 duration-500",
              {
                "-bottom-10 text-neutral-200 opacity-0": !isActive,
                "bottom-0 text-text-300 opacity-100": isActive,
              }
            )}
          >
            {Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
            }).format(new Date(date))}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
