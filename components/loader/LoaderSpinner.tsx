interface Props {
  loading: boolean;
  className?: string;
}

export default function LoaderSpinner(props: Props) {
  const { loading, className } = props;

  return (
    <>
      {loading && (
        <div
          className={`absolute inset-0 z-[5] flex h-full w-full items-center justify-center bg-white/75 ${className}`}
        >
          <div className="h-12 w-12 animate-spin rounded-full border-[6px] border-gray-300 border-t-primary" />
        </div>
      )}
    </>
  );
}
