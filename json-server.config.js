module.exports = {
    routes: {
        '/api/*': '/$1',
    },
    middlewares: (req, res, next) => {
        if (req.method === 'GET' && req.url.startsWith('/registrations')) {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const params = url.searchParams;

            // Get all query parameters
            const filters = {};
            params.forEach((value, key) => {
                if (!['_page', '_limit', '_sort', '_order'].includes(key)) {
                    filters[key] = value;
                }
            });

            // Read the database
            const db = require('./db.json');

            // Apply all filters
            let filteredData = db.registrations.filter(item => {
                return Object.entries(filters).every(([key, value]) => {
                    return item[key] && item[key].toString() === value.toString();
                });
            });

            // Apply pagination if needed
            const page = parseInt(params.get('_page')) || 1;
            const limit = parseInt(params.get('_limit')) || 10;
            const start = (page - 1) * limit;
            const end = start + limit;

            filteredData = filteredData.slice(start, end);

            // Send response
            res.json(filteredData);
            return;
        }
        next();
    }
}