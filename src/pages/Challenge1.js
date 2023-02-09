import React from "react";

const Challenge1 = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-4">
        <form className="flex gap-4 justify-center">
          <input
            className="w-3/5 border px-4 py-2"
            type="text"
            placeholder="Please type your phone number with area code (E.g: +8412345689)"
            onChange={(e) => console.log(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white w-[200px] h-[60px]"
            type="submit"
          >
            Get verify code
          </button>
        </form>
        <form className="flex gap-4 justify-center">
          <input
            className="w-3/5 border px-4 py-2"
            type="text"
            placeholder="Please type verify code"
            onChange={(e) => console.log(e.target.value)}
          />
          <button
            className="bg-red-500 text-white w-[200px] h-[60px]"
            type="submit"
          >
            Verify phone number
          </button>
        </form>
      </div>
    </div>
  );
};

export default Challenge1;
