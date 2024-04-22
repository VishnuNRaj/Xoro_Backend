
import express from 'express';
function server(config: any) {
    const app = express()
    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`);
    });
    return app
}
export default server
