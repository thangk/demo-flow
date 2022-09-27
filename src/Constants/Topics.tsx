
// these topics has to be dynamic and be savable to the db

import { TOPIC_URL } from "./Urls"
// this is not the final design

let topics: { id: number, topic: string }[] = [];
try {
    let resp = await fetch(TOPIC_URL, {
        method: "GET",
        headers: { "content-type": "application/json" }
    });
    topics = await resp.json();
} catch(_) {

}
export { topics }; 