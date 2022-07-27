import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});