import { useEffect, useState } from "react";
import BrandService from "../services/BrandService";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await BrandService.fetchBrands();
        setBrands(response.data);
        setLoading(false);
      } catch (e) {
        setError("Не вдалося завантажити бренди", e);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-6">
        Усі Бренди
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Ласкаво просимо на сторінку брендів магазину{" "}
        <span className="font-semibold text-green-600">Nature`s Prophet</span>!
        Ми зібрали для вас найкращі бренди, що пропонують товари для дому та
        саду. У нас ви знайдете широкий вибір продукції від надійних виробників,
        які піклуються про якість, довговічність та екологічність своїх товарів.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        У <span className="font-semibold text-green-600">Nature`s Prophet</span>{" "}
        ми віримо, що кожен дім заслуговує на затишок, а сад — на процвітання.
        Наші бренди допомагають втілити ці ідеї в життя, пропонуючи продукцію
        від перевірених постачальників. Ви можете обрати товари від відомих
        виробників або відкрити для себе нові, перспективні бренди. Усі
        представлені бренди ретельно відібрані та відповідають високим
        стандартам якості.
      </p>

      {loading && <p className="text-center text-gray-500">Завантаження...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.length > 0 ? (
          brands
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((brand) => (
              <div
                key={brand.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {brand.name}
                </h2>
              </div>
            ))
        ) : (
          <p className="text-center text-gray-500">
            Немає брендів для відображення.
          </p>
        )}
      </div>

      <p className="text-lg text-gray-700 mt-8">
        Слідкуйте за оновленнями, адже ми постійно розширюємо асортимент!
      </p>
      <p className="text-lg text-gray-700 mt-8">
        Якщо у вас є запитання щодо брендів або ви хочете запропонувати
        співпрацю, зв&apos;яжіться з нами електронною поштою:{" "}
        <a href="mailto:support@naturesprophet.com" className="text-green-600">
          gamer.woke@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default BrandsPage;
