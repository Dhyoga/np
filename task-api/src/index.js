const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const taskRoutes = require('./routes/task');
const yaml = require('js-yaml');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Swagger setup
const swaggerDocument = yaml.load(fs.readFileSync(path.join(__dirname, 'docs/task.yaml'), 'utf8'));
const swaggerDocs = swaggerUi.setup(swaggerDocument);

app.use('/api-docs', swaggerUi.serve, swaggerDocs);

// Routes
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Open /tasks or /api-docs');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
