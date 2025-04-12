import { useContext } from "react";
import { Context } from "../main";
import { observer } from "mobx-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = observer(() => {
  const { product } = useContext(Context);

  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <button
        onClick={() => product.prevPage()}
        disabled={product.page === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 
          ${
            product.page === 1
              ? "bg-green-400 text-green-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-800"
          }`}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="text-center">
        <span className="block text-xl font-bold text-green-800">
          {product.page}
        </span>
        <span className="text-sm text-green-600">из {product.totalPages}</span>
      </div>

      <button
        onClick={() => product.nextPage()}
        disabled={product.page >= product.totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 
          ${
            product.page >= product.totalPages
              ? "bg-green-400 text-green-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-800"
          }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
});

export default Pagination;
