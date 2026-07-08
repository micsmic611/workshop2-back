import { syncDatabase } from '../config/database';

// Database sync script
const sync = async () => {
  try {
    const force = process.argv.includes('--force');
    
    if (force) {
      console.log('⚠️  WARNING: Running with --force flag. All tables will be dropped and recreated!');
      console.log('⏳ Waiting 3 seconds... Press Ctrl+C to cancel.');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    await syncDatabase(force);
    console.log('✅ Database sync completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database sync failed:', error);
    process.exit(1);
  }
};

sync();
