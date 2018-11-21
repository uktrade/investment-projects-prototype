const app = require('app');
const config = require('config');

const port = config.get('node.port');
app.listen(port, () => console.log(`Investment projects app started, listening on port ${port}!`));
