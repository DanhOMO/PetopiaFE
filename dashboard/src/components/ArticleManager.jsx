import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ArticleManager() {
  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    articleId: "",
    title: "",
    content: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const seedFakeData = () => {
    const today = new Date();
    const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
    const makeDate = (offsetDays) => {
      const d = new Date(today);
      d.setDate(d.getDate() - offsetDays);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T12:00:00Z`;
    };
    const base = [
      {
        articleId: "A001",
        title: "Mẹo chăm sóc thú cưng vào mùa mưa",
        content: "Giữ ấm, sấy khô lông sau khi đi mưa và bổ sung dinh dưỡng...",
        imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800",
        createdAt: makeDate(1),
      },
      {
        articleId: "A002",
        title: "Top 5 loại thức ăn cho chó con",
        content: "Danh sách các loại thức ăn phù hợp với chó con, giàu dinh dưỡng...",
        imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800",
        createdAt: makeDate(3),
      },
      {
        articleId: "A003",
        title: "Cách tắm cho mèo không sợ nước",
        content: "Chuẩn bị nước ấm, nhẹ nhàng trấn an, dùng sữa tắm chuyên dụng...",
        imageUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800",
        createdAt: makeDate(5),
      },
      {
        articleId: "A004",
        title: "Dấu hiệu nhận biết thú cưng bị cảm lạnh",
        content: "Hắt hơi, mệt mỏi, bỏ ăn... hãy đưa đến bác sĩ khi kéo dài",
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800",
        createdAt: makeDate(7),
      },
      {
        articleId: "A005",
        title: "Lịch tiêm phòng cơ bản cho chó mèo",
        content: "Parvo, Care, dại... lịch tiêm phòng và nhắc lịch định kỳ",
        imageUrl: "https://images.unsplash.com/photo-1548199973-6c1c6c2a1f36?q=80&w=800",
        createdAt: makeDate(9),
      },
      {
        articleId: "A006",
        title: "Chọn chuồng phù hợp cho thú cưng",
        content: "Kích thước, chất liệu, vị trí đặt chuồng trong nhà...",
        imageUrl: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=800",
        createdAt: makeDate(11),
      },
      {
        articleId: "A007",
        title: "Cắt tỉa lông an toàn tại nhà",
        content: "Dụng cụ cần thiết, lưu ý an toàn và quy trình cơ bản",
        imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=800",
        createdAt: makeDate(13),
      },
      {
        articleId: "A008",
        title: "Dinh dưỡng cho mèo trưởng thành",
        content: "Protein, chất béo, vitamin và nước uống sạch...",
        imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=800",
        createdAt: makeDate(15),
      },
      {
        articleId: "A009",
        title: "Huấn luyện chó ngồi, nằm, ở lại",
        content: "Các bước cơ bản và phần thưởng khích lệ",
        imageUrl: "https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=800",
        createdAt: makeDate(17),
      },
      {
        articleId: "A010",
        title: "Chăm sóc răng miệng cho thú cưng",
        content: "Bàn chải chuyên dụng, gel đánh răng và đồ nhai làm sạch",
        imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800",
        createdAt: makeDate(19),
      },
      {
        articleId: "A011",
        title: "Kiểm soát ve rận hiệu quả",
        content: "Vệ sinh ổ nằm, tắm thuốc và nhỏ gáy định kỳ",
        imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=800",
        createdAt: makeDate(21),
      },
      {
        articleId: "A012",
        title: "Dấu hiệu thú cưng bị stress",
        content: "Trốn tránh, cào cắn đồ đạc, thay đổi thói quen ăn ngủ",
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800",
        createdAt: makeDate(23),
      },
    ];
    return base;
  };

  const [allCommentsByArticle] = useState(() => ({
    A001: [
      { commentId: "C001", userName: "Minh", content: "Bài viết hữu ích!" },
      { commentId: "C002", userName: "Lan", content: "Áp dụng mùa mưa rất tốt." },
    ],
    A002: [{ commentId: "C003", userName: "Huy", content: "Mình thích loại số 3." }],
  }));

  const updateDerivedArticles = (p = 0, kw = keyword, list = allArticles) => {
    const filtered = (list || [])
      .filter((a) =>
        kw.trim()
          ? `${a.title} ${a.content}`.toLowerCase().includes(kw.toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const newTotalPages = Math.max(1, Math.ceil(filtered.length / size));
    const safePage = Math.min(Math.max(0, p), newTotalPages - 1);
    const start = safePage * size;
    const pageItems = filtered.slice(start, start + size);

    setArticles(pageItems);
    setTotalPages(newTotalPages);
    setPage(safePage);
  };

  useEffect(() => {
    const seeded = seedFakeData();
    setAllArticles(seeded);
    updateDerivedArticles(0, "", seeded);
  }, []);

  useEffect(() => {
    updateDerivedArticles(0, keyword, allArticles);
  }, [keyword, allArticles]);

  const fetchArticles = (p = page) => {
    updateDerivedArticles(p, keyword, allArticles);
  };

  const fetchArticleDetail = async (id) => {
    try {
      setLoading(true);
      setTimeout(() => {
        const found = allArticles.find((a) => a.articleId === id) || null;
        setSelectedArticle(found);
        setComments(allCommentsByArticle[id] || []);
        setShowDetail(true);
        setLoading(false);
      }, 250);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const openModal = async (article = null) => {
    if (article?.articleId) {
      setForm({
        articleId: article.articleId,
        title: article.title || "",
        content: article.content || "",
        imageUrl: article.imageUrl || "",
      });
    } else {
      setForm({ articleId: "", title: "", content: "", imageUrl: "" });
      setImageFile(null);
    }
    setShowModal(true);
  };

  const uploadImage = async (file) => {
    if (!file) return "";
    try {
      const url = URL.createObjectURL(file);
      return url;
    } catch (err) {
      console.error(err);
      toast.error("Tải ảnh lên thất bại!");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Tiêu đề không được để trống!");

    setSubmitting(true);
    try {
      let uploadedUrl = form.imageUrl;
      if (imageFile) {
        uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) throw new Error("Không thể upload ảnh!");
      }

      if (form.articleId) {
        const updated = allArticles.map((a) =>
          a.articleId === form.articleId
            ? { ...a, title: form.title, content: form.content, imageUrl: uploadedUrl }
            : a
        );
        setAllArticles(updated);
        updateDerivedArticles(page, keyword, updated);
        toast.success("Cập nhật bài viết thành công!");
      } else {
        const newIdNum = allArticles.length + 1;
        const newId = `A${String(newIdNum).padStart(3, "0")}`;
        const nowIso = new Date().toISOString();
        const next = [
          ...allArticles,
          { articleId: newId, title: form.title, content: form.content, imageUrl: uploadedUrl, createdAt: nowIso },
        ];
        setAllArticles(next);
        updateDerivedArticles(0, keyword, next);
        toast.success("Thêm bài viết thành công!");
      }

      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Không thể lưu bài viết!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xác nhận xóa bài viết này?")) return;
    const next = allArticles.filter((a) => a.articleId !== id);
    setAllArticles(next);
    updateDerivedArticles(page, keyword, next);
    toast.success("Đã xóa bài viết!");
  };

  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen p-6 font-sans">
      <Toaster position="top-right" />

      <div className="bg-white shadow-md rounded-xl px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Quản Lý Bài Viết</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
          >
            + Thêm Bài Viết
          </button>
        </div>
      </div>

      {!showDetail && (
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Mã bài viết</th>
                <th className="px-4 py-3 text-left">Tiêu đề</th>
                <th className="px-4 py-3 text-left">Ảnh minh họa</th>
                <th className="px-4 py-3 text-left">Ngày tạo</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.articleId} className="border-b hover:bg-indigo-50 transition duration-150">
                  <td className="px-4 py-3">{a.articleId}</td>
                  <td
                    className="px-4 py-3 font-medium cursor-pointer hover:text-indigo-600"
                    onClick={() => fetchArticleDetail(a.articleId)}
                    title="Xem chi tiết"
                  >
                    {a.title}
                  </td>
                  <td className="px-4 py-3">
                    {a.imageUrl ? (
                      <img src={a.imageUrl} alt={a.title} className="w-16 h-16 object-cover rounded-lg border" />
                    ) : (
                      <span className="text-gray-400 italic">Không có ảnh</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{a.createdAt?.split("T")[0] || "—"}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button onClick={() => openModal(a)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                      Sửa
                    </button>
                    <button onClick={() => handleDelete(a.articleId)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    Không có bài viết.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center items-center py-4 gap-2">
            <button onClick={() => fetchArticles(page - 1)} disabled={page === 0} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
              ← Trước
            </button>
            <span>
              Trang {page + 1}/{totalPages}
            </span>
            <button onClick={() => fetchArticles(page + 1)} disabled={page + 1 >= totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
              Sau →
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl animate-slideIn">
            <h2 className="text-2xl font-bold text-indigo-600 mb-5">{form.articleId ? "Sửa Bài Viết" : "Thêm Bài Viết"}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Tiêu đề *</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Nội dung</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows="4"
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-indigo-500"
                ></textarea>
              </div>
              <div>
                <label className="block font-semibold mb-1">Ảnh minh họa</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-indigo-500"
                />
                {(imageFile || form.imageUrl) && (
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : form.imageUrl}
                    alt="preview"
                    className="mt-3 h-40 w-full object-cover rounded-lg border"
                  />
                )}
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
                  Hủy
                </button>
                <button type="submit" disabled={submitting} className="bg-gradient-to-r from-emerald-500 to-cyan-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:scale-105 disabled:opacity-60">
                  {submitting ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetail && selectedArticle && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
            <button onClick={() => setShowDetail(false)} className="text-indigo-600 font-semibold hover:underline mb-4">
              ← Quay lại
            </button>

            {loading ? (
              <p className="text-gray-500">Đang tải chi tiết...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-indigo-600 mb-2">{selectedArticle.title}</h2>
                <p className="text-gray-500 text-sm mb-4">Ngày tạo: {selectedArticle.createdAt?.split("T")[0]}</p>
                {selectedArticle.imageUrl && (
                  <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="rounded-lg w-full max-h-96 object-cover mb-4" />
                )}
                <p className="text-gray-700 mb-4 whitespace-pre-line">{selectedArticle.content}</p>

                <h3 className="text-lg font-semibold text-indigo-600 mb-2">💬 Bình luận:</h3>
                <ul className="space-y-2">
                  {comments.length > 0 ? (
                    comments.map((c) => (
                      <li key={c.commentId} className="border p-2 rounded-lg">
                        <b>{c.userName || "Ẩn danh"}:</b> <span>{c.content}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
          @keyframes slideIn { 
            from { transform: translateY(-40px); opacity: 0; } 
            to { transform: translateY(0); opacity: 1; } 
          }
          .animate-slideIn { animation: slideIn 0.3s ease; }
        `}</style>
    </div>
  );
}


