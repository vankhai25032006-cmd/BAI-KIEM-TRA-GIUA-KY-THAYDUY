'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Clock3,
  Compass,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react'

type Category = 'Món chính' | 'Món nhẹ' | 'Tráng miệng' | 'Đồ uống'

type Dish = {
  id: number
  name: string
  description: string
  price: number
  category: Category
  image: string
  popular?: boolean
}

type CartItem = Dish & { quantity: number }

const dishes: Dish[] = [
  { id: 1, name: 'Bún bò Huế đặc biệt', description: 'Thịt bò mềm, chả cua, giò heo cùng nước dùng đậm vị', price: 59000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=85', popular: true },
  { id: 2, name: 'Cơm âm phủ', description: 'Cơm trắng, thịt nướng, trứng, nem và rau củ Huế', price: 65000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85', popular: true },
  { id: 3, name: 'Bánh khoái cá kình', description: 'Vỏ bánh giòn rụm, nhân cá kình và tôm tươi', price: 49000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Bánh bèo chén', description: 'Bánh bèo mềm mịn, tôm cháy và nước mắm ngọt', price: 39000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=900&q=85', popular: true },
  { id: 5, name: 'Chè hạt sen long nhãn', description: 'Vị thanh mát, hạt sen bở mềm và long nhãn thơm', price: 29000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Trà cung đình Huế', description: 'Trà thảo mộc thanh nhẹ theo công thức cung đình', price: 25000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Mì Quảng tôm thịt', description: 'Sợi mì vàng mềm, tôm thịt rim đậm đà và bánh tráng giòn', price: 55000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=85', popular: true },
  { id: 8, name: 'Nem lụi Huế', description: 'Nem nướng thơm lừng, cuốn rau sống cùng nước lèo đặc biệt', price: 52000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Bánh nậm tôm thịt', description: 'Bánh mềm mỏng gói lá dong, nhân tôm thịt vừa vị', price: 42000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Cháo lòng Huế', description: 'Cháo nóng thơm, lòng non giòn cùng hành tiêu xanh', price: 45000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'Sữa chua nếp cẩm', description: 'Sữa chua mát lạnh kết hợp nếp cẩm dẻo thơm', price: 30000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85' },
  { id: 12, name: 'Nước mơ ngâm Huế', description: 'Vị chua ngọt thanh mát, giải nhiệt cho ngày nắng', price: 22000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
  { id: 13, name: 'Bún thịt nướng Huế', description: 'Bún tươi, thịt nướng sả, rau thơm và đậu phộng rang', price: 55000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=85' },
  { id: 14, name: 'Cơm hến', description: 'Cơm nguội, hến xào, tóp mỡ, rau sống và mắm ruốc', price: 45000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85' },
  { id: 15, name: 'Bún hến', description: 'Bún thanh mát, hến xào cay nhẹ và rau thơm xứ Huế', price: 42000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85' },
  { id: 16, name: 'Bánh canh Nam Phổ', description: 'Nước dùng sánh đỏ, tôm cua và chả cá đậm đà', price: 48000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85' },
  { id: 17, name: 'Cơm sen Huế', description: 'Cơm hấp lá sen, hạt sen, rau củ và thịt nướng', price: 69000, category: 'Món chính', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85' },
  { id: 18, name: 'Bánh ít ram', description: 'Bánh ít dẻo mềm bên trên đế ram giòn rụm', price: 39000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85' },
  { id: 19, name: 'Bánh ướt thịt nướng', description: 'Bánh ướt mềm, thịt nướng thơm và rau sống tươi', price: 49000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85' },
  { id: 20, name: 'Bánh bột lọc', description: 'Vỏ bánh trong dai, nhân tôm thịt rim đậm vị', price: 40000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85' },
  { id: 21, name: 'Bánh ram ít tôm', description: 'Tôm rim thơm, bánh dẻo và lớp ram vàng giòn', price: 43000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=900&q=85' },
  { id: 22, name: 'Gỏi mít non tôm thịt', description: 'Mít non trộn tôm thịt, rau răm và đậu phộng', price: 55000, category: 'Món nhẹ', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85' },
  { id: 23, name: 'Chè bột lọc heo quay', description: 'Chè Huế độc đáo, viên bột lọc dẻo bọc nhân mặn', price: 35000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85' },
  { id: 24, name: 'Chè đậu ván', description: 'Đậu ván bùi mềm, nước cốt dừa béo thanh', price: 28000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85' },
  { id: 25, name: 'Chè khoai tía', description: 'Khoai tía dẻo bùi, thơm nhẹ cùng nước cốt dừa', price: 28000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85' },
  { id: 26, name: 'Chè thập cẩm Huế', description: 'Nhiều loại chè Huế hòa quyện trong một ly mát lạnh', price: 32000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85' },
  { id: 27, name: 'Bánh flan cốt dừa', description: 'Flan mềm mịn, caramel thơm và cốt dừa béo', price: 30000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85' },
  { id: 33, name: 'Bánh in đậu xanh', description: 'Bánh truyền thống Huế thơm bùi, ngọt dịu', price: 26000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85' },
  { id: 34, name: 'Tàu hũ nước đường', description: 'Tàu hũ mềm mịn dùng cùng nước đường gừng', price: 26000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85' },
  { id: 35, name: 'Kem dừa non', description: 'Kem dừa mát lạnh, thêm dừa sấy giòn thơm', price: 35000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=85' },
  { id: 28, name: 'Nước đậu xanh', description: 'Đậu xanh xay mịn, ngọt dịu và thơm mát', price: 22000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
  { id: 29, name: 'Nước sâm cung đình', description: 'Thảo mộc thanh mát theo vị thuốc cung đình', price: 25000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
  { id: 30, name: 'Trà tắc mật ong', description: 'Trà thơm, tắc chua nhẹ và mật ong dịu ngọt', price: 24000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85' },
  { id: 31, name: 'Nước chanh sả', description: 'Chanh tươi, sả thơm và đá mát lạnh', price: 22000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
  { id: 32, name: 'Cà phê muối Huế', description: 'Cà phê đậm đà phủ lớp kem muối béo mịn', price: 35000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { id: 36, name: 'Trà đào cam sả', description: 'Đào ngọt thơm, cam tươi và sả thanh mát', price: 29000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85' },
  { id: 37, name: 'Nước dứa bạc hà', description: 'Dứa tươi chua ngọt cùng bạc hà mát lạnh', price: 27000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
  { id: 38, name: 'Soda chanh dây', description: 'Chanh dây thơm nồng, soda sủi mát và tươi', price: 30000, category: 'Đồ uống', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85' },
]

const categories: { label: Category | 'Tất cả'; icon: string }[] = [
  { label: 'Tất cả', icon: '✦' },
  { label: 'Món chính', icon: '♨' },
  { label: 'Món nhẹ', icon: '◌' },
  { label: 'Tráng miệng', icon: '✿' },
  { label: 'Đồ uống', icon: '◒' },
]

const money = (value: number) => new Intl.NumberFormat('vi-VN').format(value) + 'đ'

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<Category | 'Tất cả'>('Tất cả')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [delivery, setDelivery] = useState('Giao tận nơi')
  const paymentMethod = 'Thanh toán khi nhận hàng'
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const [orderStatus, setOrderStatus] = useState('Đang chuẩn bị')
  const [showHelp, setShowHelp] = useState(false)

  const filteredDishes = useMemo(() => dishes.filter((dish) => {
    const matchesCategory = activeCategory === 'Tất cả' || dish.category === activeCategory
    const term = search.toLowerCase().trim()
    return matchesCategory && (!term || `${dish.name} ${dish.description}`.toLowerCase().includes(term))
  }), [activeCategory, search])

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 && delivery === 'Giao tận nơi' ? 15000 : 0
  const total = subtotal + deliveryFee

  const addToCart = (dish: Dish) => setCart((current) => {
    const existing = current.find((item) => item.id === dish.id)
    if (existing) return current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item)
    return [...current, { ...dish, quantity: 1 }]
  })

  const changeQuantity = (id: number, change: number) => setCart((current) => current.flatMap((item) => item.id === id ? (item.quantity + change > 0 ? [{ ...item, quantity: item.quantity + change }] : []) : [item]))

  const placeOrder = () => {
    setShowCheckout(false)
    setOrderPlaced(true)
    setOrderStatus('Đang chuẩn bị')
    setCart([])
  }

  const toggleFavorite = (id: number) => {
    setFavoriteIds((current) => current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id])
  }

  const addPopularCombo = () => {
    dishes.filter((dish) => dish.popular).slice(0, 3).forEach(addToCart)
    setShowCart(true)
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#26342f]">
      <div className="border-b border-[#dce8df] bg-[#edf5ed] px-5 py-2 text-center text-xs font-medium text-[#3c6b53]">
        Miễn phí giao hàng cho đơn từ 150.000đ · Mã ưu đãi HUEXUA10 giảm 10%
      </div>
      <header className="sticky top-0 z-30 border-b border-[#e8e5dc] bg-[#fbfaf7]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 lg:px-8">
          <a href="#menu" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b65d3d] text-xl text-white shadow-sm">Q</div>
            <div className="min-w-0"><p className="font-serif text-xl font-bold leading-none tracking-normal text-[#234d3d] whitespace-nowrap">Quán Huế Xưa</p><p className="mt-1 whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-[#b65d3d]">Tinh hoa đất cố đô</p></div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#53645d] md:flex"><a className="text-[#b65d3d]" href="#menu">Thực đơn</a><a href="#story">Câu chuyện quán</a><a href="#contact">Liên hệ</a></nav>
          <button onClick={() => setShowCart(true)} className="relative flex h-11 items-center gap-2 rounded-full bg-[#234d3d] px-4 text-sm font-semibold text-white transition hover:bg-[#183c2f]" aria-label="Mở giỏ hàng"><ShoppingBag size={18} /><span className="hidden sm:inline">Giỏ hàng</span>{itemCount > 0 && <span className="absolute -right-1 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d67a55] px-1 text-[10px]">{itemCount}</span>}</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-10 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8 lg:pt-16">
        <div><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f3e4d8] px-3 py-1.5 text-xs font-bold text-[#a55539]"><Sparkles size={14} /> Hương vị được yêu thích nhất</div><h1 className="max-w-xl font-serif text-5xl font-bold leading-[1.04] tracking-tight text-[#234d3d] sm:text-6xl">Ngon như một <span className="inline-block whitespace-nowrap text-[#b65d3d]">miền nhớ.</span></h1><p className="mt-5 max-w-lg text-base leading-7 text-[#63716a]">Món Huế chuẩn vị, được nấu chậm bằng tình yêu và những nguyên liệu tươi lành mỗi ngày.</p><div className="mt-8 flex flex-wrap items-center gap-5"><a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-[#b65d3d] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#b65d3d]/20 transition hover:-translate-y-0.5">Đặt món ngay <ArrowRight size={17} /></a><div className="flex items-center gap-2 text-sm text-[#63716a]"><div className="flex -space-x-2"><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fbfaf7] bg-[#d9a88d] text-xs">☺</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fbfaf7] bg-[#9ab49f] text-xs">☺</span><span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fbfaf7] bg-[#dfc184] text-xs">���</span></div><span><strong className="text-[#234d3d]">4.9/5</strong> · 2k+ đánh giá</span></div></div></div>
        <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-5 rounded-[2.5rem] bg-[#e7eee4] rotate-3" /><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" alt="Mâm cơm Huế truyền thống" className="relative aspect-[1.12] w-full rounded-[2.2rem] object-cover shadow-2xl" /><div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl sm:-left-8"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5ed] text-[#b65d3d]"><Clock3 size={20} /></div><div><p className="text-xs text-[#718079]">Thời gian giao</p><p className="font-bold text-[#234d3d]">25–35 phút</p></div></div></div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b65d3d]">Bếp nhà Huế</p><h2 className="mt-2 font-sans text-4xl font-bold text-[#234d3d]">Thực đơn hôm nay</h2></div><div className="relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89958e]" size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm món ăn..." className="h-11 w-full rounded-full border border-[#dfe5de] bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#b65d3d] focus:ring-2 focus:ring-[#b65d3d]/10" /></div></div><div className="mb-9 flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category.label} onClick={() => setActiveCategory(category.label)} className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${activeCategory === category.label ? 'bg-[#234d3d] text-white shadow-md' : 'bg-white text-[#68766e] ring-1 ring-[#e4e8e2] hover:ring-[#b65d3d]'}`}><span>{category.icon}</span>{category.label}</button>)}</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredDishes.map((dish) => <article key={dish.id} className="group overflow-hidden rounded-2xl border border-[#e7e4da] bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#234d3d]/8"><div className="relative"><img src={dish.image} alt={dish.name} className="aspect-[1.18] w-full object-cover transition duration-500 group-hover:scale-105" />{dish.popular && <span className="absolute left-3 top-3 rounded-full bg-[#f7dfc5] px-2.5 py-1 text-[11px] font-bold text-[#a55539]">Bán chạy</span>}<button onClick={() => addToCart(dish)} className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#234d3d] shadow-lg transition hover:bg-[#b65d3d] hover:text-white" aria-label={`Thêm ${dish.name} vào giỏ`}><Plus size={19} /></button></div><div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-serif text-lg font-bold text-[#234d3d]">{dish.name}</h3><span className="shrink-0 text-sm font-bold text-[#b65d3d]">{money(dish.price)}</span></div><p className="mt-2 text-sm leading-5 text-[#7b8780]">{dish.description}</p></div></article>)}</div>{filteredDishes.length === 0 && <div className="rounded-2xl bg-white py-16 text-center text-[#718079]">Không tìm thấy món phù hợp. Hãy thử từ khóa khác nhé.</div>}</section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:grid-cols-3 lg:px-8" aria-label="Tiện ích đặt món">
        <button onClick={addPopularCombo} className="group rounded-2xl border border-[#e7e4da] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2e8] text-[#b65d3d]"><ShoppingBag size={19} /></div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#b65d3d]">Gợi ý nhanh</p>
          <h3 className="mt-1 font-bold text-[#234d3d]">Combo món bán chạy</h3>
          <p className="mt-1 text-sm text-[#718079]">Thêm 3 món được yêu thích vào giỏ chỉ với một chạm.</p>
        </button>
        <button onClick={() => setShowHelp(true)} className="group rounded-2xl border border-[#e7e4da] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf5ed] text-[#234d3d]"><MapPin size={19} /></div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#b65d3d]">Hỗ trợ đặt món</p>
          <h3 className="mt-1 font-bold text-[#234d3d]">Tư vấn giao hàng</h3>
          <p className="mt-1 text-sm text-[#718079]">Xem giờ mở cửa, khu vực giao và số hotline của quán.</p>
        </button>
        <div className="rounded-2xl border border-[#e7e4da] bg-[#234d3d] p-5 text-white">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#f7dfc5]"><Heart size={19} /></div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#f7dfc5]">Yêu thích</p>
          <h3 className="mt-1 font-bold">Món bạn đã lưu</h3>
          <p className="mt-1 text-sm text-[#c3d4c6]">{favoriteIds.length ? `${favoriteIds.length} món đang được lưu để xem lại.` : 'Bấm biểu tượng yêu thích trên món ăn để lưu lại.'}</p>
        </div>
      </section>

      <section id="story" className="border-y border-[#e7e4da] bg-[#f2f5ef] px-5 py-12"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3 lg:px-8"><div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#b65d3d]"><Truck size={21} /></div><div><h3 className="font-bold text-[#234d3d]">Giao nhanh tận nơi</h3><p className="mt-1 text-sm text-[#718079]">Nóng hổi trong 25–35 phút</p></div></div><div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#b65d3d]"><Star size={21} /></div><div><h3 className="font-bold text-[#234d3d]">Chuẩn vị Huế xưa</h3><p className="mt-1 text-sm text-[#718079]">Công thức gia truyền 3 thế hệ</p></div></div><div className="flex gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#b65d3d]"><PackageCheck size={21} /></div><div><h3 className="font-bold text-[#234d3d]">Đóng gói chỉn chu</h3><p className="mt-1 text-sm text-[#718079]">An tâm thưởng thức trọn vị</p></div></div></div></section>

      <footer id="contact" className="bg-[#234d3d] px-5 py-10 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center lg:px-8"><div><p className="font-serif text-2xl font-bold">Quán Huế Xưa</p><p className="mt-1 text-sm text-[#c3d4c6]">Đậm đà hương vị · Trọn vẹn yêu thương</p></div><div className="flex flex-wrap gap-5 text-sm text-[#c3d4c6]"><span className="flex items-center gap-2"><MapPin size={16} /> 12 Nguyễn Huệ, TP. Huế</span><span>0868 888 888</span></div></div></footer>

      {showCart && <div className="fixed inset-0 z-50"><div className="absolute inset-0 bg-[#10241c]/40 backdrop-blur-sm" onClick={() => setShowCart(false)} /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fbfaf7] shadow-2xl"><div className="flex items-center justify-between border-b border-[#e7e4da] px-5 py-5"><div><p className="text-xs font-bold uppercase tracking-widest text-[#b65d3d]">Đơn hàng của bạn</p><h2 className="mt-1 font-serif text-2xl font-bold text-[#234d3d]">Giỏ hàng ({itemCount})</h2></div><button onClick={() => setShowCart(false)} className="rounded-full p-2 text-[#718079] hover:bg-[#edf5ed]" aria-label="Đóng giỏ hàng"><X size={22} /></button></div>{cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf5ed] text-[#b65d3d]"><ShoppingBag size={28} /></div><h3 className="font-serif text-xl font-bold text-[#234d3d]">Giỏ hàng đang trống</h3><p className="mt-2 text-sm text-[#718079]">Chọn món ngon để bắt đầu đơn hàng của bạn.</p><button onClick={() => setShowCart(false)} className="mt-5 rounded-full bg-[#b65d3d] px-5 py-3 text-sm font-bold text-white">Xem thực đơn</button></div> : <><div className="flex-1 space-y-4 overflow-y-auto p-5">{cart.map((item) => <div key={item.id} className="flex gap-3 rounded-2xl bg-white p-3"><img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="truncate font-bold text-[#234d3d]">{item.name}</h3><button onClick={() => changeQuantity(item.id, -item.quantity)} className="text-[#a7b0aa]" aria-label={`Xóa ${item.name}`}><X size={15} /></button></div><p className="mt-1 text-sm font-semibold text-[#b65d3d]">{money(item.price)}</p><div className="mt-2 flex items-center gap-3"><button onClick={() => changeQuantity(item.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5ed] text-[#234d3d]"><Minus size={14} /></button><span className="w-3 text-center text-sm font-bold">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5ed] text-[#234d3d]"><Plus size={14} /></button></div></div></div>)}</div><div className="border-t border-[#e7e4da] bg-white p-5"><div className="mb-4 flex items-center justify-between text-sm"><span className="text-[#718079]">Tạm tính</span><strong>{money(subtotal)}</strong></div><div className="mb-5 flex items-center justify-between text-sm"><span className="text-[#718079]">Phí giao hàng</span><strong>{deliveryFee ? money(deliveryFee) : 'Miễn phí'}</strong></div><div className="mb-5 flex items-center justify-between border-t border-dashed border-[#dfe5de] pt-4"><span className="font-bold text-[#234d3d]">Tổng cộng</span><strong className="text-xl text-[#b65d3d]">{money(total)}</strong></div><button onClick={() => { setShowCart(false); setShowCheckout(true) }} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b65d3d] py-3.5 text-sm font-bold text-white">Tiến hành đặt món <ChevronRight size={17} /></button></div></>}</aside></div>}

      {showCheckout && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10241c]/50 p-4"><div className="w-full max-w-lg rounded-3xl bg-[#fbfaf7] p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold text-[#234d3d]">Thông tin nhận món</h2><button onClick={() => setShowCheckout(false)} aria-label="Đóng"><X size={20} /></button></div><div className="mt-6 grid gap-4"><label className="text-sm font-semibold text-[#53645d]">Họ và tên<input className="mt-2 h-12 w-full rounded-xl border border-[#dfe5de] bg-white px-4 font-normal" placeholder="Nguyễn Văn A" /></label><label className="text-sm font-semibold text-[#53645d]">Số điện thoại<input className="mt-2 h-12 w-full rounded-xl border border-[#dfe5de] bg-white px-4 font-normal" placeholder="09xx xxx xxx" /></label><div className="text-sm font-semibold text-[#53645d]"><p>Phương thức thanh toán</p><div className="mt-2 rounded-xl border border-[#b65d3d] bg-[#fff2e8] p-3 text-sm font-semibold text-[#a55539]">Thanh toán khi nhận hàng</div><p className="mt-2 text-xs font-normal text-[#718079]">Bạn thanh toán trực tiếp cho nhân viên khi nhận món.</p></div><label className="text-sm font-semibold text-[#53645d]">Ghi chú<textarea className="mt-2 min-h-20 w-full rounded-xl border border-[#dfe5de] bg-white px-4 py-3 font-normal" placeholder="Ghi chú cho quán"></textarea></label><button onClick={placeOrder} className="rounded-full bg-[#b65d3d] py-3.5 text-sm font-bold text-white">Xác nhận đặt món</button></div></div></div>}

      {showHelp && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10241c]/50 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl bg-[#fbfaf7] p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#b65d3d]">Quán Huế Xưa</p><h2 className="mt-2 font-serif text-2xl font-bold text-[#234d3d]">Thông tin đặt món</h2></div><button onClick={() => setShowHelp(false)} className="rounded-full p-2 text-[#718079] hover:bg-[#edf5ed]" aria-label="Đóng thông tin"><X size={20} /></button></div><div className="mt-6 space-y-3 text-sm text-[#53645d]"><p className="rounded-xl bg-white p-4"><strong className="text-[#234d3d]">Giờ mở cửa:</strong> 07:00 – 22:00 mỗi ngày</p><p className="rounded-xl bg-white p-4"><strong className="text-[#234d3d]">Khu vực giao:</strong> Nội thành Huế, bán kính 8 km</p><p className="rounded-xl bg-white p-4"><strong className="text-[#234d3d]">Hotline:</strong> 0868 888 888</p></div><button onClick={() => setShowHelp(false)} className="mt-6 w-full rounded-full bg-[#b65d3d] py-3.5 text-sm font-bold text-white">Đã hiểu</button></div></div>}

      {orderPlaced && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#10241c]/50 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-3xl bg-[#fbfaf7] p-8 text-center shadow-2xl"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dfeee0] text-[#3f8058]"><Check size={32} /></div><p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#b65d3d]">Đặt món thành công</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#234d3d]">Cảm ơn bạn!</h2><p className="mt-3 text-sm leading-6 text-[#718079]">Quán đã nhận được đơn hàng <strong className="text-[#234d3d]">#HX-2408</strong>. Món ngon đang được chuẩn bị. Trạng thái: <strong className="text-[#b65d3d]">{orderStatus}</strong>.</p><div className="mt-6 flex items-center justify-between rounded-2xl bg-[#edf5ed] p-4 text-left"><div><p className="text-xs text-[#718079]">Dự kiến giao</p><p className="mt-1 font-bold text-[#234d3d]">25–35 phút</p></div><Clock3 className="text-[#b65d3d]" size={24} /></div><button onClick={() => setOrderPlaced(false)} className="mt-6 w-full rounded-full bg-[#b65d3d] py-3.5 text-sm font-bold text-white">Tiếp tục xem món</button></div></div>}
    </main>
  )
}
