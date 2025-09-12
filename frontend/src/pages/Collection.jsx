import React, { useEffect, useState, useContext } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';

function Collection() {
  let [showFilter, setShowFilter] = useState(false);
  let { products, search, setSearch } = useContext(shopDataContext);
  let [filterProducts, setFilterProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState('relevant');
  let [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  let [expandedCategory, setExpandedCategory] = useState(true);
  let [expandedSubcategory, setExpandedSubcategory] = useState(true);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  const sortProduct = () => {
    let fbcopy = filterProducts.slice();
    switch (sortType) {
      case 'lth':
        setFilterProducts(fbcopy.sort((a, b) => a.price - b.price));
        break;
      case 'htl':
        setFilterProducts(fbcopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
    }
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const applyFilter = () => {
    let productCopy = products.slice();

    if (setSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, setSearch, search]);

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType('relevant');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Filters for mobile */}
            <div className="mt-4 border-t border-gray-200 px-4 py-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                onClick={() => setExpandedCategory(!expandedCategory)}
              >
                Category
                {expandedCategory ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {expandedCategory && (
                <div className="pt-4 space-y-3">
                  <div className="flex items-center">
                    <input
                      id="filter-men-mobile"
                      type="checkbox"
                      value="Men"
                      onChange={toggleCategory}
                      checked={category.includes('Men')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="filter-men-mobile" className="ml-3 text-sm text-gray-600">Men</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-women-mobile"
                      type="checkbox"
                      value="Women"
                      onChange={toggleCategory}
                      checked={category.includes('Women')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="filter-women-mobile" className="ml-3 text-sm text-gray-600">Women</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-kids-mobile"
                      type="checkbox"
                      value="Kids"
                      onChange={toggleCategory}
                      checked={category.includes('Kids')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="filter-kids-mobile" className="ml-3 text-sm text-gray-600">Kids</label>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium text-gray-900"
                onClick={() => setExpandedSubcategory(!expandedSubcategory)}
              >
                Subcategory
                {expandedSubcategory ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {expandedSubcategory && (
                <div className="pt-4 space-y-3">
                  <div className="flex items-center">
                    <input
                      id="filter-topwear-mobile"
                      type="checkbox"
                      value="topwear"
                      onChange={toggleSubCategory}
                      checked={subCategory.includes('topwear')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="filter-topwear-mobile" className="ml-3 text-sm text-gray-600">Topwear</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-bottomwear-mobile"
                      type="checkbox"
                      value="bottomwear"
                      onChange={toggleSubCategory}
                      checked={subCategory.includes('bottomwear')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="filter-bottomwear-mobile" className="ml-3 text-sm text-gray-600">Bottomwear</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-winterwear-mobile"
                      type="checkbox"
                      value="winterwear"
                      onChange={toggleSubCategory}
                      checked={subCategory.includes('winterwear')}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="filter-winterwear-mobile" className="ml-3 text-sm text-gray-600">Winterwear</label>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 mt-4">
              <button 
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
          <Title text1={'Shop'} text2={'Collection'} />
          
          <div className="flex items-center">
            <div className="relative inline-block text-left">
              <select
                className="py-2 pl-3 pr-10 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
              >
                <option value="relevant">Sort by relevance</option>
                <option value="htl">Price: High to Low</option>
                <option value="lth">Price: Low to High</option>
              </select>
            </div>

            <button
              type="button"
              className="ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FiFilter className="h-5 w-5" />
            </button>
          </div>
        </div>

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters sidebar for desktop */}
            <div className="hidden lg:block">
              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button 
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    onClick={() => setExpandedCategory(!expandedCategory)}
                  >
                    <span className="font-medium text-gray-900">Category</span>
                    {expandedCategory ? (
                      <FiChevronUp className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FiChevronDown className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                {expandedCategory && (
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center">
                      <input
                        id="filter-men"
                        type="checkbox"
                        value="Men"
                        onChange={toggleCategory}
                        checked={category.includes('Men')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="filter-men" className="ml-3 text-sm text-gray-600">Men</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-women"
                        type="checkbox"
                        value="Women"
                        onChange={toggleCategory}
                        checked={category.includes('Women')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="filter-women" className="ml-3 text-sm text-gray-600">Women</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-kids"
                        type="checkbox"
                        value="Kids"
                        onChange={toggleCategory}
                        checked={category.includes('Kids')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="filter-kids" className="ml-3 text-sm text-gray-600">Kids</label>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <button 
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    onClick={() => setExpandedSubcategory(!expandedSubcategory)}
                  >
                    <span className="font-medium text-gray-900">Subcategory</span>
                    {expandedSubcategory ? (
                      <FiChevronUp className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <FiChevronDown className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                {expandedSubcategory && (
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center">
                      <input
                        id="filter-topwear"
                        type="checkbox"
                        value="topwear"
                        onChange={toggleSubCategory}
                        checked={subCategory.includes('topwear')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="filter-topwear" className="ml-3 text-sm text-gray-600">Topwear</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-bottomwear"
                        type="checkbox"
                        value="bottomwear"
                        onChange={toggleSubCategory}
                        checked={subCategory.includes('bottomwear')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="filter-bottomwear" className="ml-3 text-sm text-gray-600">Bottomwear</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="filter-winterwear"
                        type="checkbox"
                        value="winterwear"
                        onChange={toggleSubCategory}
                        checked={subCategory.includes('winterwear')}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="filter-winterwear" className="ml-3 text-sm text-gray-600">Winterwear</label>
                    </div>
                  </div>
                )}
              </div>

              <div className="py-4">
                <button 
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Clear all filters
                </button>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3">
              {filterProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterProducts.map((item, index) => (
                    <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Collection;