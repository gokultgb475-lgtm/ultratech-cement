import { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Edit2, Save, X, Package, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  grade: string;
  price: number;
  stock: number;
  description: string;
}

export function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});

  useEffect(() => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const productsData = snapshot.docs.map((productDoc) => {
          const data = productDoc.data() as Partial<Product>;
          return {
            id: productDoc.id,
            name: data.name ?? 'Unnamed product',
            grade: data.grade ?? '-',
            price: typeof data.price === 'number' ? data.price : 0,
            stock: typeof data.stock === 'number' ? data.stock : 0,
            description: data.description ?? ''
          } as Product;
        });
        setProducts(productsData);
        setLoading(false);
      },
      (listenerError) => {
        console.error('Error loading products:', listenerError);
        setProducts([]);
        setError(
          listenerError.code === 'permission-denied'
            ? 'Firestore blocked access to products. Update your rules to allow reads on the products collection.'
            : 'Unable to load products from Firestore.'
        );
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const startEditing = (product: Product) => {
    setEditing(product.id);
    setEditValues(product);
  };

  const saveChanges = async () => {
    if (!editing) return;

    try {
      await updateDoc(doc(db, 'products', editing), {
        price: editValues.price,
        stock: editValues.stock,
        description: editValues.description
      });
      setEditing(null);
      setEditValues({});
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  const cancelEditing = () => {
    setEditing(null);
    setEditValues({});
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display font-bold text-3xl text-white">
        Products ({products.length})
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-[#FF4D2E]/20 border-t-[#FF4D2E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8B919D]">Loading products...</p>
        </div>
      ) : error ? (
        <div className="corp-panel p-6 border-red-500/30 bg-red-500/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-300">Products could not be loaded</p>
              <p className="text-sm text-red-200/90 mt-1">{error}</p>
            </div>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="corp-panel p-12 text-center">
          <Package className="w-12 h-12 text-[#5A6474] mx-auto mb-4" />
          <p className="text-[#8B919D]">No products found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="corp-panel p-6 hover:border-[#FF4D2E]/30 transition-all"
            >
              {editing === product.id ? (
                // Edit mode
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#5A6474] uppercase mb-2 block">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                        className="corp-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#5A6474] uppercase mb-2 block">
                        Grade
                      </label>
                      <input
                        type="text"
                        value={editValues.grade}
                        readOnly
                        className="corp-input cursor-not-allowed text-sm text-[#5A6474]"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#5A6474] uppercase mb-2 block">
                        Price per bag (₹)
                      </label>
                      <input
                        type="number"
                        value={editValues.price}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            price: parseFloat(e.target.value)
                          })
                        }
                        className="corp-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#5A6474] uppercase mb-2 block">
                        Stock (bags)
                      </label>
                      <input
                        type="number"
                        value={editValues.stock}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            stock: parseInt(e.target.value)
                          })
                        }
                        className="corp-input text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#5A6474] uppercase mb-2 block">
                      Description
                    </label>
                    <textarea
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          description: e.target.value
                        })
                      }
                      rows={3}
                      className="corp-input resize-none text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={saveChanges}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF4D2E] hover:bg-[#FF4D2E]/90 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      <Save className="w-4 h-4" /> Save Changes
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[#8B919D] rounded-lg font-medium text-sm transition-colors border border-white/10"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View mode
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display font-semibold text-lg text-white">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-[#FF4D2E]/20 text-[#FF4D2E] px-3 py-1 rounded-full font-medium">
                        {product.grade}
                      </span>
                    </div>
                    <p className="text-sm text-[#8B919D] mb-4">{product.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="corp-panel-soft p-3">
                        <p className="text-xs text-[#5A6474] uppercase mb-1">Price</p>
                        <p className="font-display font-bold text-lg text-[#FF4D2E]">
                          ₹{product.price}
                        </p>
                      </div>
                      <div className="corp-panel-soft p-3">
                        <p className="text-xs text-[#5A6474] uppercase mb-1">Stock</p>
                        <p className={`font-display font-bold text-lg ${
                          product.stock > 50 ? 'text-green-400' :
                          product.stock > 0 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {product.stock}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => startEditing(product)}
                    className="ml-6 flex-shrink-0 p-2 text-[#8B919D] hover:text-[#FF4D2E] hover:bg-[#FF4D2E]/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
