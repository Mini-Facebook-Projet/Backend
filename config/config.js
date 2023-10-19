module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'b95875baef2c1118a8e3310820188a6b346115f5a680a00e3d434c123d2c6c89',
    DB_URL: process.env.DB_URL || 'mongodb+srv://abdessamadOLM:root@cluster0.lepfubn.mongodb.net/mini_facebook?retryWrites=true&w=majority',
    JWT_TOKEN_LIFE_TME: '30m', // Durée de validité des tokens JWT (par exemple, 30 jours)
    JWT_REFRESH_TOKEN_LIFE_TIME : '30d',
    PORT:8080,
};
