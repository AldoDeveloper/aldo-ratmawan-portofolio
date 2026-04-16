import {
  BsBell,
  BsEject,
  BsGear,
  BsInfoCircle,
  BsSearch,
} from "react-icons/bs";

export const Navbar: React.FC = () => {
  return (
    <div className="w-full h-[65px] flex items-center px-5 bg-white border-b border-b-gray-200 sticky top-0">
      <div className="w-full flex justify-between items-center">
        <div className="flex space-x-3 items-center">
          <BsEject size={22} className="fill-gray-600" />
          <label className="relative w-auto md:w-[300px]">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <BsSearch size={18} className="fill-gray-400" />
            </span>
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="px-2 py-1 flex justify-center text-[12px] font-semibold rounded-lg border border-gray-200 bg-gray-100 text-gray-700">
                90K
              </div>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 transition-all duration-200 outline-none focus:border-none focus:outline-blue-400 border border-gray-300 rounded-lg px-3 py-2"
            />
          </label>
        </div>

        <div className="flex space-x-5 items-center">
          <BsInfoCircle className="w-4 h-4 fill-gray-600" strokeWidth={0.3} />
          <BsGear className="w-4 h-4 fill-gray-600" strokeWidth={0.3} />
          <BsBell className="w-4 h-4 fill-gray-600" strokeWidth={0.3} />
          <div className="w-10 h-10 rounded-full flex justify-center text-gray-600 font-semibold items-center bg-gray-200 shadow">
            AR
          </div>
        </div>
      </div>
    </div>
  );
};