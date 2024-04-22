
import express, { Application } from 'express';
function server(config: any): Application {
    const app: Application = express()
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
    return app
}
export default server
