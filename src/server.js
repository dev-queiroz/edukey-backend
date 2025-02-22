import { config } from './common/config.js';
import app from './app.js';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});