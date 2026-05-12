import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductDetailPage.css';
import ProductService from '../../services/ProductService';

function formatPrice(price) {
    return price ? price.toLocaleString('vi-VN') + ' ₫' : '0 ₫';
}

function AuthorAvatar({ name }) {
    if (!name) return null;
    const initials = name
        .split(' ')
        .slice(-2)
        .map((w) => w[0].toUpperCase())
        .join('');
    return <div className="pd-author-avatar">{initials}</div>;
}

function ProductDetailPage() {
    const { slug } = useParams(); // Lấy slug từ URL (Route: /product/:slug)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState('desc');
    const [wishlisted, setWishlisted] = useState(false);

    // Fetch dữ liệu từ API khi slug thay đổi
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await ProductService.getProductBySlug(slug);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Không tìm thấy sản phẩm này.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchProduct();
    }, [slug]);

    const changeQty = (delta) => {
        if (!product) return;
        setQty((prev) => Math.max(1, Math.min(product.quantity, prev + delta)));
    };

    if (loading) return <div className="pd-loading">Đang tải sản phẩm...</div>;
    if (error || !product) return <div className="pd-error">{error || "Sản phẩm không tồn tại"}</div>;

    const stockStatus = product.quantity <= 10 ? 'low' : 'ok';

    return (
        <div className="pd-page">
            {/* Breadcrumb */}
            <nav className="pd-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span className="pd-breadcrumb-sep">›</span>
                <Link to="/marketplace">{product.categoryname}</Link>
                <span className="pd-breadcrumb-sep">›</span>
                <span>{product.productname}</span>
            </nav>

            <div className="pd-grid">
                {/* ── Cột ảnh ── */}
                <div className="pd-img-col">
                    <div className="pd-img-frame">
                        {product.imageurl ? (
                            <img src={product.imageurl} alt={product.productname} className="pd-img" />
                        ) : (
                            <div className="pd-img-placeholder">
                                
                                <span>Chưa có ảnh</span>
                            </div>
                        )}
                    </div>
                    <span className="pd-badge-cat">{product.categoryname}</span>
                </div>

                {/* ── Cột thông tin ── */}
                <div className="pd-info-col">
                    <p className="pd-eyebrow">{product.categoryname}</p>
                    <h1 className="pd-title">{product.productname}</h1>

                    {/* Xử lý hiển thị Tác giả (Nếu API trả về mảng hoặc string) */}
                    {product.authors && Array.isArray(product.authors) ? (
                        product.authors.map((author) => (
                            <div key={author.name} className="pd-author-row">
                                <AuthorAvatar name={author.name} />
                                <div>
                                    <span className="pd-author-name">{author.name}</span>
                                    <span className="pd-author-role"> · Tác giả</span>
                                </div>
                            </div>
                        ))
                    ) : (
                         <div className="pd-author-row">
                            <div className="pd-author-avatar">TG</div>
                            <span className="pd-author-name">Đang cập nhật tác giả</span>
                         </div>
                    )}

                    <hr className="pd-divider" />

                    {/* Giá + tồn kho */}
                    <div className="pd-price-row">
                        <span className="pd-price">{formatPrice(product.price)}</span>
                        <span className={`pd-stock-badge ${stockStatus}`}>
                            {product.quantity > 0 ? `Còn ${product.quantity} quyển` : 'Hết hàng'}
                        </span>
                    </div>

                    {/* Tabs */}
                    <div className="pd-tabs">
                        <button
                            className={`pd-tab ${activeTab === 'desc' ? 'active' : ''}`}
                            onClick={() => setActiveTab('desc')}
                        >
                            Mô tả
                        </button>
                        <button
                            className={`pd-tab ${activeTab === 'detail' ? 'active' : ''}`}
                            onClick={() => setActiveTab('detail')}
                        >
                            Chi tiết
                        </button>
                    </div>

                    {activeTab === 'desc' && (
                        <p className="pd-desc">{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
                    )}

                    {activeTab === 'detail' && (
                        <div className="pd-meta-grid">
                            <div className="pd-meta-item">
                                <p className="pd-meta-label">ISBN</p>
                                <p className="pd-meta-val">{product.isbn || '—'}</p>
                            </div>
                            <div className="pd-meta-item">
                                <p className="pd-meta-label">Thể loại</p>
                                <p className="pd-meta-val">{product.categoryname}</p>
                            </div>
                            <div className="pd-meta-item">
                                <p className="pd-meta-label">Đã bán</p>
                                <p className="pd-meta-val">
                                    {(product.soldcount || 0).toLocaleString('vi-VN')} quyển
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Số lượng */}
                    <div className="pd-qty-row">
                        <span className="pd-qty-label">Số lượng</span>
                        <div className="pd-qty-ctrl">
                            <button
                                className="pd-qty-btn"
                                onClick={() => changeQty(-1)}
                                disabled={qty <= 1 || product.quantity === 0}
                            >
                                −
                            </button>
                            <div className="pd-qty-num">{qty}</div>
                            <button
                                className="pd-qty-btn"
                                onClick={() => changeQty(1)}
                                disabled={qty >= product.quantity || product.quantity === 0}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="pd-btn-row">
                        <button className="pd-btn-primary" disabled={product.quantity === 0}>
                            {product.quantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;