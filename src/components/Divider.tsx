/**
 * A divider component with text in the middle.
 */
export function Divider() {
  return (
    <div className="mt-4 flex justify-center items-center">
      <hr className="flex-grow border-t-2 border-gray-300" />
      <span className="mx-4 text-gray-800 font-semibold select-none">or</span>
      <hr className="flex-grow border-t-2 border-gray-300" />
    </div>
  );
}
