interface Props {
  className?: string;
  size?: number;
}

const Loading = ({ className, size = 32 }: Props) => {
  return (
    <div
      className={[
        "animate-loading rounded-full border-solid border-loading duration-300",
        className,
      ].join(" ")}
      style={{
        borderWidth: `${size / 10}px`,
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
};

export default Loading;
