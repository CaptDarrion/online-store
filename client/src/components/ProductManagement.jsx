import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";
import BrandService from "../services/BrandService";

const ProductManagement = observer(() => {
  const { product } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.fetchCategories();
        product.setCategories(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await ProductService.fetchProducts();
        product.setProducts(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await BrandService.fetchBrands();
        product.setBrands(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchBrands();
    fetchCategories();
    fetchProducts();
  }, [product]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", id: Date.now() }]);
  };

  const removeInfo = (id) => {
    setInfo(info.filter((i) => i.id !== id));
  };

  const changeInfo = (key, value, id) => {
    setInfo(info.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const handleSubmit = async () => {
    if (!brand || !category) {
      console.error("Виберіть бренд та категорію перед відправкою");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("img", file);
    formData.append("brandId", brand);
    formData.append("categoryId", subcategory || category);
    formData.append("info", JSON.stringify(info.length ? info : []));

    console.log("Відправлювані дані:", Object.fromEntries(formData));

    try {
      const response = await ProductService.createProduct(formData);
      console.log("Успіх:", response);

      await product.loadAllProduct();

      setName("");
      setPrice("");
      setQuantity("");
      setFile("");
      setBrand("");
      setCategory("");
      setSubcategory("");
      setInfo([]);
    } catch (e) {
      console.error("Помилка при додаванні товару:", e);
    }
  };

  const selectedCategory = product.categories.find(
    (cat) => cat.id === parseInt(category)
  );
  const subcategories = selectedCategory?.subcategories || [];

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Керування товарами
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[500px] border border-blue-600">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Створити товар
        </h3>

        <input
          type="text"
          placeholder="Назва товару"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="number"
          placeholder="Кількість"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <select
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Виберіть бренд</option>
          {product.brands.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
          value={category}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="">Виберіть категорію</option>
          {product.categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {subcategories.length > 0 && (
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            value={subcategory}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Виберіть підкатегорію</option>
            {subcategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={addInfo}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition mb-4"
        >
          Додати характеристику
        </button>

        {info.map((i) => (
          <div
            key={i.id}
            className="flex flex-col gap-2 mb-4 border p-4 rounded"
          >
            <input
              type="text"
              placeholder="Назва характеристики"
              value={i.title}
              onChange={(e) => changeInfo("title", e.target.value, i.id)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Опис характеристики"
              value={i.description}
              onChange={(e) => changeInfo("description", e.target.value, i.id)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => removeInfo(i.id)}
              className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-800 transition"
            >
              Видалити характеристику
            </button>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-800 transition"
        >
          Додати товар
        </button>
      </div>
    </div>
  );
});

export default ProductManagement;
