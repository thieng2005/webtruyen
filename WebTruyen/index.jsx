import React, { useMemo, useState } from "react";
import { UploadCloud, Search, BookOpen, ImagePlus, Plus, Filter, Star, Eye, Heart, Clock3, Tag } from "lucide-react";

const initialComics = [
  {
    id: 1,
    title: "Vùng Đất Ánh Trăng",
    author: "Thiện",
    genre: "Fantasy",
    status: "Đang ra",
    description: "Một hành trình kỳ ảo về cô bé tìm lại ký ức và ánh sáng cho vương quốc đã ngủ quên.",
    chapters: 24,
    views: "128K",
    likes: "18K",
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    updated: "2 giờ trước",
    featured: true,
  },
  {
    id: 2,
    title: "Tốc Độ Cuối Cùng",
    author: "Minh Anh",
    genre: "Action",
    status: "Hoàn thành",
    description: "Cuộc đua sinh tồn giữa những tay lái bí ẩn và một thành phố ngầm đầy cạm bẫy.",
    chapters: 56,
    views: "302K",
    likes: "41K",
    cover:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    updated: "Hôm qua",
    featured: false,
  },
  {
    id: 3,
    title: "Học Viện Bóng Tối",
    author: "Linh Chi",
    genre: "Mystery",
    status: "Đang ra",
    description: "Những bí mật bị chôn giấu trong một ngôi trường nơi mọi căn phòng đều có tiếng thì thầm.",
    chapters: 12,
    views: "74K",
    likes: "9K",
    cover:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
    updated: "1 ngày trước",
    featured: true,
  },
];

const genres = ["All", "Action", "Fantasy", "Romance", "Comedy", "Mystery", "School", "Slice of Life"];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/10 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-white/10 p-2 text-indigo-300">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ComicCard({ comic }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-indigo-500/40">
      <div className="relative h-56 overflow-hidden">
        <img
          src={comic.cover}
          alt={comic.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{comic.genre}</Badge>
          <Badge>{comic.status}</Badge>
        </div>
        {comic.featured && (
          <div className="absolute right-4 top-4 rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-white">
            Nổi bật
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white">{comic.title}</h3>
          <p className="text-sm text-slate-400">Tác giả: {comic.author}</p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-300">{comic.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4" /> {comic.chapters} chương</span>
          <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" /> {comic.views}</span>
          <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4" /> {comic.likes}</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="h-4 w-4" /> {comic.updated}</span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 rounded-2xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400">
            Đọc ngay
          </button>
          <button className="rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/5">
            Chi tiết
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ComicUploadWebsite() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [comics, setComics] = useState(initialComics);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "Fantasy",
    status: "Đang ra",
    description: "",
    chapters: "",
    cover: "",
  });

  const filteredComics = useMemo(() => {
    return comics.filter((comic) => {
      const matchesGenre = selectedGenre === "All" || comic.genre === selectedGenre;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        comic.title.toLowerCase().includes(q) ||
        comic.author.toLowerCase().includes(q) ||
        comic.description.toLowerCase().includes(q);
      return matchesGenre && matchesSearch;
    });
  }, [comics, search, selectedGenre]);

  const featuredCount = comics.filter((c) => c.featured).length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComic = {
      id: Date.now(),
      title: form.title.trim() || "Truyện mới",
      author: form.author.trim() || "Ẩn danh",
      genre: form.genre,
      status: form.status,
      description: form.description.trim() || "Chưa có mô tả.",
      chapters: Number(form.chapters) || 1,
      views: "0",
      likes: "0",
      cover:
        form.cover.trim() ||
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
      updated: "Vừa đăng",
      featured: false,
    };

    setComics((prev) => [newComic, ...prev]);
    setForm({
      title: "",
      author: "",
      genre: "Fantasy",
      status: "Đang ra",
      description: "",
      chapters: "",
      cover: "",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
                <Star className="h-4 w-4" />
                Nền tảng đăng tải truyện tranh
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Đăng truyện, quản lý chapter, và đưa tác phẩm của bạn đến người đọc.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Giao diện này có phần thêm truyện mới, bộ lọc thể loại, tìm kiếm nhanh và khu vực hiển thị truyện nổi bật.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-[420px] lg:grid-cols-1">
              <StatCard icon={BookOpen} label="Tổng truyện" value={comics.length} />
              <StatCard icon={Star} label="Truyện nổi bật" value={featuredCount} />
              <StatCard icon={Heart} label="Lượt yêu thích" value="68K" />
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/10 backdrop-blur">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Thư viện truyện</h2>
                <p className="text-sm text-slate-400">Tìm truyện theo tên, tác giả hoặc thể loại.</p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                <Filter className="h-4 w-4" />
                Bộ lọc nhanh
              </div>
            </div>

            <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm truyện..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                />
              </label>

              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
              >
                {genres.map((g) => (
                  <option key={g} value={g} className="bg-slate-900">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selectedGenre === genre
                      ? "bg-indigo-500 text-white"
                      : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredComics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>

            {filteredComics.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300">
                Không tìm thấy truyện phù hợp.
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-indigo-500/15 p-3 text-indigo-300">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Đăng truyện mới</h2>
                  <p className="text-sm text-slate-400">Thêm tiêu đề, mô tả và ảnh bìa.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Tên truyện"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
                />
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Tác giả"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                  >
                    {genres.filter((g) => g !== "All").map((g) => (
                      <option key={g} value={g} className="bg-slate-900">
                        {g}
                      </option>
                    ))}
                  </select>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                  >
                    <option className="bg-slate-900">Đang ra</option>
                    <option className="bg-slate-900">Hoàn thành</option>
                    <option className="bg-slate-900">Tạm dừng</option>
                  </select>
                </div>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Mô tả truyện"
                  rows={4}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="chapters"
                    value={form.chapters}
                    onChange={handleChange}
                    placeholder="Số chapter"
                    type="number"
                    min="1"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
                  />
                  <input
                    name="cover"
                    value={form.cover}
                    onChange={handleChange}
                    placeholder="Link ảnh bìa"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400"
                >
                  <Plus className="h-4 w-4" />
                  Đăng truyện
                </button>
              </form>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/10 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Gợi ý cấu trúc</h2>
                  <p className="text-sm text-slate-400">Dùng cho website truyện hoàn chỉnh.</p>
                </div>
                <Tag className="h-5 w-5 text-indigo-300" />
              </div>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Trang chủ: banner, truyện nổi bật, truyện mới cập nhật.</li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Trang chi tiết: ảnh bìa, chapter, bình luận.</li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Khu vực quản trị: đăng truyện, thêm chapter, sửa nội dung.</li>
              </ul>
            </div>
          </aside>
        </section>

        <footer className="pb-4 text-center text-sm text-slate-500">
          © 2026 Comic Hub — Giao diện mẫu để đăng tải truyện tranh.
        </footer>
      </div>
    </div>
  );
}
