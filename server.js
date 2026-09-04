import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = 5000;

// Allow your React app to communicate with this backend API safely
app.use(cors());
app.use(express.json());

// Handle multi-part form data uploads (photos)
const upload = multer({ dest: '/tmp/uploads/' });

/**
 * The main Cross-Posting API endpoint
 */
app.post('/api/listings/cross-post', upload.array('images', 8), async (req, res) => {
  try {
    const { title, description, price, brand, size, condition } = req.body;
    
    // Parse target platforms back from a JSON string to an array
    const targetPlatforms = JSON.parse(req.body.platforms || '[]');
    
    console.log(`\n🚀 [BACKEND ENGINE] Received listing data!`);
    console.log(`📋 Item Title: "${title}"`);
    console.log(`💰 Target Price: $${price}`);
    console.log(`🎯 Target Marketplaces: ${targetPlatforms.join(', ')}`);

    // Simulate the execution time of automated browser operations
    console.log(`⚙️  Simulating browser script routines...`);
    await new Promise(resolve => setTimeout(resolve, 2500));

    console.log(`✅ Finished automated tasks for: ${targetPlatforms.join(', ')}`);

    return res.status(200).json({
      message: 'Processing complete',
      results: targetPlatforms.map(p => ({ platform: p, status: 'success' }))
    });
  } catch (error) {
    console.error('Automation runtime exception:', error);
    return res.status(500).json({ error: 'Server automation error' });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Cross-posting engine is now live and listening on port ${PORT}`);
});
