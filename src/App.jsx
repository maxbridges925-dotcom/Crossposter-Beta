import React, { useState } from 'react';

export default function App() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    size: '',
    condition: ''
  });
  const [platforms, setPlatforms] = useState({
    depop: true,
    poshmark: true,
    vinted: true,
    ebay: false,
    mercari: false
  });
  const [status, setStatus] = useState('idle');

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...imageUrls].slice(0, 8));
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePlatform = (platform) => {
    setPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('posting');
    setTimeout(() => {
      setStatus('success');
    }, 3000);
  };

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '1.5rem', fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.5rem 0' }}>Cross-Post New Listing</h1>
        <p style={{ color: '#4b5563', margin: 0 }}>Fill out the details once to list your item across multiple platforms.</p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Photo Section */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 1rem 0' }}>Photos ({images.length}/8)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              {images.map((url, index) => (
                <div key={index} style={{ relative: 'absolute', aspectRatio: '1/1', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative' }}>
                  <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', padding: '0.25rem 0.5rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
                  >
                    X
                  </button>
                </div>
              ))}
              {images.length < 8 && (
                <label style={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #d1d5db', borderRadius: '0.5rem', cursor: 'pointer', height: '100px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>+ Add Photo</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields Section */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Item Details</h2>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g., Vintage Nike Windbreaker" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Description</label>
              <textarea name="description" rows={3} required value={formData.description} onChange={handleInputChange} placeholder="Describe item flaws, measurements..." style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Price ($)</label>
                <input type="number" name="price" required value={formData.price} onChange={handleInputChange} placeholder="0.00" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="e.g., Nike" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Size</label>
                <input type="text" name="size" required value={formData.size} onChange={handleInputChange} placeholder="e.g., M" style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>Condition</label>
                <select name="condition" required value={formData.condition} onChange={handleInputChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', backgroundColor: '#fff' }}>
                  <option value="">Select</option>
                  <option value="new">New with Tags</option>
                  <option value="good">Gently Used</option>
                </select>
              </div>
            </div>
          </div>

          {/* Platforms Selection Section */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 1rem 0' }}>Select Platforms</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.keys(platforms).map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  style={{
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: platforms[platform] ? '#4f46e5' : '#e5e7eb',
                    backgroundColor: platforms[platform] ? '#f5f3ff' : '#ffffff',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ flexGrow: 1, textTransform: 'capitalize' }}>{platform}</span>
                  <span style={{ color: platforms[platform] ? '#4f46e5' : '#d1d5db' }}>
                    {platforms[platform] ? '● ON' : '○ OFF'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
            {status === 'posting' && (
              <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                🔄 Running automation tasks...
              </div>
            )}
            {status === 'success' && (
              <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                ✅ Successfully cross-posted listings!
              </div>
            )}
            <button
              type="submit"
              disabled={status === 'posting' || !Object.values(platforms).some(Boolean)}
              style={{ width: '100%', backgroundColor: '#4f46e5', color: '#ffffff', fontWeight: 'bold', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', opacity: status === 'posting' ? 0.5 : 1 }}
            >
              {status === 'posting' ? 'Listing...' : 'List Item Everywhere'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

