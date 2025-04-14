import { useState } from "react";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Як доглядати за рослинами",
      description:
        "Докладний посібник з догляду за різними видами рослин в домашніх умовах.",
      fullText:
        "Повний текст статті про те, як правильно доглядати за рослинами, включаючи полив, освітлення, пересадку та добрива. Цей матеріал допоможе вам зберегти здоров'я ваших рослин у будь-яку пору року.",
      date: "2025-03-01",
      category: "Догляд за рослинами",
    },
    {
      id: 2,
      title: "5 найкращих рослин для вашого дому",
      description:
        "Які рослини не лише прикрасять ваш інтер'єр, але й покращать якість повітря в домі.",
      fullText:
        "Повний текст статті про п'ять найпопулярніших рослин для дому, які мають не лише декоративні властивості, а й очищують повітря, роблячи його більш свіжим і чистим.",
      date: "2025-02-25",
      category: "Декор",
    },
  ];

  const [activeBlogId, setActiveBlogId] = useState(null);

  const toggleFullText = (id) => {
    setActiveBlogId(activeBlogId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
        Наш блог
      </h1>

      {/* Фільтр за категоріями */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Категорії</h2>
        <select className="w-full p-3 border border-gray-300 rounded">
          <option value="">Усі категорії</option>
          <option value="Догляд за рослинами">Догляд за рослинами</option>
          <option value="Декор">Декор</option>
          {/* Додайте інші категорії */}
        </select>
      </div>

      {/* Список блогів */}
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-2">{blog.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              Категорія: {blog.category}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Дата публікації: {blog.date}
            </p>

            {/* Показ повного тексту блогу, якщо вибрано */}
            {activeBlogId === blog.id && (
              <p className="text-gray-700 mb-4">{blog.fullText}</p>
            )}

            <button
              onClick={() => toggleFullText(blog.id)}
              className="text-blue-600 hover:underline"
            >
              {activeBlogId === blog.id ? "Сховати" : "Читати далі"}
            </button>
          </div>
        ))}
      </div>

      {/* Кнопка для додавання нового блогу */}
      <div className="text-center mt-8">
        <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
          Написати новий блог
        </button>
      </div>
    </div>
  );
};

export default Blog;
