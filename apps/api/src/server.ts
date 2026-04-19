/**
 * EK Marketplace — API Entry Point
 * ----------------------------------
 * TODO: Implement full Express app setup.
 *       This is a minimal placeholder to establish the module structure.
 */

import { app } from './app';
import { config } from './config/env';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`[api] Server running on port ${PORT}`);
});
