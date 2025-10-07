export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center my-[30px]">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
