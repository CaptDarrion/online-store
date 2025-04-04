
import { useContext } from "react";
import { Context } from "../main";
import { observer } from "mobx-react";

const Pagination = observer(() => {
  const { product } = useContext(Context);

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => product.prevPage()}
        disabled={product.page === 1}
      >
        Назад
      </button>
      <span className="px-4 py-2">{product.page} / {product.totalPages}</span>
      <button
        onClick={() => product.nextPage()}
        disabled={product.page >= product.totalPages}
      >
        Вперед
      </button>
    </div>
  );
});

export default Pagination;
